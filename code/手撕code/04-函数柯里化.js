function add() {
  let args = [...arguments];

  let _add = function () {
    args.push(...arguments);
    return _add;
  };
  _add.toString = function () {
    let sum = 0;
    args.reduce((prev, curv) => {
      return prev + curv;
    }, 0);
    // console.log(sum);
    return sum;
  };

  return _add;
}

console.log(add(1)(2)(8) == 11);
console.log('-----------');

function myadd(x) {
  return function (y) {
    return x + y;
  };
}
console.log(myadd(1)(2));
console.log('-----------');

function count(...args) {
  let nums = [...args];
  let _count = function (...args) {
    if (args.length === 0) {
      console.log('nums', nums);
      return nums.reduce((p, c) => p + c);
    }
    nums.push(...args);
    return _count;
  };

  return _count;
}
const count2 =
  (...x) =>
  (...y) => 
  (...z) =>
    [...x, ...y, ...z].reduce((x, y) => x + y);
console.log('count', count2(1)(2, 2)(2));
