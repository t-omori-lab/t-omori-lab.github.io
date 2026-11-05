import hashlib,json,subprocess,re,copy
from datetime import datetime,timezone
from pathlib import Path

"""Validate player-facing update metadata against a successful publication receipt."""
import re
from datetime import datetime

"""Bound a feature deployment whose successful completion time is not yet known.

The terminal release gate still requires the successful provider receipt. This
short-lived state is only the first half of the paired publication transaction.
"""
import re
from datetime import datetime, timezone, timedelta


def verify_publication_intent(release, history, receipt, manifest, now=None):
    now = now or datetime.now(timezone.utc)
    stamp = lambda value: datetime.fromisoformat(value.replace('Z', '+00:00'))
    hex40 = lambda value: isinstance(value, str) and re.fullmatch('[0-9a-f]{40}', value)
    hex64 = lambda value: isinstance(value, str) and re.fullmatch('[0-9a-f]{64}', value)
    assert receipt['schema'] == 1 and receipt['state'] == 'awaiting-feature-success'
    assert receipt['environment'] == 'github-pages'
    assert receipt.get('deploymentId') is None and receipt.get('statusId') is None
    transaction = manifest['publicationTransaction']
    assert transaction['schema'] == 1
    assert transaction['mode'] == 'feature-with-required-receipt-finalization'
    assert transaction['finalizationRequired'] is True
    assert transaction['repository'] == 't-omori-lab/t-omori-lab.github.io'
    assert transaction['ref'] == 'refs/heads/main'
    assert manifest['metadataOnlyChild'] is False
    assert manifest['publicationAuthorized'] is True
    assert hex40(transaction['baseCommit']) and transaction['baseCommit'] == manifest['baselineCommit']
    assert hex40(transaction['rollbackTree'])
    assert transaction['rollbackMode'] == 'normal-child-restoring-exact-preimage-tree'
    assert hex40(receipt['runtimeSource']) and receipt['runtimeSource'] == manifest['runtimeSource']
    assert hex64(receipt['enginePayload']) and receipt['enginePayload'] == manifest['nativeAcceptance']['enginePayload']
    assert hex64(manifest['nativeAcceptance']['receiptSHA256'])
    assert hex64(manifest['approvedOwnerPacket']['sha256'])
    planned, expires = stamp(receipt['plannedAt']), stamp(transaction['expiresAt'])
    assert planned.tzinfo is not None and expires.tzinfo is not None
    assert planned <= now + timedelta(seconds=60)
    assert planned < expires <= planned + timedelta(minutes=15)
    assert now <= expires, 'Unfinalized publication intent expired'
    assert release['updatedAt'] == receipt['plannedAt']
    assert release['revision'] == release['label'] + '-' + planned.strftime('%Y%m%dT%H%M%SZ')
    assert release['updateSummary'] == receipt['approvedSummary']
    assert 1 <= len(release['updateSummary']) <= 80 and '\n' not in release['updateSummary']
    entry = history['entries'][0]
    assert entry['revisionId'] == release['label'] == history['currentRevisionId']
    assert entry['updatedAt'] == release['updatedAt'] and entry['revision'] == release['revision']
    assert entry['summary'] == entry['shortSummary'] == release['updateSummary']
    assert entry['title'] == receipt['approvedTitle'] and len(entry['title']) <= 40
    assert entry['highlights'] == receipt['approvedHighlights']
    assert transaction['previousSuccessfulReceipt']['state'] == 'success'
    assert transaction['previousSuccessfulReceipt']['deployedAt'] == manifest['previousGameRelease']['updatedAt']
    return True


def publication_intent_self_test():
    import copy
    now = datetime(2026, 11, 6, 0, 0, tzinfo=timezone.utc)
    release = {'label': 'R62', 'updatedAt': '2026-11-06T00:00:00Z', 'revision': 'R62-20261106T000000Z', 'updateSummary': 'Auto and tag update'}
    entry = {'revisionId': 'R62', 'updatedAt': release['updatedAt'], 'revision': release['revision'], 'summary': release['updateSummary'], 'shortSummary': release['updateSummary'], 'title': 'Auto and tags', 'highlights': ['Auto', 'Tags']}
    history = {'currentRevisionId': 'R62', 'entries': [entry]}
    receipt = {'schema': 1, 'state': 'awaiting-feature-success', 'environment': 'github-pages', 'deploymentId': None, 'statusId': None, 'runtimeSource': 'a'*40, 'enginePayload': 'b'*64, 'plannedAt': release['updatedAt'], 'approvedSummary': release['updateSummary'], 'approvedTitle': entry['title'], 'approvedHighlights': entry['highlights']}
    transaction = {'schema': 1, 'mode': 'feature-with-required-receipt-finalization', 'finalizationRequired': True, 'repository': 't-omori-lab/t-omori-lab.github.io', 'ref': 'refs/heads/main', 'baseCommit': 'c'*40, 'rollbackTree': 'd'*40, 'rollbackMode': 'normal-child-restoring-exact-preimage-tree', 'expiresAt': '2026-11-06T00:15:00Z', 'previousSuccessfulReceipt': {'state': 'success', 'deployedAt': '2026-11-04T15:36:54Z'}}
    manifest = {'publicationTransaction': transaction, 'metadataOnlyChild': False, 'publicationAuthorized': True, 'baselineCommit': 'c'*40, 'runtimeSource': 'a'*40, 'nativeAcceptance': {'enginePayload': 'b'*64, 'receiptSHA256': 'e'*64}, 'approvedOwnerPacket': {'sha256': 'f'*64}, 'previousGameRelease': {'updatedAt': transaction['previousSuccessfulReceipt']['deployedAt']}}
    assert verify_publication_intent(release, history, receipt, manifest, now)
    mutations = [lambda m: m.update(publicationAuthorized=False), lambda m: m.update(metadataOnlyChild=True), lambda m: m['publicationTransaction'].update(finalizationRequired=False), lambda m: m['publicationTransaction'].update(expiresAt='2026-11-05T23:59:59Z'), lambda m: m['publicationTransaction'].update(expiresAt='2026-11-06T00:16:00Z'), lambda m: m.update(runtimeSource='0'*40), lambda m: m['nativeAcceptance'].update(enginePayload='0'*64), lambda m: m.update(baselineCommit='0'*40), lambda m: m['previousGameRelease'].update(updatedAt='2026-01-01T00:00:00Z')]
    for mutate in mutations:
        candidate = copy.deepcopy(manifest)
        mutate(candidate)
        try:
            verify_publication_intent(release, history, receipt, candidate, now)
        except (AssertionError, ValueError, KeyError):
            continue
        raise AssertionError('Invalid publication intent accepted')
    return len(mutations)


def verify_update_meaning(release, history, receipt, manifest=None):
    if receipt.get('state') == 'awaiting-feature-success':
        return verify_publication_intent(release, history, receipt, manifest)

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
 publication_intent_self_test()
 manifest=json.loads((root/'delivery-manifest.json').read_text());release=json.loads((root/'site/illumi-drive/release.json').read_text());validate_release_revision(manifest,release)
 verify_update_meaning(release,json.loads((root/'site/illumi-drive/update-history.json').read_text()),manifest['latestUpdateDeployment'],manifest)
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
