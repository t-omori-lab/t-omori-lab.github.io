/* Intercept only the virtual, content-addressed audio URLs under our scope. */
const scope = new URL(self.registration.scope);
const blockSize = 128 * 1024;
const flights = new Map();
let catalog;
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const {request} = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== scope.origin) return;
  const match = /^__music_stream\/([a-f\d]{64})\/([\w.-]+\.(?:mp3|m4a))$/.exec(url.pathname.slice(scope.pathname.length));
  if (!url.pathname.startsWith(scope.pathname) || !match) return;
  event.respondWith(serve(request, match[1], match[2], event.clientId).catch(() => new Response(null, {status: 502})));
});
function readCatalog(){
  if (!catalog) catalog = fetch(new URL('music-stream-catalog.json', scope), {cache: 'no-cache'})
    .then(response => {
      if (!response.ok) throw new Error('audio catalog unavailable');
      return response.json();
    }).catch(error => {catalog = undefined; throw error;});
  return catalog;
}
function rangeOf(header, size) {
  if (!header) return [0, size - 1];
  const match = /^bytes=(\d*)-(\d*)$/.exec(header);
  if (!match || (!match[1] && !match[2])) return null;
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(size - 1, Number(match[2])) : size - 1;
  return Number.isSafeInteger(start) && start <= end ? [start, end] : null;
}
async function serve(request, digest, file, clientId) {
  let track = (await readCatalog())[file];
  if (track?.digest !== digest) {
    catalog = undefined;
    track = (await readCatalog())[file];
  }
  if (!track || track.digest !== digest) return new Response(null, {status: 404});
  const {size} = track;
  const range = request.headers.get('range');
  const positions = rangeOf(range, size);
  if (!positions) return new Response(null, {status: 416, headers: {'Content-Range': 'bytes */' + size}});
  const [start, end] = positions;
  const type = file.endsWith('.m4a') ? 'audio/mp4' : 'audio/mpeg';
  const source = new URL('audio/' + file, scope);
  const key = new URL('__music_stream/' + digest + '/' + file, scope);
  const headers = {'Accept-Ranges': 'bytes', 'Content-Type': type, 'Content-Length': String(end - start + 1), 'Cache-Control': 'no-store'};
  if (range) headers['Content-Range'] = 'bytes ' + start + '-' + end + '/' + size;
  const options = {status: range ? 206 : 200, headers};

  // Reuse the previous version's complete, verified cache without an HTTP probe.
  let full;
  try {
    const cache = await caches.open('neon-drift-music-r48-fresh');
    const saved = await cache.match(source);
    if (saved?.headers.get('x-illumi-music-sha256') === digest) full = await saved.blob();
  } catch {}
  if (full?.size === size) return new Response(full.slice(start, end + 1, type), options);

  let blocks;
  try {blocks = await caches.open('illumi-drive-music-ranges-v1');} catch {}
  const listeners = clientId ? [await self.clients.get(clientId)].filter(Boolean) :
    (await self.clients.matchAll({type: 'window'})).filter(client => client.url.startsWith(scope.href));
  let offset = start;
  let cancelled = false;
  const body = new ReadableStream({
    async pull(controller) {
      const index = Math.floor(offset / blockSize);
      const data = await getBlock(source, key, track, index, blocks);
      if (cancelled) return;
      const from = offset - index * blockSize;
      const bytes = data.subarray(from, from + end - offset + 1);
      offset += bytes.length;
      controller.enqueue(bytes);
      for (const client of listeners)client.postMessage({kind: 'illumi-music-range-ready', url: key.href});
      if (offset > end) controller.close();
    },
    cancel() {cancelled = true;},
  }, {highWaterMark: 0});
  return new Response(body, options);
}
function getBlock(source, root, track, index, cache) {
  const key = root.href + '?block=' + index;
  const active = flights.get(key);
  if (active) return active;
  const task = (async () => {
    const start = index * blockSize;
    const end = Math.min(start + blockSize, track.size) - 1;
    const length = end - start + 1;
    try {
      const cached = await cache?.match(key);
      if (cached) {
        const bytes = new Uint8Array(await cached.arrayBuffer());
        if (bytes.length === length) return bytes;
      }
    } catch {}
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(source, {
        cache: 'no-store', signal: controller.signal, headers: {Range: 'bytes=' + start + '-' + end},
      });
      if (response.status !== 206 || response.headers.get('content-range') !== 'bytes ' + start + '-' + end + '/' + track.size) {
        void response.body?.cancel().catch(() => {});
        throw new Error('Audio range unavailable');
      }
      const bytes = new Uint8Array(await response.arrayBuffer());
      const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), value => value.toString(16).padStart(2, '0')).join('');
      if (bytes.length !== length || digest !== track.blocks[index]) throw new Error('Audio range differs from this build');
      try {await cache?.put(key, new Response(bytes));} catch {}
      return bytes;
    } finally {
      clearTimeout(timer);
    }
  })().finally(() => flights.delete(key));
  flights.set(key, task);
  return task;
}
