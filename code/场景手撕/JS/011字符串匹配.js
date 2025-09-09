//题目: 判断字符串是否符合XXX-XXX-XXXX(X为数字), 返回Boolean值
//正则

function isValid(str) {
  let reg = /^\d{3}-\d{3}-\d{4}$/;
  return reg.test(str);
}

console.log(isValid('173-122-3123'));
