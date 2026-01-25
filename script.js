const trendTags = [
  "熱愛スクープ",
  "新ドラマ",
  "フェス出演",
  "バラエティ復帰",
  "映画賞ノミネート",
  "舞台挨拶",
];

const topNews = [
  {
    badge: "速報",
    title: "人気俳優が出演の新シリーズが制作決定",
    source: "エンタメ速報",
    time: "2時間前",
  },
  {
    badge: "話題",
    title: "歌姫の最新MVが24時間で1000万再生突破",
    source: "ミュージックNOW",
    time: "4時間前",
  },
  {
    badge: "特集",
    title: "バラエティ番組の裏側、制作陣が語る新戦略",
    source: "テレビプレス",
    time: "6時間前",
  },
  {
    badge: "分析",
    title: "芸能ニュースで伸びるキーワードランキング",
    source: "SNS分析ラボ",
    time: "8時間前",
  },
];

const entertainmentItems = [
  {
    title: "春ドラマのキャスト相関図まとめ",
    description: "注目俳優の出演情報を一覧で整理。",
  },
  {
    title: "映画公開前インタビューまとめ",
    description: "監督コメントとキャストの意気込みを収録。",
  },
  {
    title: "音楽フェス速報",
    description: "タイムテーブルと出演者の見どころを更新中。",
  },
];

const gossipItems = [
  {
    level: "高",
    color: "#34c759",
    title: "大物タレントの大型プロジェクト参加が確定",
    description: "制作会社・関係者の発言が複数一致。",
  },
  {
    level: "中",
    color: "#f7b731",
    title: "人気アイドルの新ユニット結成がSNSで話題",
    description: "公式発表前のリーク情報が拡散中。",
  },
  {
    level: "低",
    color: "#ff3b30",
    title: "ドラマ共演者のプライベート旅行の噂",
    description: "目撃情報のみで真偽は未確認。",
  },
];

const rankingItems = [
  {
    name: "ドラマ主演発表のインパクト",
    score: "話題度 98",
  },
  {
    name: "バンド復活ライブ告知",
    score: "話題度 93",
  },
  {
    name: "映画祭レッドカーペット速報",
    score: "話題度 89",
  },
  {
    name: "バラエティ特番の裏話",
    score: "話題度 84",
  },
];

const editorialPrompt = `あなたは芸能・ネットニュースに強い編集者です。 以下の条件で「トレンド人物ニュース1つ＋過去の類似ニュース人物まとめ」を作成してください。 【目的】 いまネット記事で話題の人物ニュースを1つ取り上げ、 同じ系統の話題で過去に注目された芸能人・著名人を複数ピックアップして、 読者が「似た流れ」「共通点」「違い」まで理解できるように詳しくまとめる。 【必須ルール】 - 2026年1月の最新トレンドから1件選ぶ（ネット記事で話題の人物ニュース） - そのニュースと同系統の過去事例を16
人選び、各人物を詳しく説明する - 事実ベースで書き、推測や断定はしない（曖昧な点は曖昧と明記） - 主要な根拠は必ず複数の信頼できるニュースソースから確認する - 最後に「共通点」「パターン」「今回が伸びた理由」を分析する 【出力形式】 1) 最新トレンド人物ニュース（1件） - 人物名： - 何が起きたか（要約）： - なぜ話題になったか（ポイント3つ）： - SNS/ネットの反応（典型コメント例を要約で3つ）： 2) 過去の類似ニュースになった人物（6〜10人） 各人物ごとに - 人物名： - いつ頃・何が話題になったか： - 何が注目ポイントだったか： - 世間の反応： - 今回ニュースとの共通点・違い： 3) 比較まとめ - 共通するパターン（箇条書き） - 炎上/好感の分かれ目 - 今回が特に伸びやすい理由（3つ） - 読者が「次に気になる視点」（1〜2行） 【文章トーン】 読みやすく、テンポ良く、でも情報は濃く。 見出し多めで、1段落は長くしすぎない。`;

const trendTagList = document.getElementById("trend-tags");
const topNewsGrid = document.getElementById("top-news-grid");
const entertainmentList = document.getElementById("entertainment-list");
const gossipGrid = document.getElementById("gossip-grid");
const rankingList = document.getElementById("ranking-list");
const lastUpdated = document.getElementById("last-updated");
const editorPromptField = document.getElementById("editor-prompt");
const copyButton = document.getElementById("copy-prompt");
const copyStatus = document.getElementById("copy-status");

trendTags.forEach((tag) => {
  const li = document.createElement("li");
  li.textContent = tag;
  trendTagList.appendChild(li);
});

lastUpdated.textContent = new Date().toLocaleString("ja-JP", {
  dateStyle: "medium",
  timeStyle: "short",
});

topNews.forEach((news) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <span class="card__badge">${news.badge}</span>
    <h3 class="card__title">${news.title}</h3>
    <div class="card__meta">
      <span>${news.source}</span>
      <span>${news.time}</span>
    </div>
  `;
  topNewsGrid.appendChild(card);
});

entertainmentItems.forEach((item) => {
  const wrapper = document.createElement("article");
  wrapper.className = "mini-item";
  wrapper.innerHTML = `
    <h4>${item.title}</h4>
    <p>${item.description}</p>
  `;
  entertainmentList.appendChild(wrapper);
});

gossipItems.forEach((item) => {
  const card = document.createElement("article");
  card.className = "gossip-card";
  card.innerHTML = `
    <div class="gossip-card__level">
      <span style="background:${item.color}"></span>
      信頼度 ${item.level}
    </div>
    <h4>${item.title}</h4>
    <p class="gossip-card__desc">${item.description}</p>
  `;
  gossipGrid.appendChild(card);
});

rankingItems.forEach((item, index) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${index + 1}. ${item.name}</span>
    <span class="ranking__meta">${item.score}</span>
  `;
  rankingList.appendChild(li);
});

editorPromptField.value = editorialPrompt;

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(editorialPrompt);
    copyStatus.textContent = "プロンプトをコピーしました。";
    copyStatus.classList.add("editor__note--success");
  } catch (error) {
    copyStatus.textContent = "コピーに失敗しました。手動で選択してください。";
    copyStatus.classList.remove("editor__note--success");
  }
});
