const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
buttonStop.disabled = true;
let isActive = false;
let id;
const onClickBtnStart = () => {
  isActive = true;
  setBtnState(isActive);
  id = setTimeout(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};
const onClickBtnStop = () => {
  if (isActive) {
    isActive = false;
    clearInterval(id);
    setBtnState(isActive);
  }
};
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
function setBtnState(active) {
  buttonStart.disabled = active;
  buttonStop.disabled = !active;
}

buttonStart.addEventListener('click', onClickBtnStart);
buttonStop.addEventListener('click', onClickBtnStop);
