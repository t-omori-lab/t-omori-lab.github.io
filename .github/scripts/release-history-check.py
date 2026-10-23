#!/usr/bin/env python3
"""Fail-closed structural coverage gate. Semantic truth still needs reviewer evidence.

Source mode reads Git/declared evidence and emits a small delivery proof only after
validation. Delivery mode needs no source checkout or third-party dependencies.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess

DIMENSIONS = {'scenery/forms','materials','lights','reflections','shadows','effects',
              'input','music','sfx','Auto/quality','startup','Pause',
              'compatibility/records','consent','metrics','release/UI'}
def require(ok, message):
    if not ok: raise ValueError(message)
def digest(value):
    return hashlib.sha256(value if isinstance(value,bytes) else value.encode()).hexdigest()
def encode(value): return json.dumps(value,ensure_ascii=False,separators=(',',':')).encode()
def read(path): return json.loads(Path(path).read_bytes())
def git(repo,*args): return subprocess.check_output(['git','-C',str(repo),*args],stderr=subprocess.DEVNULL)
def commit(repo,ref):
    require(isinstance(ref,str) and bool(re.fullmatch('[0-9a-f]{40}',ref)), 'immutable source commit required')
    require(git(repo,'rev-parse',ref+'^{commit}').decode().strip()==ref,'source commit unavailable')
    return ref
def confined(root,name):
    require(isinstance(name,str) and bool(name) and not Path(name).is_absolute(),'relative evidence path required')
    out=(Path(root)/name).resolve()
    require(out.is_relative_to(Path(root).resolve()),'evidence path escapes root')
    return out
def evidence(root,ref):
    require(isinstance(ref,dict) and 'path' in ref and 'sha256' in ref,'missing fixed evidence')
    p=confined(root,ref['path'])
    require(p.is_file() and digest(p.read_bytes())==ref['sha256'],'evidence missing/stale: '+ref['path'])
    return p
def bound_source_evidence(root,refs,source):
    require(refs,'source binding evidence missing')
    contents=[evidence(root,ref).read_bytes() for ref in refs]
    require(any(source.encode() in b for b in contents),'receipt/reference does not bind runtime source')
def normalized_release_label(text):
    m=re.fullmatch(r'(?:R|v|neon-drift-v)(\d+)(?:\.(\d+))?',text)
    if not m:return None
    # Only the documented R51/R51.0 spelling alias collapses a zero suffix.
    # Real branch releases such as R54.3 and R54.4 remain distinct.
    return 'R'+str(int(m[1]))+('.'+str(int(m[2])) if m[2] and int(m[2]) else '')
def publication_labels(value):
    """Only explicit game labels/URLs. Never infer R from a folder or ruleset."""
    if not isinstance(value,dict):return set()
    found=set()
    for key in ['label','release','version','revision','gameVersion','releaseLabel']:
        text=value.get(key)
        if not isinstance(text,str):continue
        label=normalized_release_label(text)
        if label:found.add(label)
    for key in ['public_url','primary_url','target','pagesUrl','productionUrl','publicURL','primaryUrl','url']:
        text=value.get(key)
        if isinstance(text,str):
            found.update(normalized_release_label('R'+n) for n in re.findall(r'[?&]v=(?:R|v)?(\d+(?:\.\d+)?)(?:&|$)',text))
    return found
def reject_contradictory_publication_label(root,refs,rid,display_label=None):
    # Historical row IDs R32.2/R37.1/R38.1 intentionally display R32/R37/R38.
    # Use the authoritative history label when supplied, never a folder/ruleset.
    expected=normalized_release_label(display_label or rid)
    require(expected is not None,'invalid history publication label')
    allowed={expected}
    # Frozen historical R20 row includes its published v20.1 same-R follow-up.
    # This exact exception is backed by implementation-v20/RELEASE.json; it is
    # not a general rule that erases branch release identities.
    if rid=='R20.0' and expected=='R20':allowed.add('R20.1')
    for ref in refs:
        raw=evidence(root,ref).read_bytes()
        try:value=json.loads(raw)
        except (ValueError,UnicodeDecodeError):continue
        labels=publication_labels(value)
        require(not labels or labels<=allowed,'publication receipt explicitly labels another release')
def details(history):
    rows={}
    for e in history['entries']:
        rid=e['revisionId'];require(rid not in rows,'duplicate revision')
        require(isinstance(e.get('details'),list) and len(set(e['details']))==len(e['details']),'invalid/duplicate details')
        rows[rid]=e
    return rows
def refs_of(history):
    return {rid+':'+digest(text) for rid,e in details(history).items() for text in e['details']}
def changed_hunks(repo,base,candidate):
    names=git(repo,'diff','--no-ext-diff','--no-renames','--name-only','-z',base,candidate).decode().split('\0')
    result={}
    for name in filter(None,names):
        patch=git(repo,'diff','--no-ext-diff','--no-renames','--unified=0',base,candidate,'--',name)
        lines=patch.splitlines(keepends=True); chunks=[];active=None
        for line in lines:
            if line.startswith(b'@@'):
                if active is not None: chunks.append(b''.join(active))
                active=[line]
            elif active is not None:active.append(line)
        if active is not None: chunks.append(b''.join(active))
        # Binary/empty-file/mode changes are covered as one exact whole-patch unit.
        result[name]={'patchSHA256':digest(patch),'hunks':[digest(x) for x in chunks] or [digest(patch)]}
    return result
def catalog(root):
    rows=[]
    for p in sorted(Path(root).rglob('*')):
        require(not p.is_symlink(),'distribution symlink')
        if p.is_file():
            b=p.read_bytes();rows.append({'path':p.relative_to(root).as_posix(),'bytes':len(b),'sha256':digest(b)})
    return rows
def validate_version(record,prior,history,evidence_root):
    decision=record.get('versionDecision',{})
    kind=decision.get('changeClass')
    require(kind in ['patch','rationalization','history-correction','major','important-repair','label-correction'],'version decision missing')
    require(decision.get('reason','').strip() and decision.get('evidence'),'version rationale/evidence missing')
    for ref in decision['evidence']:evidence(evidence_root,ref)
    if prior['currentRevisionId']==history['currentRevisionId']:return
    if kind=='label-correction':
        evidence(evidence_root,decision.get('ownerRelabelApproval'))
        require(decision.get('preservedMeasurementIdsBefore') is not None and
                decision.get('preservedMeasurementIdsBefore')==decision.get('preservedMeasurementIdsAfter'),
                'measurement/build/ruleset identity must be preserved during relabel')
        require(decision.get('actualPublicationAuditRetained') is True,'actual former R publication must remain in audit')
        return
    require(kind in ['major','important-repair'],'patch/rationalization/history correction must retain R')
    require(len(decision.get('scopeExplanation','').strip())>=20,'R increment requires concrete change scale')
    for key in ['publicReasonRef','publicImpactRef']:
        ref=decision.get(key,'')
        require(ref in refs_of(history) and ref.startswith(history['currentRevisionId']+':'),
                'R increment reason and user impact must be in current public explanation')
    require(len(decision.get('independentReleaseReason','').strip())>=20,'separate commit/build/test is not an independent release reason')
def validate_label_decision(record,release,prior,evidence_root):
    require(record.get('expectedReleaseLabel')==release['label'],'release label differs from explicit approved expectation')
    decision=read(evidence(evidence_root,record.get('releaseLabelApproval')))
    require(decision.get('schemaVersion')==1 and decision.get('kind')=='release-label-decision','typed release label decision required')
    require(decision.get('expectedReleaseLabel')==release['label'] and decision.get('baselineReleaseLabel')==prior['currentRevisionId'],'typed approved label/baseline mismatch')
    require(type(decision.get('allowIncrement')) is bool,'explicit increment boolean required')
    require(decision['allowIncrement']==(release['label']!=prior['currentRevisionId']),'release increment not explicitly approved')
    require(decision.get('authorityEvidence'),'release label authority evidence required')
    for ref in decision['authorityEvidence']:evidence(evidence_root,ref)
    return decision
def validate_source(repo,dist,record,evidence_root,notes_input):
    require(record.get('schemaVersion')==1,'unsupported coverage schema')
    base=commit(repo,record.get('baseSource'));candidate=commit(repo,record.get('candidateSource'))
    require(record.get('candidateTree')==git(repo,'rev-parse',candidate+'^{tree}').decode().strip(),'stale audit tree')
    preimage=read(evidence(evidence_root,record.get('publicPreimageReceipt')))
    require(preimage.get('kind')=='actual-public-baseline' and preimage.get('runtimeSource')==base,
            'public baseline runtime source mismatch')
    prior_path=evidence(evidence_root,record.get('baselineHistory'))
    prior=read(prior_path);hb=(Path(dist)/'update-history.json').read_bytes();history=json.loads(hb)
    require(preimage.get('historySHA256')==digest(prior_path.read_bytes()) and
            preimage.get('releaseLabel')==prior['currentRevisionId'], 'public baseline history mismatch')
    release=read(Path(dist)/'release.json')
    canonical_bytes=Path(notes_input).read_bytes()
    require(digest(canonical_bytes)==record.get('notesInputSHA256') and
            json.loads(canonical_bytes)==history,'authoritative notes input/source/build mismatch')
    require(digest(hb)==record.get('historySHA256'),'stale audit history')
    require(release['label']==history['currentRevisionId']==record.get('releaseLabel'),'game/history/version mismatch')
    label_decision=validate_label_decision(record,release,prior,evidence_root)
    require(json.loads(git(repo,'show',candidate+':public/update-history.json'))==history,'notes are not candidate source')
    require(json.loads(git(repo,'show',candidate+':public/release.json'))==release,'release is not candidate source')
    expected_rows=catalog(dist)
    require(record.get('payloadSHA256')==digest(encode(expected_rows)),'stale audit payload')
    if base==candidate:
        require(record.get('sameSourceVerification') is True and
                preimage.get('historySHA256')==digest(hb) and
                preimage.get('payloadSHA256')==record.get('payloadSHA256'),
                'same-source verification requires unchanged public history/payload')
    # Read current tracked product bytes; a clean tool HEAD alone is insufficient.
    for p in git(repo,'ls-tree','-r','--name-only',candidate).decode().splitlines():
        if p.startswith(('app/','lib/','components/','hooks/','assets/','public/')) or p=='pages-entry.tsx':
            actual=Path(repo)/p
            require(actual.is_file() and not actual.is_symlink() and actual.read_bytes()==git(repo,'show',candidate+':'+p),'working product source mismatch: '+p)
    current_entries=details(history)
    validate_version(record,prior,history,evidence_root)
    entries=record.get('entries',[])
    require(len(entries)==len(current_entries) and {e['revisionId'] for e in entries}==set(current_entries),'all-entry coverage missing/duplicate')
    known_refs=refs_of(history)
    for e in entries:
        actual=current_entries[e['revisionId']]
        require(e.get('status')==actual['status'],'entry status/reference mismatch')
        require(e.get('entrySHA256')==digest(encode(actual)),'stale full entry review')
        require(e.get('detailHashes')==[digest(t) for t in actual['details']],'deleted detail or stale entry review')
        require(e.get('reviewStatus') in ['supported','preserve-unresolved','correction'],'unreviewed history entry')
        require(e.get('reviewReason','').strip() and e.get('evidence'),'entry requires specific review evidence')
        for ref in e['evidence']:evidence(evidence_root,ref)
        source=e.get('runtimeSource')
        if actual['revisionId']==history['currentRevisionId']:
            require(source==candidate,'current entry must bind selected runtime source')
        elif source is not None:
            commit(repo,source);bound_source_evidence(evidence_root,e['evidence'],source)
        if e['reviewStatus']=='preserve-unresolved':
            require(e.get('missingEvidence','').strip(),'unresolved needs exact missing evidence')
    claims=record.get('claims',[])
    require(len(claims)==len(known_refs) and {c['detailRef'] for c in claims}==known_refs,'detail claim mapping missing/duplicate')
    for c in claims:
        require(c.get('visibility') in ['published','selected-for-release','historical-unresolved','nonpublic-history'],'unpublished claim/reference mismatch')
        ref=c.get('runtimeSource')
        rid=c['detailRef'].split(':')[0]
        entry_binding=next(e for e in entries if e['revisionId']==rid)
        require(c.get('runtimeSource')==entry_binding.get('runtimeSource'),'entry-specific claim runtime mismatch')
        if rid==history['currentRevisionId'] and c['visibility'] in ['published','selected-for-release']:
            require(c.get('runtimeSource')==candidate,'current claim is not selected runtime')
        if c['visibility']=='selected-for-release':require(ref==candidate,'claim is not selected candidate')
        elif c['visibility']=='published':commit(repo,ref)
        elif c['visibility']=='historical-unresolved':require(c.get('missingEvidence','').strip(),'unresolved claim evidence missing')
        elif c['visibility']=='nonpublic-history':require(current_entries[rid]['status']!='published','nonpublic claim marked published')
        require(c.get('evidence'),'claim lacks receipt/adoption evidence')
        for ref in c['evidence']:evidence(evidence_root,ref)
        if c['visibility'] in ['published','selected-for-release']:
            bound_source_evidence(evidence_root,c['evidence'],c['runtimeSource'])
            reject_contradictory_publication_label(evidence_root,c['evidence'],rid,current_entries[rid].get('label',rid))
    changes=changed_hunks(repo,base,candidate);mapped=record.get('changes',[])
    require(len(mapped)==len(changes) and {r['path'] for r in mapped}==set(changes),'runtime/static mapping missing/duplicate')
    for row in mapped:
        actual=changes[row['path']]
        require(row.get('patchSHA256')==actual['patchSHA256'],'stale change audit')
        hs=row.get('hunks',[])
        require(len(hs)==len(actual['hunks']) and [h['sha256'] for h in hs]==actual['hunks'],'hunk coverage missing/stale')
        for h in hs:
            require(h.get('dimensions') and set(h['dimensions'])<=DIMENSIONS,'missing/unknown dimension; misc is not coverage')
            if row['path'].startswith(('tests/','scripts/','.github/','docs/')):
                require(not h.get('detailRefs'),'tests/diagnostic/build plumbing is not a new public feature')
            if h.get('detailRefs'):
                require(set(h['detailRefs'])<=known_refs,'note reference mismatch')
            else:
                require(h.get('nonUserReasonCode') in ['tests','build-tooling','equivalent-internal','metadata','reverted-unadopted'],'non-user reason missing')
                require(len(h.get('reason','').strip())>=20 and h.get('evidence'),'specific non-user rationale/evidence required')
                for ref in h['evidence']:evidence(evidence_root,ref)
    require(prior.get('notices')==history.get('notices'),'historical reset notice changed')
    for rid,old in details(prior).items():
        if rid not in current_entries:continue
        for field in ['publishedAt','firstPublishedAt','recordedAt']:
            new=current_entries[rid]
            if old.get(field)==new.get(field):continue
            fixes=[r for r in record.get('dateCorrections',[]) if r.get('revisionId')==rid and r.get('field')==field]
            require(len(fixes)==1 and fixes[0].get('before')==old.get(field) and fixes[0].get('after')==new.get(field),'historical date silently rewritten')
            require(fixes[0].get('reason','').strip() and fixes[0].get('evidence'),'date correction evidence missing')
            for ref in fixes[0]['evidence']:evidence(evidence_root,ref)
    removed=refs_of(prior)-known_refs; decisions=record.get('removedDetails',[])
    require(len(decisions)==len(removed) and {r['detailRef'] for r in decisions}==removed,'deleted detail lacks explicit correction decision')
    for row in decisions:
        require(row.get('reason','').strip() and row.get('evidence'),'detail removal needs approved correction evidence')
        for ref in row['evidence']:evidence(evidence_root,ref)
    return {'schemaVersion':1,'sourceVerified':True,'source':candidate,'baseSource':base,
            'coverageSHA256':digest(encode(record)),'historySHA256':digest(hb),
            'notesInputSHA256':digest(canonical_bytes),
            'releaseSHA256':digest((Path(dist)/'release.json').read_bytes()),
            'releaseLabel':release['label'],'expectedReleaseLabel':record['expectedReleaseLabel'],
            'baselineReleaseLabel':label_decision['baselineReleaseLabel'],'allowReleaseIncrement':label_decision['allowIncrement'],
            'releaseLabelApprovalSHA256':record['releaseLabelApproval']['sha256'],'files':expected_rows,
            'payloadSHA256':digest(encode(expected_rows)),
            'semanticReviewRequired':True,'machineSemanticProof':False}
def validate_delivery(root,proof):
    root=Path(root);game=root/'site/illumi-drive'
    require(proof.get('schemaVersion')==1 and proof.get('sourceVerified') is True,'source coverage proof missing')
    require(proof.get('machineSemanticProof') is False and proof.get('semanticReviewRequired') is True,'semantic limit missing')
    require(re.fullmatch('[a-f0-9]{64}',proof.get('coverageSHA256','')) is not None,'coverage digest missing')
    release_bytes=(game/'release.json').read_bytes();history_bytes=(game/'update-history.json').read_bytes()
    require(digest(release_bytes)==proof['releaseSHA256'] and digest(history_bytes)==proof['historySHA256'],'stale delivery history/release')
    release=json.loads(release_bytes);history=json.loads(history_bytes)
    require(release['label']==history['currentRevisionId']==proof['releaseLabel'],'delivery R mismatch')
    require(proof.get('expectedReleaseLabel')==release['label'],'delivery label differs from approved expectation')
    require(type(proof.get('allowReleaseIncrement')) is bool and proof['allowReleaseIncrement']==(release['label']!=proof.get('baselineReleaseLabel')),'delivery increment decision mismatch')
    require(re.fullmatch('[a-f0-9]{64}',proof.get('releaseLabelApprovalSHA256','')) is not None,'release label approval binding missing')
    manifest=read(root/'delivery-manifest.json')
    require(manifest.get('releaseLabel')==release['label'],'Gateway/game R mismatch')
    actual=catalog(game);expected=proof['files']
    # The actual Pages carrier intentionally adds one byte-identical index alias.
    expected_paths={r['path'] for r in expected}
    if 'index.html' not in expected_paths and (game/'index.html').is_file():
        require((game/'index.html').read_bytes()==(game/'pages.html').read_bytes(),'unbound game index alias')
        actual=[r for r in actual if r['path']!='index.html']
    require(actual==expected and digest(encode(actual))==proof['payloadSHA256'],'stale actual delivery payload')
    return {'pass':True,'entries':len(history['entries']),'detailCount':sum(len(e['details']) for e in history['entries']),
            'semanticReviewStillRequired':True,'servedUIVerified':False}
def main():
    p=argparse.ArgumentParser();sub=p.add_subparsers(dest='mode',required=True)
    s=sub.add_parser('source');s.add_argument('--repo',required=True);s.add_argument('--dist',required=True);s.add_argument('--coverage',required=True);s.add_argument('--evidence-root',required=True);s.add_argument('--notes-input',required=True);s.add_argument('--proof-out',required=True)
    d=sub.add_parser('delivery');d.add_argument('--root',required=True);d.add_argument('--proof',required=True)
    a=p.parse_args()
    if a.mode=='source':
        proof=validate_source(a.repo,a.dist,read(a.coverage),a.evidence_root,a.notes_input)
        if a.proof_out=='-':result=proof
        else:
            out=Path(a.proof_out);require(not out.exists(),'refusing to overwrite fixed proof');out.write_bytes(encode(proof)+b'\n');result={'pass':True,'source':proof['source'],'semanticReviewStillRequired':True}
    else:result=validate_delivery(a.root,read(a.proof))
    print(json.dumps(result))
if __name__=='__main__':main()
