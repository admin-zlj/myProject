var input = document.getElementById('input');

input.oninput = debounce(function (e) {
  console.log(this.value);
}, 500);

window.onscroll = throttle(function () {
  console.log('222');
}, 1000);



function debounce(cb, delay) {
  let timer;
  return function (...arg) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.call(this, ...arg);
    }, delay);
  };
}

function throttle(cb, delay) {
  let flag = false;
  return function (...args) {
    if (flag) return;
    flag = true;
    setTimeout(() => {
      cb.call(this, ...args);
      flag = false;
    }, delay);
  };
}
