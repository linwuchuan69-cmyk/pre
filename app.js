const categories = ['エンタメ', '音楽', 'ゲーム', '料理', 'Vlog'];

const seedVideos = [
  {
    title: '3秒で分かる今日の神プレイ',
    channel: '@FastGameJP',
    views: 2840000,
    category: 'ゲーム',
    insight: '冒頭1秒で見せ場が始まり、視聴維持率が高い構成。',
    url: 'https://www.youtube.com/shorts/U6M2M8L2q8I',
  },
  {
    title: '深夜に作る背徳チーズ飯',
    channel: '@GohanLab',
    views: 1980000,
    category: '料理',
    insight: '短尺で完成まで見せる編集が保存・再視聴を促進。',
    url: 'https://www.youtube.com/shorts/SjfYx1SxWzY',
  },
  {
    title: '路上ライブで奇跡のハモり',
    channel: '@PocketSinger',
    views: 2330000,
    category: '音楽',
    insight: 'サビ先出しにより最初の離脱を抑えている。',
    url: 'https://www.youtube.com/shorts/KBUQz6d9Rz0',
  },
  {
    title: '駅前インタビュー10秒チャレンジ',
    channel: '@街角マイク',
    views: 1250000,
    category: 'Vlog',
    insight: 'テンポの速い字幕とオチでコメント率が高い。',
    url: 'https://www.youtube.com/shorts/f-9YvQ6S2X4',
  },
  {
    title: '予想外のラストが話題の寸劇',
    channel: '@MiniDramaJP',
    views: 1730000,
    category: 'エンタメ',
    insight: 'ラストまで見ないと意味が分からない構成で完走率が高い。',
    url: 'https://www.youtube.com/shorts/QjW0aL7fT2M',
  },
];

const dateInput = document.getElementById('dateInput');
const categoryFilter = document.getElementById('categoryFilter');
const cards = document.getElementById('cards');
const summary = document.getElementById('summary');
const refreshBtn = document.getElementById('refreshBtn');
const template = document.getElementById('cardTemplate');

const state = {
  selectedDate: toISO(new Date()),
  selectedCategory: 'all',
  history: JSON.parse(localStorage.getItem('shortsDigestHistory') ?? '{}'),
};

init();

function init() {
  dateInput.value = state.selectedDate;
  renderCategories();
  ensureDateData(state.selectedDate);
  render();

  dateInput.addEventListener('change', () => {
    state.selectedDate = dateInput.value;
    ensureDateData(state.selectedDate);
    render();
  });

  categoryFilter.addEventListener('change', () => {
    state.selectedCategory = categoryFilter.value;
    render();
  });

  refreshBtn.addEventListener('click', () => {
    state.history[state.selectedDate] = generateForDate(state.selectedDate);
    persist();
    render();
  });
}

function renderCategories() {
  for (const category of categories) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.append(option);
  }
}

function render() {
  const list = getCurrentList().filter((item) => {
    return state.selectedCategory === 'all' || item.category === state.selectedCategory;
  });

  cards.innerHTML = '';
  list.forEach((item, index) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelector('.rank').textContent = `TOP ${index + 1}`;
    node.querySelector('.category').textContent = item.category;
    node.querySelector('.title').textContent = item.title;
    node.querySelector('.meta').textContent = `${item.channel} ・ ${formatViews(item.views)} 回再生`;
    node.querySelector('.insight').textContent = item.insight;
    node.querySelector('.watch').href = item.url;
    cards.append(node);
  });

  const totalViews = list.reduce((sum, item) => sum + item.views, 0);
  summary.innerHTML = `
    <strong>${state.selectedDate} のダイジェスト</strong>
    <span>${list.length}本を掲載中 / 合計 ${formatViews(totalViews)} 再生。更新ボタンで今日分を再取得できます。</span>
  `;
}

function ensureDateData(date) {
  if (state.history[date]) {
    return;
  }

  state.history[date] = generateForDate(date);
  persist();
}

function getCurrentList() {
  return state.history[state.selectedDate] ?? [];
}

function persist() {
  localStorage.setItem('shortsDigestHistory', JSON.stringify(state.history));
}

function generateForDate(date) {
  const shift = Math.abs(hash(date)) % seedVideos.length;
  const dayOffset = Math.abs(hash(date + 'views')) % 500000;

  return seedVideos
    .map((item, index) => {
      const next = seedVideos[(index + shift) % seedVideos.length];
      return {
        ...next,
        views: next.views + dayOffset - index * 60000,
      };
    })
    .sort((a, b) => b.views - a.views);
}

function formatViews(value) {
  return Intl.NumberFormat('ja-JP').format(value);
}

function hash(input) {
  let result = 0;
  for (let i = 0; i < input.length; i += 1) {
    result = (result << 5) - result + input.charCodeAt(i);
    result |= 0;
  }
  return result;
}

function toISO(date) {
  return date.toISOString().slice(0, 10);
}
