import { PREVIEW_CASES } from "./data.js";

const tabs = document.querySelector("#case-tabs");
const stage = document.querySelector("#case-stage");

if (!(tabs instanceof HTMLElement) || !(stage instanceof HTMLElement)) {
  throw new Error("Preview 01 mount points are missing.");
}

const node = (tag, options = {}, children = []) => {
  const element = document.createElement(tag);
  if (options.className) element.className = options.className;
  if (options.text !== undefined) element.textContent = options.text;
  for (const [name, value] of Object.entries(options.attrs || {})) {
    element.setAttribute(name, String(value));
  }
  for (const child of children) if (child) element.append(child);
  return element;
};

const paragraph = (text, className = "") => node("p", { text, className });

const provenance = (kind, label, flag = "") => {
  const row = node("div");
  row.append(node("span", { className: `provenance-label ${kind}`, text: label }));
  if (flag) row.append(node("span", { className: "unadopted-flag", text: flag }));
  return row;
};

const chatTurn = (owner, text, assistant = false) => node("div", {
  className: `chat-turn${assistant ? " assistant" : ""}`,
}, [
  paragraph(owner, "turn-owner"),
  paragraph(text),
]);

const detailList = (items) => {
  const list = node("ul");
  for (const item of items) list.append(node("li", { text: item }));
  return list;
};

const buildSharedOrigin = (entry) => {
  const idea = node("div", {}, [
    provenance("", "本人の最初の着想"),
    node("h3", { text: "両方に渡す同じ起点" }),
    paragraph(entry.originalIdea),
  ]);

  const proposalDetails = node("details", {}, [
    node("summary", { text: "仮説の価値・未確認点・AIの前提を見る" }),
    node("h4", { text: "この仮説が生む価値" }),
    paragraph(entry.aiProposal.value),
    node("h4", { text: "決定的に未確認なこと" }),
    paragraph(entry.aiProposal.uncertainty),
    node("h4", { text: "AIが置いた前提" }),
    detailList(entry.aiProposal.assumptions),
  ]);

  const proposal = node("div", { className: "proposal-summary" }, [
    provenance("ai", "AIの最初の仮説", "未採用"),
    node("h3", { text: "強い案を先に提示する" }),
    paragraph(entry.aiProposal.reframe),
    proposalDetails,
  ]);

  return node("section", { className: "shared-origin", attrs: { "aria-label": "両経路に共通する起点" } }, [
    node("div", { className: "shared-origin-grid" }, [idea, proposal]),
  ]);
};

const buildOrdinaryRoute = (entry) => {
  const summary = node("div", { className: "ordinary-summary" }, [
    node("h3", { text: "会話から読み取れる現行案" }),
    paragraph(entry.ordinary.currentPlan),
    node("h3", { text: "提案された試し方" }),
    paragraph(entry.ordinary.nextAction),
  ]);

  return node("article", { className: "route-card ordinary-route" }, [
    paragraph("ROUTE A", "route-kicker"),
    node("h3", { text: "強い通常チャット" }),
    paragraph("本人の修正を理解し、次の助言まで返す。比較のために回答品質を下げていません。"),
    chatTurn("本人", entry.learnerTurns[0]),
    chatTurn("AI", entry.ordinary.replies[0], true),
    chatTurn("本人の観察", entry.learnerTurns[1]),
    chatTurn("AI", entry.ordinary.replies[1], true),
    summary,
  ]);
};

const buildDocumentCard = (entry) => {
  const beforeText = entry.document.before || "（まだ記入なし）";
  const card = node("section", { className: "document-card", attrs: { "aria-label": "企画書の一項目の差分" } });
  const header = node("div", { className: "document-card-header" }, [
    node("div", {}, [
      provenance("decision", "本人が修正して採用"),
      node("h3", { text: entry.document.fieldLabel }),
    ]),
    paragraph(entry.document.fieldPath, "field-path"),
  ]);

  const delta = node("div", { className: "delta-row" }, [
    node("div", { className: "delta-block before" }, [
      node("span", { className: "delta-label", text: "更新前" }),
      paragraph(beforeText, "delta-text"),
    ]),
    node("div", { className: "delta-arrow", text: "→", attrs: { "aria-hidden": "true" } }),
    node("div", { className: "delta-block after" }, [
      node("span", { className: "delta-label", text: "本人の判断後" }),
      paragraph(entry.document.after, "delta-text"),
    ]),
  ]);

  const reason = node("div", { className: "decision-reason" });
  reason.append(node("strong", { text: "更新理由　" }), document.createTextNode(entry.document.reason));
  card.append(header, delta, reason);
  return card;
};

const buildMigaqRoute = (entry) => {
  const loop = node("div", { className: "observation-loop" }, [
    node("div", { className: "loop-card" }, [
      provenance("observation", "本人が述べた観察"),
      paragraph(entry.observation.happened),
      paragraph(`読み取り：${entry.observation.interpretation}`),
    ]),
    node("div", { className: "loop-card next" }, [
      provenance("ai", "観察から出た次のAI仮説", "未採用"),
      paragraph(entry.nextHypothesis),
    ]),
  ]);

  return node("article", { className: "route-card migaq-route" }, [
    paragraph("ROUTE B", "route-kicker"),
    node("h3", { text: "MIGAQ2" }),
    paragraph("会話に加え、本人が選んだ変更だけを企画書へ反映し、その理由と出所を残します。"),
    chatTurn("本人の判断", entry.learnerTurns[0]),
    buildDocumentCard(entry),
    node("div", { className: "ordinary-summary" }, [
      node("h3", { text: "本人が選んだ小さな試行" }),
      paragraph(entry.nextAction),
    ]),
    loop,
  ]);
};

const buildHistoryDemo = (entry) => {
  const currentText = node("span", { text: entry.document.after });
  const state = node("div", { className: "history-state", attrs: { role: "status", "aria-live": "polite" } }, [currentText]);
  const steps = ["元の着想", "AI仮説（未採用）", "本人の判断", "企画書を1項目更新", "観察→次の未採用仮説"];
  const track = node("div", { className: "history-track", attrs: { "aria-label": `${entry.history.count}件の履歴から主要5段階を表示` } });
  steps.forEach((label, index) => track.append(node("span", { className: `history-step${index === 4 ? " active" : ""}`, text: label })));

  const undo = node("button", { text: "更新前に戻す", attrs: { type: "button" } });
  const reload = node("button", { text: "固定状態を再読み込み", attrs: { type: "button" } });
  undo.addEventListener("click", () => {
    currentText.textContent = `取り消し後：${entry.history.undoText || "（記入なし）"}。企画書は更新前へ戻りました。判断履歴は残ります。`;
    state.dataset.viewState = "undo";
  });
  reload.addEventListener("click", () => {
    currentText.textContent = `再読み込み後：${entry.document.after}。固定した採用後の状態へ戻りました。`;
    state.dataset.viewState = "reloaded";
  });

  return node("section", { className: "history-demo", attrs: { "aria-label": "固定した履歴、取り消し、再読み込みのデモ" } }, [
    node("div", { className: "history-demo-header" }, [
      node("div", {}, [
        paragraph("HISTORY / IN-MEMORY DEMO", "route-kicker"),
        node("h3", { text: "元に戻せる。戻しても、判断の記録は消えない。" }),
      ]),
      node("div", { className: "history-actions" }, [undo, reload]),
    ]),
    track,
    state,
  ]);
};

const buildConclusion = (entry) => node("section", { className: "route-conclusion" }, [
  node("h3", { text: "この作例で見える差" }),
  paragraph(entry.visibleDifference),
]);

const renderCase = (entry, selectedIndex) => {
  stage.replaceChildren();
  stage.setAttribute("role", "tabpanel");
  stage.setAttribute("aria-labelledby", `case-tab-${selectedIndex + 1}`);

  const heading = node("header", { className: "case-heading" }, [
    paragraph(String(selectedIndex + 1).padStart(2, "0"), "case-count"),
    node("div", {}, [
      node("h2", { text: entry.title }),
      paragraph(entry.id, "case-id"),
    ]),
  ]);

  stage.append(
    heading,
    buildSharedOrigin(entry),
    node("section", { className: "route-comparison", attrs: { "aria-label": "通常チャットとMIGAQ2の比較" } }, [
      buildOrdinaryRoute(entry),
      buildMigaqRoute(entry),
    ]),
    buildHistoryDemo(entry),
    buildConclusion(entry),
  );
};

let selectedIndex = Math.max(0, PREVIEW_CASES.findIndex((entry) => entry.id === new URLSearchParams(window.location.search).get("case")));

const selectCase = (index, { focus = false } = {}) => {
  selectedIndex = index;
  const buttons = [...tabs.querySelectorAll("button")];
  buttons.forEach((button, buttonIndex) => {
    const selected = buttonIndex === index;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  renderCase(PREVIEW_CASES[index], index);
  if (focus) buttons[index]?.focus();
};

PREVIEW_CASES.forEach((entry, index) => {
  const button = node("button", {
    className: "case-tab",
    attrs: {
      id: `case-tab-${index + 1}`,
      type: "button",
      role: "tab",
      "aria-controls": "case-stage",
      "aria-selected": "false",
      tabindex: "-1",
    },
  }, [
    node("span", { className: "case-tab-index", text: `CASE ${String(index + 1).padStart(2, "0")}` }),
    node("span", { className: "case-tab-label", text: entry.shortLabel }),
  ]);
  button.addEventListener("click", () => selectCase(index));
  button.addEventListener("keydown", (event) => {
    if (!new Set(["ArrowRight", "ArrowLeft", "Home", "End"]).has(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") return selectCase(0, { focus: true });
    if (event.key === "End") return selectCase(PREVIEW_CASES.length - 1, { focus: true });
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = (index + direction + PREVIEW_CASES.length) % PREVIEW_CASES.length;
    selectCase(next, { focus: true });
  });
  tabs.append(button);
});

selectCase(selectedIndex);
