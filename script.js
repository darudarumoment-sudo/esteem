// ========================
// 🌱 Esteem - AI風ランダムミッション（40個対応）
// ========================

// ✅ 行動パターン（40個）
const actions = [
  // ① 体を動かす系
  "深呼吸を3回してみよう",
  "背筋を伸ばしてみよう",
  "肩を軽く回してみよう",
  "手首や指をゆっくり回そう",
  "立ち上がって伸びをしてみよう",
  "足首を軽く回そう",
  "軽くストレッチしよう",
  "目を閉じて肩の力を抜こう",
  "椅子に座り直して姿勢を整えよう",
  "軽くジャンプして血流を流そう",

  // ② 心を整える系
  "目を閉じて1分間呼吸に集中しよう",
  "今日頑張ったことを思い出してみよう",
  "自分に「よくやった」と言ってみよう",
  "今ここに意識を戻してみよう",
  "感謝できることを1つ思い浮かべよう",
  "短い瞑想をしてみよう",
  "ゆっくりと目を閉じて休もう",
  "好きな香りをかいでみよう",
  "好きな音楽を1分聴こう",
  "心の中で「ありがとう」とつぶやこう",

  // ③ 習慣・整理系
  "机の周りを少し片付けよう",
  "ノートや手帳を1分整理しよう",
  "今日のやることを1つ書き出そう",
  "本を1ページ読んでみよう",
  "ゴミを1つ捨てよう",
  "メールを1通整理しよう",
  "ペンを1本整頓しよう",
  "デスクの位置を少し直そう",
  "ペットボトルをまとめてみよう",
  "鍵や財布の置き場所を整えよう",

  // ④ 気分・コミュニケーション系
  "誰かにありがとうを言おう",
  "家族や友達に簡単な挨拶をしてみよう",
  "近所を1分歩いて外の空気を吸おう",
  "笑顔を作ってみよう",
  "今日の気分を1つ言葉にしてみよう",
  "SNSを1分だけ閉じてみよう",
  "好きな写真を見返してみよう",
  "好きな香りで気分をリフレッシュしよう",
  "軽く歌ってみよう",
  "自分の好きなことを1つ思い出そう"
];

// ✅ その他パーツ（対象・言い回し）
const targets = [
  "今この瞬間",
  "1分だけ",
  "5分だけ",
  "無理のない範囲で",
  "気が向いたら",
  "少しだけ",
  "今日できたら",
  "休憩中に",
  "ちょっと立ち上がって",
  "深呼吸と一緒に"
];

const endings = [
  "やってみよう",
  "やってみてね",
  "だけでも十分だよ",
  "それでOK",
  "できたらすごいよ",
  "楽しんでやってみよう",
  "自分をいたわってね",
  "無理せずやろう"
];

// ------------------------
// 今日の日付
// ------------------------
function getToday() {
  const d = new Date();
  return d.toDateString();
}

// ------------------------
// ミッション生成
// ------------------------
function generateMission() {
  const a = actions[Math.floor(Math.random() * actions.length)];
  const t = targets[Math.floor(Math.random() * targets.length)];
  const e = endings[Math.floor(Math.random() * endings.length)];

  return `${t}、${a}。${e}`;
}

// ------------------------
// チェックと連続日数
// ------------------------
function checkComplete() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const allChecked = [...checkboxes].every(cb => cb.checked);

  const message = document.getElementById("message");
  const streakEl = document.getElementById("streak");

  if (!allChecked) {
    message.textContent = "";
    streakEl.textContent = "";
    return;
  }

  const today = new Date();
  const todayStr = today.toDateString();

  const lastDate = localStorage.getItem("lastClearDate");
  let streak = Number(localStorage.getItem("streak")) || 0;

  if (lastDate) {
    const diff = (today - new Date(lastDate)) / (1000 * 60 * 60 * 24);
    if (diff >= 1 && diff < 2) {
      streak += 1;
    } else if (diff < 1) {
      // 今日すでに達成済み
    } else {
      streak = 1;
    }
  } else {
    streak = 1;
  }

  localStorage.setItem("lastClearDate", todayStr);
  localStorage.setItem("streak", streak);

  // 表示
  message.textContent = "🎉 おめでとう！今日のミッション達成！";
  streakEl.textContent = `🔥 ${streak}日連続達成！`;
}

// ------------------------
// 今日のミッションを表示
// ------------------------
function showMissions() {
  const today = getToday();
  const savedDate = localStorage.getItem("missionDate");
  const savedMissions = JSON.parse(localStorage.getItem("missionData") || "[]");

  let missions = [];

  if (savedDate === today && savedMissions.length === 3) {
    missions = savedMissions;
  } else {
    missions = [];
    for (let i = 0; i < 3; i++) {
      missions.push(generateMission());
    }
    localStorage.setItem("missionDate", today);
    localStorage.setItem("missionData", JSON.stringify(missions));
  }

  const list = document.getElementById("mission-list");
  list.innerHTML = "";

  missions.forEach((text) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", checkComplete);

    li.appendChild(checkbox);
    li.append(" " + text);
    list.appendChild(li);
  });

  // ページ再表示時も判定
  checkComplete();
}
