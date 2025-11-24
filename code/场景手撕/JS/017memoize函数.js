function memoize(fn) {
  const cache = {}; // 创建一个缓存对象
  return function (...args) {
    const key = JSON.stringify(args); // 将参数序列化为字符串，作为缓存的键
    if (cache[key]) {
      console.log('从缓存中读取:', key);
      return cache[key];
    }
    const result = fn(...args); // 调用原函数
    cache[key] = result; // 缓存结果
    return result;
  };
}
