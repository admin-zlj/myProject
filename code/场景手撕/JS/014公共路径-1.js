// 搜索多个文件夹路径（字符串数组，例如['/usr/bin', '/etc/config']），查找是否有公共路径，
// 若有则返回公共路径（字符串），否则返回 null

function findDir(dirs) {
  let res = [];
  const dirsArr = dirs.map((item) => item.split('/'));
  let len = Math.min(...dirsArr.map((item) => item.length));
  for (let i = 1; i < len; i++) {
    const s = dirsArr[0][i];
    if (dirsArr.every((item) => item[i] === s)) {
      res.push(s);
    } else {
      break;
    }
  }

  return res.length ? res.join('/') : null;
}

console.log('====', findDir(['/usr/config/bin', '/usr/config', '/usr/config/qq']));

// function findDir2(dirs) {
//   let res = '';
//   len = Math.min(...dirs.map((item) => item.length));
//   const firstV = dirs[0];

//   for (let i = 0; i < len; i++) {
//     if (dirs.every((item) => item[i] === firstV[i])) {
//       res = res + firstV[i];
//     } else {
//       break;
//     }
//   }
//   return res;
// }
// console.log('====', findDir(['/usr/config/bin', '/usr/config', '/usr/config/qq']));
