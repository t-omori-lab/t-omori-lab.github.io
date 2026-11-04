import hashlib,json,subprocess,re,copy
from datetime import datetime,timezone
from pathlib import Path

"""Validate player-facing update metadata against a successful publication receipt."""
import re
from datetime import datetime

def verify_update_meaning(release, history, receipt):
    assert receipt['schema'] == 1
    assert receipt['state'] == 'success' and receipt['environment'] == 'github-pages'
    assert re.fullmatch('[0-9a-f]{40}', receipt['featureCommit'])
    assert isinstance(receipt['deploymentId'], int) and receipt['deploymentId'] > 0
    assert isinstance(receipt['statusId'], int) and receipt['statusId'] > 0
    stamp = datetime.fromisoformat(receipt['deployedAt'].replace('Z', '+00:00'))
    assert stamp.tzinfo is not None
    actual = datetime.fromisoformat(release['updatedAt'].replace('Z', '+00:00'))
    assert actual == stamp, 'Update time differs from actual feature publication'
    assert release['revision'] == release['label'] + '-' + stamp.strftime('%Y%m%dT%H%M%SZ')
    summary = release['updateSummary']
    assert isinstance(summary, str) and 1 <= len(summary) <= 80, 'Update summary must be concise'
    assert summary == summary.strip() and '\n' not in summary
    assert summary == receipt['approvedSummary'], 'Not the reviewed current change summary'
    entry = history['entries'][0]
    assert entry['revisionId'] == release['label'] == history['currentRevisionId']
    assert entry['updatedAt'] == release['updatedAt'] and entry['revision'] == release['revision']
    assert entry['shortSummary'] == entry['summary'] == summary, 'Game/Gateway current notes differ'
    assert entry['title'] == receipt['approvedTitle'], 'Old current-history heading remains'
    assert entry['highlights'] == receipt['approvedHighlights'], 'Old overview highlights remain'
    assert len(entry['title']) <= 40
    return True

def validate_release_revision(manifest,release):
 assert release.get('status')=='published','Published release metadata required'
 def stamp(value):
  assert isinstance(value,str) and value.endswith('Z'),'UTC ISO timestamp required'
  result=datetime.fromisoformat(value.replace('Z','+00:00'));assert result.tzinfo is not None;return result
 updated=stamp(release.get('updatedAt'));initial=stamp(release.get('publishedAt'))
 assert updated>=initial,'Latest update precedes initial publication'
 assert release.get('revision')==release['label']+'-'+updated.astimezone(timezone.utc).strftime('%Y%m%dT%H%M%SZ'),'Revision/time mismatch'
 assert isinstance(release.get('updateSummary'),str) and release['updateSummary'].strip(),'Current change description required'
 previous=manifest.get('previousGameRelease');assert isinstance(previous,dict),'Exact previous release metadata required'
 assert isinstance(manifest.get('previousPreparedGamePayload'),str) and len(manifest['previousPreparedGamePayload'])==64,'Previous payload binding required'
 if previous.get('label')==release['label']:assert release['publishedAt']==previous['publishedAt'],'Original publication date rewritten'
 if manifest.get('preparedGamePayload')!=manifest['previousPreparedGamePayload']:
  assert updated>stamp(previous.get('updatedAt') or previous['publishedAt']),'Changed game payload requires a newer update timestamp'
  assert release['revision']!=previous.get('revision'),'Changed payload reused old revision'
 return True

def _release_revision_self_test():
 previous={'label':'R61','publishedAt':'2026-10-25T00:44:21.000Z','updatedAt':'2026-10-31T13:00:00Z','revision':'R61-20261031T130000Z'}
 manifest={'previousGameRelease':previous,'previousPreparedGamePayload':'a'*64,'preparedGamePayload':'b'*64}
 current={**previous,'updatedAt':'2026-10-31T14:00:00Z','revision':'R61-20261031T140000Z','status':'published','updateSummary':'READY touch/camera and latest release timestamp synchronized'}
 assert validate_release_revision(manifest,current)
 cases=[lambda r:r.pop('updatedAt'),lambda r:r.update(updatedAt=previous['updatedAt'],revision=previous['revision']),lambda r:r.update(publishedAt=r['updatedAt']),lambda r:r.update(revision='R61-stale'),lambda r:r.update(updateSummary=''),lambda r:r.update(updatedAt='invalid')]
 for mutate in cases:
  r=copy.deepcopy(current);mutate(r)
  try:validate_release_revision(manifest,r)
  except (AssertionError,ValueError,TypeError):continue
  raise AssertionError('Metadata negative regression accepted')
 return len(cases)

def verify(root=Path('.')):
 _release_revision_self_test()
 manifest=json.loads((root/'delivery-manifest.json').read_text());release=json.loads((root/'site/illumi-drive/release.json').read_text());validate_release_revision(manifest,release)
 verify_update_meaning(release,json.loads((root/'site/illumi-drive/update-history.json').read_text()),manifest['latestUpdateDeployment'])
 expected={x['path']:x for x in manifest['files']};actual={str(p.relative_to(root/'site')):p for p in (root/'site').rglob('*') if p.is_file()}
 assert set(actual)==set(expected),'Delivery file set differs';assert not any(p.is_symlink() for p in (root/'site').rglob('*')),'Symlink rejected'
 for name,p in actual.items():
  row=expected[name];assert p.stat().st_size==row['bytes'],name;h=hashlib.sha256()
  with p.open('rb') as f:
   for b in iter(lambda:f.read(1024*1024),b''):h.update(b)
  assert h.hexdigest()==row['sha256'],name
 assert (root/'site/index.html').is_file()
 allowed={'.github/workflows/deploy-static.yml','.github/scripts/verify-delivery.py','.github/scripts/gateway-release-check.mjs','.github/scripts/release-history-check.py','.github/release-history-proof.json','delivery-manifest.json'}
 other={str(p.relative_to(root)) for p in root.rglob('*') if p.is_file() and '.git' not in p.relative_to(root).parts and 'site'!=p.relative_to(root).parts[0]};assert other==allowed,'Non-delivery root files rejected'
 subprocess.run(['node',str(root/'.github/scripts/gateway-release-check.mjs'),'check',str(root/'site'),str(root/'site/illumi-drive/release.json')],check=True)
 subprocess.run(['python3',str(root/'.github/scripts/release-history-check.py'),'delivery','--root',str(root),'--proof',str(root/'.github/release-history-proof.json')],check=True)
 print(json.dumps({'pass':True,'latestRevisionRequired':True,'metadataNegativeCases':6,'revision':release['revision']}))
if __name__=='__main__':verify()
