//版本号对比
function versionCompare(ver1, ver2) {
  let v1 = ver1.split('.'),
    v2 = ver2.split('.');
  let len = Math.max(v1.length, v2.length);
  for (var i = 0; i < len; i++) {
    var a = parseInt(v1[i]) || 0,
      b = parseInt(v2[i]) || 0;
    if (a < b) return -1;
    if (a > b) return 1;
  }
  return 0;
}

function versionCompare2(v1, v2) {
  if (typeof v1 !== 'string' || typeof v2 !== 'string') return false;
  let str1 = v1.replaceAll('.', '');
  let str2 = v2.replaceAll('.', '');
  let maxLen = Math.max(str1.length, str2.length);
  str1 = +str1.padEnd(maxLen, '0');
  str2 = +str2.padEnd(maxLen, '0');
  if (str1 > str2) {
    return 1;
  }
  if (str1 < str2) {
    return -1;
  }
  return 0;
}

console.log(versionCompare2('1.1', '1.1.0.1'));

/**
 * 二、考察工具组件封装
 * 请实现函数 compareVersions ，对两个版本号进行比较，并满足以下条件：
 * @param  {String}   verA  （必传）需要比较的新版本号
 * @param  {String}   verB  （必传）用于比较的旧版本号
 * @param  {String}   type  （可选）比较方案
 *                                 gt：大于
 *                                 gte：大于等于
 *                                 lt：小于
 *                                 lte：小于等于
 *                                 eq：等于
 * @return {String|Boolean}     不传入type时，返回比较值，大于返回1、等于返回0、小于返回-1
                                传入type时，返回判断值 bool
 */
function compareVersions(verA, verB, type) {
  // 你的代码实现
  const tmp = {
    gt: [1],
    gte: [1, 0],
    lt: [-1],
    lte: [0, -1],
    eq: [0],
  };
  return !!type ? tmp[type].includes(compVersion(verA, verB)) : compVersion(verA, verB);
}
function compVersion(verA, verB) {
  let v1 = verA.split('.'),
    v2 = verB.split('.');
  let len = Math.max(v1.length, v2.length);
  for (var i = 0; i < len; i++) {
    var a = parseInt(v1[i]) || 0,
      b = parseInt(v2[i]) || 0;
    if (a < b) return -1;
    if (a > b) return 1;
  }
  return 0;
}
// 运行结果验证
console.log([
  compareVersions('2.0', '1.0.0'), // 1
  compareVersions('1', '1.0.0'), // 0
  compareVersions('1.2.3', '2.1.0'), // -1
  compareVersions('1.2.0', '1.10.0'), // -1

  compareVersions('1.2.3', '2.1.0', 'gt'), // false
  compareVersions('1.2.3', '2.1.0', 'eq'), // false
  compareVersions('1.2.3', '2.1.0', 'lt'), // true

  compareVersions('1.0.0', '1', 'gte'), // true
  compareVersions('1.0.0', '1', 'gt'), // false
  compareVersions('1.0.0', '1', 'eq'), // true
]);
// [1, 0, -1, -1, false, false, true, true, false, true]
