import hashlib,json,subprocess
from pathlib import Path
root=Path('.')
manifest=json.loads((root/'delivery-manifest.json').read_text())
expected={x['path']:x for x in manifest['files']}
actual={str(p.relative_to(root/'site')):p for p in (root/'site').rglob('*') if p.is_file()}
assert set(actual)==set(expected),'Delivery file set differs'
assert not any(p.is_symlink() for p in (root/'site').rglob('*')),'Symlink rejected'
for name,p in actual.items():
 row=expected[name];assert p.stat().st_size==row['bytes'],name
 h=hashlib.sha256()
 with p.open('rb') as f:
  for b in iter(lambda:f.read(1024*1024),b''):h.update(b)
 assert h.hexdigest()==row['sha256'],name
assert (root/'site/index.html').is_file()

allowed={'.github/workflows/deploy-static.yml','.github/scripts/verify-delivery.py','.github/scripts/gateway-release-check.mjs','.github/scripts/release-history-check.py','.github/release-history-proof.json','delivery-manifest.json'}
other={str(p.relative_to(root)) for p in root.rglob('*') if p.is_file() and '.git' not in p.relative_to(root).parts and 'site' != p.relative_to(root).parts[0]}
assert other==allowed,'Non-delivery root files rejected'

# Mandatory Gateway/game metadata and active hydration-module agreement.
subprocess.run(['node',str(root/'.github/scripts/gateway-release-check.mjs'),'check',str(root/'site'),str(root/'site/illumi-drive/release.json')],check=True)

# Source-verified all-history coverage is bound to these exact delivery bytes.
subprocess.run(['python3',str(root/'.github/scripts/release-history-check.py'),'delivery','--root',str(root),'--proof',str(root/'.github/release-history-proof.json')],check=True)
