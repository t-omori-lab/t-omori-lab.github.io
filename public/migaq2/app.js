import { JOURNEYS } from "/migaq2/data.js";

const app = document.querySelector("#app");
const params = new URLSearchParams(location.search);
const requestedCase = params.get("m2r14case");
let active = JOURNEYS.find((journey) => journey.caseId === requestedCase) || JOURNEYS[0];
let view = "after";

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/gu, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[character] || character);
}

function routeFor(caseId) {
  return `?m2r14=1&m2r14case=${encodeURIComponent(caseId)}`;
}

function header() {
  return `<header class="studio-header">
    <a class="brand" href="/migaq2/" aria-label="MIGAQ 2 Studioの先頭へ">
      <span class="brand-mark">M2</span>
      <span><strong>MIGAQ 2</strong><small>Design Planning Studio</small></span>
    </a>
    <div class="header-status"><span class="mode-pill fixture">M2-R14価値比較</span><span class="progress-pill"><i></i>二つの経路を比較</span></div>
  </header>`;
}

function comparison(journey) {
  const navigation = JOURNEYS.map((entry) => {
    const current = entry.caseId === journey.caseId;
    return `<a href="${routeFor(entry.caseId)}" class="${current ? "current" : ""}" ${current ? 'aria-current="page"' : ""}><span>${String(entry.ordinal).padStart(2, "0")}</span>${escapeHtml(entry.shortLabel)}</a>`;
  }).join("");
  const snapshots = {
    after: { label: "本人が反映した後", text: journey.migaq.fieldDelta.after },
    reload: { label: "再読込後", text: journey.migaq.fieldDelta.after },
    undo: { label: "undo後", text: journey.migaq.undo.restoredText || "（この項目は空に戻りました）" },
  };
  const visible = snapshots[view];
  const decisionLabel = journey.migaq.decision.outcome === "modified" ? "AI案を本人が修正して反映" : "AI案を本人が採用して反映";
  const provenanceLabel = journey.migaq.decision.generationSource === "ai_generated_learner_modified" ? "AI案＋本人の修正" : "AI案（本人が採用）";
  const first = journey.sharedContext.acceptedFirstResponse;
  return `<main class="proof-b-page">
    <section class="proof-b-hero" aria-labelledby="proof-b-title">
      <div><p class="eyebrow">Proof B / API-free authored journey</p><h1 id="proof-b-title">強いチャットと比べて、<br><em>MIGAQに残る価値はあるか。</em></h1></div>
      <p>同じ元入力、同じM2-R13受入済み初回応答、同じ本人の返答2件を使って、「通常チャット」と「MIGAQで企画書・履歴・出所を管理する経路」を比べます。</p>
    </section>
    <nav class="proof-b-nav" aria-label="比較する6つの行程">${navigation}</nav>
    <section class="proof-b-shared">
      <div class="proof-b-section-head"><span>共通の出発点</span><strong>${escapeHtml(journey.shortLabel)} / ${escapeHtml(journey.title)}</strong></div>
      <article><span>本人が最初に書いたこと</span><p>${escapeHtml(journey.sharedContext.originalIdea)}</p><small>この原文は後のAI案で上書きしません。</small></article>
      <details><summary>両経路が共通で受け取る初回のAI仮説</summary>
        <div><span>企画をどう組み替えるか</span><p>${escapeHtml(first.projectReframe)}</p></div>
        <div><span>なぜ価値が生まれるか</span><p>${escapeHtml(first.valueCreated)}</p></div>
        <div><span>最初に確かめる一点</span><p>${escapeHtml(first.decisiveUncertainty)}</p></div>
      </details>
      <p class="proof-b-disclosure">通常チャット側も現行案と次の助言を保持し、意図的に弱くしていません。どちらも著者作成例であり、実ユーザーの価値証拠ではありません。</p>
    </section>
    <section class="proof-b-arms">
      <article class="proof-b-arm ordinary-arm">
        <header><span>A</span><div><strong>通常チャット</strong><small>良い回答と簡潔な現行案を保持</small></div></header>
        <section><span>本人の修正後の現行案</span><p>${escapeHtml(journey.ordinaryChat.currentPlan)}</p></section>
        <section class="proof-b-dialogue"><span>その後の会話</span>
          <div class="learner"><b>本人</b><p>${escapeHtml(journey.sharedContext.learnerTurns[0])}</p></div>
          <div class="assistant"><b>AI</b><p>${escapeHtml(journey.ordinaryChat.assistantReplies[0])}</p></div>
          <div class="learner"><b>本人の観察</b><p>${escapeHtml(journey.sharedContext.learnerTurns[1])}</p></div>
          <div class="assistant"><b>AI</b><p>${escapeHtml(journey.ordinaryChat.assistantReplies[1])}</p></div>
        </section>
        <section class="proof-b-next"><span>次に現実ですること</span><p>${escapeHtml(journey.ordinaryChat.nextRealWorldAction)}</p></section>
        <p class="proof-b-arm-note">強み：自然に相談できる。限界：元の着想、AI案、本人の修正、企画書の差分を構造として残すには、別の管理が必要。</p>
      </article>
      <article class="proof-b-arm migaq-arm">
        <header><span>M2</span><div><strong>MIGAQ</strong><small>仮説・本人の判断・企画書・履歴を分けて保持</small></div></header>
        <section class="proof-b-delta"><span>企画書で変えた一項目</span><strong>${escapeHtml(journey.migaq.fieldDelta.fieldLabel)}</strong>
          <div class="delta-columns"><article><small>反映前</small><p>${escapeHtml(journey.migaq.fieldDelta.before || "（まだ空）")}</p></article><article><small>${escapeHtml(visible.label)}</small><p>${escapeHtml(visible.text)}</p></article></div>
          <div class="proof-b-view-switch" role="group" aria-label="企画書の状態を確認"><button type="button" data-proof-view="after" class="${view === "after" ? "current" : ""}">反映後</button><button type="button" data-proof-view="reload" class="${view === "reload" ? "current" : ""}">再読込</button><button type="button" data-proof-view="undo" class="${view === "undo" ? "current" : ""}">undo</button></div>
        </section>
        <section class="proof-b-authority"><span>だれが決めたか</span><dl><div><dt>判断</dt><dd>${escapeHtml(decisionLabel)}</dd></div><div><dt>出所</dt><dd>${escapeHtml(provenanceLabel)}</dd></div><div><dt>本人の理由</dt><dd>${escapeHtml(journey.migaq.decision.reason)}</dd></div></dl></section>
        <section class="proof-b-next"><span>次に現実ですること</span><p>${escapeHtml(journey.migaq.nextRealWorldAction)}</p></section>
        <section class="proof-b-observation"><span>本人が戻した観察</span><p>${escapeHtml(journey.migaq.observation.happened)}</p><small>${escapeHtml(journey.migaq.observation.interpretation)}</small></section>
        <section class="proof-b-pending"><span>観察後のAI仮説</span><p>${escapeHtml(journey.migaq.pendingAiHypothesis?.proposedText || "")}</p><small>未採用・企画書未反映。本人が次に判断する案です。</small></section>
        <div class="proof-b-proof-strip"><span>履歴 ${journey.migaq.historyCount}件</span><span>再読込 一致</span><span>undo 履歴保持</span><span>更新 1項目</span></div>
      </article>
    </section>
    <section class="proof-b-review"><div><span>直接レビュー</span><h2>この管理構造は、強いチャットより本質的に役立つか。</h2></div><ol><li>通常チャットと比べ、着想と判断の出所が明らかになるか。</li><li>自分の修正が企画書の何を変えたか分かるか。</li><li>観察から次の未採用仮説への接続は、考えを前に進めるか。</li><li>この履歴・undo・再読込は、実際に使い続けたい価値か。</li></ol><p>現時点で証明できるのは、このAPI-free作成例が六種類の行程を通り、本人の決定権と履歴を保つことだけです。任意の日本語理解、AI仮説の質、実ユーザー価値はまだ証明していません。</p></section>
  </main>`;
}

function render() {
  app.innerHTML = `${header()}${comparison(active)}<footer><span>API-free作成例 · 比較結果は保存しません</span><span>6つの固定ケース</span></footer>`;
  document.querySelectorAll("[data-proof-view]").forEach((button) => button.addEventListener("click", () => {
    view = button.dataset.proofView || "after";
    render();
  }));
}

render();
