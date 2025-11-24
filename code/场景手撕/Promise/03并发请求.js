function createPromiseArr() {
  let proArr = [];
  for (let index = 0; index < 10; index++) {
    proArr.push(function () {
      return new Promise((resolve, reject) => {
        console.log(`start request-${index}`);
        setTimeout(() => {
          console.log(`end request-${index}`);
          if (index === 5) {
            reject(`error-${index}`);
          }
          resolve(`res-${index}`);
        }, index * 500);
      });
    });
  }
  return proArr;
}

/**
 *  并发请求
 * @param {[]} promiseArr    Promise 数组
 * @param {number} maxNum    最大并发数
 * @returns
 */
async function conCurrentRequest(promiseArr, maxNum) {
  return new Promise((resolve, reject) => {
    const allNum = promiseArr.length;
    let curIndex = 0;
    let successCount = 0;
    let allData = [];

    async function run() {
      let i = curIndex;
      try {
        let res = await promiseArr[curIndex++]();
        allData[i] = res;
      } catch (error) {
        allData[i] = error;
      } finally {
        successCount++;
        if (successCount === allNum) {
          resolve(allData);
        }
        if (curIndex < allNum) {
          run();
        }
      }
    }

    for (let j = 0; j < maxNum; j++) {
      run();
    }

  });
}
conCurrentRequest(createPromiseArr(), 3);

// Promise.all(createPromiseArr().map((item) => item())).then((data) => {
//   console.log('data', data);
// }).catch((err) => {
//   console.log('err', err);
// });
