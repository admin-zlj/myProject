const permute = (nums) => {
  if (!nums) return [];
  const res = [];
  // path是组合的数组
  const backtrack = (path) => {
    if (path.length === nums.length) {
      // 长度满足条件，推入res数组
      res.push(path);
      return;
    }
    nums.forEach((n) => {
      // path中已经有n，放弃此轮
      if (path.includes(n)) return;
      // 将n加入path继续找
      backtrack([...path, n]);
    });
  };
  // 从空数组开始
  backtrack([]);
  return res;
};

// var permute = function(nums) {
//     const res = [], path = []
//     const used = new Array(nums.length).fill(false)

//     const dfs = () => {
//         for (let i = 0; i < nums.length; i++) {
//             if (used[i]) continue
//             path.push(nums[i])
//             used[i] = true
//             dfs()
//             path.pop()
//             used[i] = false
//         }
// 		if (path.length == nums.length) {
//             res.push(path.slice())
//             return
//         }
//     }

//     dfs()
// 	console.log('res', res)

//     return res
// };

console.log('=======permute res=======', permute([1, 2, 3]););
