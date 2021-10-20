function debounce(func, wait) {
  let timerOut;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timerOut);
    timerOut = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}


function throttle(func, wait) {
  let context, args;
  let previous = 0;

  return function () {
    let now = new Date();
    context = this;
    args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}
