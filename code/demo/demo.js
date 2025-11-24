/**
 * 三、考察基础算法
 * 请写一个数据结构转换函数 convert
 * 现有商品列表数据 itemList
 * 将该商品列表按照商品分类（category）进行分组，且分组间按该分类下商品的种数进行倒序排序（休闲零食有四种商品，因此排第一）;
 * 在每一分组下按商品的销量（saleCount）进行倒序排序。
 * 要求不能对原数据 itemList 的任意属性值进行修改
 */
const itemList = [
  { id: 1, name: '商品1', category: '家居百货', saleCount: 20 },
  { id: 2, name: '商品2', category: '个护美妆', saleCount: 18 },
  { id: 3, name: '商品3', category: '水乳饮品', saleCount: 33 },
  { id: 4, name: '商品4', category: '休闲零食', saleCount: 42 },
  { id: 5, name: '商品5', category: '个护美妆', saleCount: 50 },
  { id: 6, name: '商品6', category: '休闲零食', saleCount: 37 },
  { id: 7, name: '商品7', category: '休闲零食', saleCount: 48 },
  { id: 8, name: '商品8', category: '家居百货', saleCount: 79 },
  { id: 9, name: '商品9', category: '休闲零食', saleCount: 26 },
  { id: 10, name: '商品10', category: '家居百货', saleCount: 10 },
];
function convert(itemList) {
  // 你的代码实现
  let res = [];
  for (const item of itemList) {
    if (!res.some((i) => i.category === item.category)) {
      res.push({
        category: item.category,
        items: [deepClone(item)],
      });
    } else {
      res.forEach((i) => {
        if (i.category === item.category) {
          i.items.push(deepClone(item));
        }
      });
    }
  }
  res.sort((a, b) => b.items.length - a.items.length);
  res.forEach((i) => {
    i.items.sort((a, b) => b.saleCount - a.saleCount);
  });
  return res
}
//深拷贝
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

// 运行结果验证
convert(itemList);
console.log('itemList', itemList)
/* [
 *   {
 *     "category": "休闲零食",
 *     "items": [
 *       { "id": 7, "name": "商品7", "category": "休闲零食", "saleCount": 48 },
 *       { "id": 4, "name": "商品4", "category": "休闲零食", "saleCount": 42 },
 *       { "id": 6, "name": "商品6", "category": "休闲零食", "saleCount": 37 },
 *       { "id": 9, "name": "商品9", "category": "休闲零食", "saleCount": 26 }
 *     ]
 *   },
 *   {
 *     "category": "家居百货",
 *     "items": [
 *       ...
 *     ]
 *   },
 *   ...
 * ]
 */
