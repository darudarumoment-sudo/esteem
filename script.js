// ========================
// 🌱 Esteem
// 今日1回だけミッション生成
// ========================

// 行動
const actions = [
  "深呼吸を3回してみよう",
  "肩の力を少し抜いてみよう",
  "背筋を軽く伸ばしてみよう",
  "スマホから少し目を離してみよう",
  "目を閉じて10秒休んでみよう",
  "ゆっくり息を吐いてみよう",
  "一度手を止めてみよう",
  "今の姿勢を少し整えてみよう",
  "今ここに意識を戻してみよう",
  "今日ここまで頑張った自分を思い出してみよう"
];

// つなぎ
const connectors = [
  "よかったら",
  "できそうだったら",
  "無理のない範囲で",
  "気が向いたら",
  "そのままで大丈夫だから"
];

// 意味づけ
const meanings = [
  "自分をいたわってあげよう",
  "今の自分で十分だよ",
  "ここまでの頑張りを認めよう",
  "一歩ずつで大丈夫",
  "無理しなくていいよ"
];

// ------------------------
// 今日の日付
// ------------------------
function getToday() {
  const d = new Date();
  return (
    d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

// ------------------------
// ミッション1つ作る
// ------------------------
function generateMission() {
  const a = actions[Math.floor(Math.random() * actions.length)];
  const c = connectors[Math.floor(Math.random() * connectors.length)];
  const m = meanings[Math.floor(Math.random() * meanings.length)];

  return `${c}、${a}。${m}`;
}

// ------------------------
// 今日のミッション表示
// ------------------------
function showMissions() {
  const today = getToday();

  const savedDate = localStorage.getItem("esteem-date");
  const savedMissions = localStorage.getItem("esteem-missions");

  let missions = [];

  // 今日すでに作られている場合
  if (savedDate === today && savedMissions) {
    missions = JSON.parse(savedMissions);
  } else {
    // 新しく作る
    for (let i = 0; i < 3; i++) {
      missions.push(generateMission());
    }

    localStorage.setItem("esteem-date", today);
    localStorage.setItem("esteem-missions", JSON.stringify(missions));
  }

  // 表示
  const list = document.getElementById("mission-list");
  list.innerHTML = "";

  missions.forEach(mission => {
    const li = document.createElement("li");
    li.textContent = mission;
    list.appendChild(li);
  });
}
