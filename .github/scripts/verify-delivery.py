import hashlib,json
from pathlib import Path
root=Path('.')
manifest=json.loads((root/'delivery-manifest.json').read_text())
expected={x['path']:x for x in manifest['files']}
actual={str(p.relative_to(root/'site')):p for p in (root/'site').rglob('*') if p.is_file()}
assert set(actual)==set(expected),'Delivery file set differs'
assert not any(p.is_symlink() for p in (root/'site').rglob('*')),'Symlink rejected'
for name,p in actual.items():
 row=expected[name];assert p.stat().st_size==row['bytes'],name
 assert hashlib.file_digest(p.open('rb'),'sha256').hexdigest()==row['sha256'],name
assert (root/'site/index.html').is_file()
