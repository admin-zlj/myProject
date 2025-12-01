const createPromise = (time, isErr) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      isErr ? rej(time) : res(time);
    }, time);
  });
};

/**
 * 返回第一个结果，不管成功还是失败
 * @param {[]} promiseArr
 */
Promise.myRace = function (promiseArr) {
  if (!Array.isArray(promiseArr)) {
    throw Error('no array');
  }
  if (promiseArr.length === 0) {
    return;
  }
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item, index) => {
      Promise.resolve(item).then(resolve).catch(reject);
    });
  });
};

const fn = async () => {
  const res = await Promise.race([createPromise(1000), createPromise(500, true)]);
  console.log('=======res=======', res);
};

fn();

const fn2 = async () => {
  const res = await Promise.myRace([createPromise(1000), createPromise(500, true)]);
  console.log('=======res2=======', res);
};

fn2();
