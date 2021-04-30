const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const greetingName = document.getElementById("greetingName");
const welcome = document.querySelector(".welcome-greeting");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";
const UNIQE_NM = 3;

const greetingText = {
  0: "좋은 하루 되세요!",
  1: "가끔은 어딘가로 놀러가요!",
  2: "모든 것이 다 잘될거에요!",
  3: "비가 오네요. 우산은 챙기셨나요?",
  4: "밖에 눈이오고 있어요!",
  5: "바람이 부네요. 감기조심하세요!",
};

function getRandomNumber() {
  let ranNum = Math.floor(Math.random() * UNIQE_NM);
  return ranNum;
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  welcome.removeChild(form);
  greeting.classList.add(SHOWING_CN);
  const num = getRandomNumber();
  const ranText = greetingText[num];
  greeting.innerText = `어서오세요! ${text}씨 ${ranText}`;
  welcome.removeChild(greetingName);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
