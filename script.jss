const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand();
}

let rating = 0;
let wishes = [
  "Глубокий минет",
  "Прищепки на соски",
  "Удушение руками"
];
let rewards = [
  "Получить шоколадку",
  "Оплата сотовой связи",
  "Массаж спины"
];

const screens = {
  start: document.getElementById("screen-start"),
  number: document.getElementById("screen-number"),
  wish: document.getElementById("screen-wish"),
  reward: document.getElementById("screen-reward"),
  end: document.getElementById("screen-end")
};
const nicknameInput = document.getElementById("nickname");
const wishNumberInput = document.getElementById("wish-number");
const wishText = document.getElementById("wish-text");
const rewardText = document.getElementById("reward-text");
const ratingBox = document.getElementById("rating");
const finalRating = document.getElementById("final-rating");

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.add("hidden"));
  screens[name].classList.remove("hidden");
}

function updateRating() {
  ratingBox.textContent = `Рейтинг: ${rating}`;
}

document.getElementById("btn-start").onclick = () => {
  const nick = nicknameInput.value.trim();
  if (!nick) return alert("Введите ник");
  showScreen("number");
};

document.getElementById("btn-show-wish").onclick = () => {
  const num = parseInt(wishNumberInput.value);
  if (isNaN(num) || num < 1 || num > wishes.length) {
    return alert("Неверный номер");
  }
  wishText.textContent = wishes[num - 1];
  showScreen("wish");
};

document.getElementById("btn-done").onclick = () => {
  const num = parseInt(wishNumberInput.value);
  rating += 2;
  updateRating();
  rewardText.textContent = rewards[num - 1];
  wishes.splice(num - 1, 1);
  rewards.splice(num - 1, 1);
  showScreen("reward");
};

document.getElementById("btn-fail").onclick = () => {
  rating -= 1;
  updateRating();
  if (wishes.length === 0) {
    finalRating.textContent = rating;
    showScreen("end");
  } else {
    showScreen("number");
  }
};

document.getElementById("btn-next").onclick = () => {
  if (wishes.length === 0) {
    finalRating.textContent = rating;
    showScreen("end");
  } else {
    showScreen("number");
  }
};

document.getElementById("btn-restart").onclick = () => {
  location.reload();
};
