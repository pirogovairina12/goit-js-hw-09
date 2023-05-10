const refs = {
  start: document.querySelector("[data-start]"),
  stop: document.querySelector("[data-stop]"),
}

let intervalId;
let isIntervalActive = false;

refs.start.addEventListener("click", onStart);
refs.stop.addEventListener("click", onStop);

function onStart() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.start.setAttribute("disabled", "true");
  isIntervalActive = true;

}

function onStop() {
  clearInterval(intervalId);
  refs.start.removeAttribute("disabled");
  isIntervalActive = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}