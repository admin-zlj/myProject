const createPromise = (time, isErr) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      isErr ? rej(time) : res(time);
    }, time);
  });
};

/**
 * 返回第一个成功的值，所有都失败就返回失败的数组
 * @param {[]} promiseArr
 */
Promise.myAny = function (promiseArr) {
  if (!Array.isArray(promiseArr)) {
    throw Error('no array');
  }
  if (promiseArr.length === 0) {
    return;
  }
  return new Promise((resolve, reject) => {
    let firstValue = null;
    let reasonArr = [];
    let count = 0;
    promiseArr.forEach((item, index) => {
      Promise.resolve(item)
        .then(resolve)
        .catch((reason) => {
          reasonArr[index] = reason;
        })
        .finally(() => {
          count++;
          if (count === promiseArr.length) {
            reject(reasonArr);
          }
        });
    });
  });
};

const fn = async () => {
  const res = await Promise.any([
    createPromise(2000, true),
    createPromise(1000, true),
    createPromise(500, true),
  ]);
  console.log('=======res=======', res);
};

fn();

const fn2 = async () => {
  const res = await Promise.myAny([
    createPromise(2000, true),
    createPromise(1000, true),
    createPromise(500, true),
  ]);
  console.log('=======res2=======', res);
};

fn2();
