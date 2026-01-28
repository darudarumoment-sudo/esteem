const missionList = [
  "コップ一杯の水を飲む",
  "深呼吸を3回する",
  "1分だけ目を閉じる",
  "机の上を1つ片付ける",
  "自分に「よくやってる」と言う",
  "スマホを置いて30秒休む",
  "背伸びをする"
];

function generateMissions() {
  const ul = document.getElementById("missions");
  const message = document.getElementById("message");

  ul.innerHTML = "";
  message.textContent = "";

  const shuffled = missionList.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  selected.forEach(mission => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", checkAllDone);

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(" " + mission));

    ul.appendChild(li);
  });
}

function checkAllDone() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const message = document.getElementById("message");

  const allChecked = Array.from(checkboxes).every(cb => cb.checked);

  if (allChecked) {
    message.textContent = "🌱 今日もよくやったね。小さな一歩、ちゃんと積み重なってるよ。";
  } else {
    message.textContent = "";
  }
}

const today = new Date().toDateString();
const savedDay = localStorage.getItem("day");

if (savedDay !== today) {
  localStorage.setItem("day", today);
  generateMissions();
}
