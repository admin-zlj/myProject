const createPromise = (time, isErr) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      isErr ? rej(time) : res(time);
    }, time);
  });
};

/**
 *
 * @param {[]} promiseArr
 */
Promise.myall = function (promiseArr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArr)) {
      reject('no Array');
    }

    if (promiseArr.length === 0) {
      resolve([]);
    }

    const resArr = [];
    let count = 0;

    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i])
        .then((r) => {
          count++;
          resArr[i] = r;
          if (count === promiseArr.length) {
            resolve(resArr);
          }
        })
        .catch(reject);
    }

    // allSettled 这么写

    // for (let i = 0; i < promiseArr.length; i++) {
    //   Promise.resolve(promiseArr[i])
    //     .then((r) => {
    //       resArr[i] = {
    //         status: 'success',
    //         value: r,
    //       };
    //     })
    //     .catch((err) => {
    //       resArr[i] = {
    //         status: 'fail',
    //         value: r,
    //       };
    //     })
    //     .finally(() => {
    //       count++;
    //       if (count === promiseArr.length) {
    //         resolve(resArr);
    //       }
    //     });
    // }
  });
};

const fn2 = async () => {
  const res = await Promise.myall([createPromise(500), createPromise(1000)]);
  console.log('=======res=======', res);
};

fn2();
