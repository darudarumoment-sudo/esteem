// ========================
// 🌱 Esteem - script.js
// ========================

// 行動
const actions = [
  "深呼吸を3回してみよう",
  "肩の力を少し抜いてみよう",
  "背筋を軽く伸ばしてみよう",
  "スマホから少し目を離してみよう",
  "目を閉じて10秒休んでみよう",
  "今いる場所の空気を感じてみよう",
  "ゆっくり息を吐いてみよう",
  "体の力が入っているところに気づいてみよう",
  "今の姿勢を少し整えてみよう",
  "一度手を止めてみよう",
  "今日ここまで頑張った自分を思い出してみよう"
];

// つなぎ
const connectors = [
  "よかったら",
  "できそうだったら",
  "無理のない範囲で",
  "ほんの少しだけ",
  "気が向いたら",
  "そのままで大丈夫だから"
];

// 意味づけ
const meanings = [
  "自分をいたわってあげよう",
  "今の自分を大切にしよう",
  "ここまでの頑張りを認めよう",
  "今の自分で十分だよ",
  "一歩ずつで大丈夫"
];

// ========================
// 今日の日付取得
// ========================

function getToday() {
  const today = new Date();
  return today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2, "0") + "-" +
    String(today.getDate()).padStart(2, "0");
}

// ========================
// ミッション生成
// ========================

function generateMission() {
  const a = actions[Math.floor(Math.random() * actions.length)];
  const c = connectors[Math.floor(Math.random() * connectors.length)];
  const m = meanings[Math.floor(Math.random() * meanings.length)];

  return `${c}、${a}。${m}`;
}

// ========================
// 今日のミッション表示
// ========================

function showMissions() {
  const today = getToday();
  const savedDate = localStorage.getItem("esteem-date");
  const savedMissions = localStorage.getItem("esteem-missions");

  let missions = [];

  // 今日すでに生成されている場合
  if (savedDate === today && savedMissions) {
    missions = JSON.parse(savedMissions);
  } else {
    // 新しく生成
    for (let i = 0; i < 3; i++) {
      missions.push(generateMission());
    }

    localStorage.setItem("esteem-date", today);
    localStorage.setItem("esteem-missions", JSON.stringify(missions));
  }

  // 表示
  const list = document.getElementById("mission-list");
  list.innerHTML = "";

  missions.forEach(m => {
    const li = document.createElement("li");
    li.textContent = m;
    list.appendChild(li);
  });
}
