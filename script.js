const missions = [
  "誰かにありがとうを言う",
  "5分だけ片付けをする",
  "背筋を伸ばす",
  "水を1杯飲む",
  "スマホを1回置く",
  "深呼吸を3回する",
  "自分を褒める",
  "外の空を見る",
  "笑顔を作る",
  "今日頑張ったことを思い出す"
];

function showMissions() {
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem("missionDate");

  // 今日すでに生成してたら再表示
  if (savedDate === today) {
    document.getElementById("mission-list").innerHTML =
      localStorage.getItem("missionHTML");
    return;
  }

  // 新しく生成
  const list = document.getElementById("mission-list");
  list.innerHTML = "";

  const selected = missions.sort(() => 0.5 - Math.random()).slice(0, 3);

  selected.forEach((text) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = checkComplete;

    li.appendChild(checkbox);
    li.append(" " + text);
    list.appendChild(li);
  });

  localStorage.setItem("missionDate", today);
  localStorage.setItem("missionHTML", list.innerHTML);
}

function checkComplete() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const allChecked = [...checkboxes].every(cb => cb.checked);

  if (!allChecked) return;

  const message = document.getElementById("message");
  const streakEl = document.getElementById("streak");

  // === 連続日数処理 ===
  const today = new Date();
  const todayStr = today.toDateString();

  const lastDate = localStorage.getItem("lastClearDate");
  let streak = Number(localStorage.getItem("streak")) || 0;

  if (lastDate) {
    const diff =
      (today - new Date(lastDate)) / (1000 * 60 * 60 * 24);

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

  // === 表示 ===
  message.textContent = "🎉 おめでとう！今日のミッション達成！";
  streakEl.textContent = `🔥 ${streak}日連続達成！`;
}
