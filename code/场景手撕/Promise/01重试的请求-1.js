/**
 * 实现一个函数：function retry（fn, interval, times）
 * fn是一个promise，
 * 重试上限为times次，
 * 重试间隔为interval，
 * 重试成功返回成功的结果，失败返回失败的结果
 * @param {Promise} fn
 * @param {number} interval
 * @param {number} times
 */

async function reTry(fn, interval, times) {
  let allTimes = 0;
  while (allTimes < times) {
    try {
      const res = await fn();
      return res;
    } catch (error) {
      allTimes++;
      if (allTimes === times) {
        throw error;
      } else {
        await new Promise((res, rej) => setTimeout(res, interval));
      }
    }
  }
}
