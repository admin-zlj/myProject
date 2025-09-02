/**
 * 将一维数组转变成二维数组
 * 力扣2022
 *
 * 给你一个下标从 0 开始的一维整数数组 original 和两个整数 m 和  n 。
 * 你需要使用 original 中 所有 元素创建一个 m 行 n 列的二维数组。
 * original 中下标从 0 到 n - 1 （都 包含 ）的元素构成二维数组的第一行，
 * 下标从 n 到 2 * n - 1 （都 包含 ）的元素构成二维数组的第二行，依此类推。
 * 请你根据上述过程返回一个 m x n 的二维数组。如果无法构成这样的二维数组，请你返回一个空的二维数组。

 * 输入：original = [1,2,3,4], m = 2, n = 2 
 * 输出：[[1,2],[3,4]]
解释：
构造出的二维数组应该包含 2 行 2 列。
original 中第一个 n=2 的部分为 [1,2] ，构成二维数组的第一行。
original 中第二个 n=2 的部分为 [3,4] ，构成二维数组的第二行。
 */

/**
 * @param {number[]} original
 * @param {number} m
 * @param {number} n
 * @return {number[][]}
 */
var construct2DArray = function (original, m, n) {
  if (m * n !== original.length) {
    return [];
  }
  const res = new Array(m).fill(1).map(() => new Array(n).fill(1));
  let _m = 0;
  let _n = 0;

  for (let i = 0; i < original.length; i++) {
    res[_m][_n] = original[i];
    _n++;
    if (_n === n) {
      _n = 0;
      _m++;
    }
  }
  return res;
};

const arr = [1, 2, 3, 4, 5, 6];
const m = 1;
const n = 6;

console.log('=======object=======', construct2DArray(arr, m, n));
