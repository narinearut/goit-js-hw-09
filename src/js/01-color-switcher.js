
const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', () => {
    changeBcgColor.start()
});
refs.stopBtn.addEventListener('click', () => {
    changeBcgColor.stop()
});

const changeBcgColor = {
  intervalId: null,
  start() {
    if (this.isActive) {
      return;
    }
    this.intervalId = setInterval(updateBcgColor, 1000);
  },
  stop() {
    this.isActive = false;
    clearInterval(this.intervalId);
  },
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function updateBcgColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}
