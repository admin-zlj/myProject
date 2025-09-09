let student1 = {
  name: '小明',
  age: 14,
  sex: function () {
    console.log('first', this.age, 'age');
  },
  girlfriend: {
    name: '小红',
    age: 13,
    friend: {
      name: '花花',
    },
  },
};

let a = [1, [2, undefined, [3, [4]]]];

function deepClone(value) {
  if (!isObjOrArr(value)) return value;

  let res = Array.isArray(value) ? [] : {};

  for (const key in value) {
    if (isObjOrArr(value[key])) {
      res[key] = deepClone(value[key]);
    } else {
      if (typeof value[key] === 'function') {
        res[key] = new Function(`return ${value[key].toString()}`)();
      } else {
        res[key] = value[key];
      }
    }
  }
  return res;
}
function isObjOrArr(value) {
  return ['[object Object]', '[object Array]'].includes(Object.prototype.toString.call(value));
}

let s2 = deepClone(student1);

console.log(s2);
console.log(student1.sex === s2.sex);
console.log(student1.sex(), s2.sex());

let a2 = deepClone(a);

console.log(a2);
console.log(a[1] === a2[1]);
