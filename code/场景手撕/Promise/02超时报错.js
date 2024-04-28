/**
 *  传入一个promise和超时的时间，如果在time的时间内promise没有返回就抛出错误
 * @param {Promise} promise
 * @param {Number} time
 * @returns
 */
function promiseTimeout(promise, time) {
  const timePro = new Promise((resolve, reject) => {
    setTimeout(function () {
      reject('超时');
    }, time);
  });

  return Promise.race([promise, timePro]);
}




// ----test ----
const t = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve('success');
  }, 1000);
});

(async function () {
  console.log(await promiseTimeout(t, 500));
})();
