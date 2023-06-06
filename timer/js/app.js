// window.onload  = setTimer(0, 30, 0);
setTimer(0, 30, 0);

function setTimer(startHours, startMinutes, startSeconds) {
  // localStorage.lear()
  // Высчитали время таймера 
  let timerStartValue =
    (startHours * 3600 + startMinutes * 60 + startSeconds) * 1000;

  let timerTmpStartValue = parseInt(
    window.localStorage.getItem("timerTmpStartValue")
  );

  // Очистка хранилища при изменении диапазона таймера
  if (timerTmpStartValue && timerTmpStartValue !== timerStartValue) {
    localStorage.clear();
  }

  window.localStorage.setItem("timerTmpStartValue", timerStartValue);

  // Таймстамп-окончание таймера
  let timerStopStamp = new Date().getTime() + timerStartValue;

  let finishTimer = parseInt(localStorage.getItem("timerEnd"));
  if (finishTimer) {
    timerStopStamp = finishTimer;
  }

  const hours = document.querySelector(".timer .js-timer-hour");
  const minutes = document.querySelector(".timer .js-timer-min");
  const seconds = document.querySelector(".timer .js-timer-sec");
  const timerDots = document.querySelectorAll(".timer .js-timer-dots"); 
  const timerLamp = document.querySelector(".js-timer-lamp");



  let timerId = setTimeout(function updateTimer() {
    timerLamp.classList.toggle("turned-off");
    timerDots.forEach(element => {
      element.classList.toggle('not-active')
    });
    // Текущий timestamp
    let currentTime = new Date().getTime();

    // Возобновление счетчика
    if (timerStopStamp <= currentTime) {
      // timerStopStamp += timerStartValue;
      timerStopStamp = currentTime + timerStartValue;
    }

    // Текущий таймстамп-остаток таймера
    let timerCurrentValue = timerStopStamp - currentTime;

    // Получение значений таймера
    let timerCurrentHours = new Date(timerCurrentValue).getUTCHours();
    let timerCurrentMinutes = new Date(timerCurrentValue).getUTCMinutes();
    let timerCurrentSeconds = new Date(timerCurrentValue).getUTCSeconds();

    // Вставка значений с добавлением нуля
    hours.innerHTML = `${setZero(timerCurrentHours)}`;
    minutes.innerHTML = `${setZero(timerCurrentMinutes)}`;
    seconds.innerHTML = `${setZero(timerCurrentSeconds)}`;

    // Запись в LocalStorage
    window.localStorage.setItem("timerEnd", timerStopStamp);

    timerId = setTimeout(updateTimer, 1000);
  }, 0);

  function setZero(val) {
    return val < 10 ? `0${val}` : `${val}`;
  }
}
