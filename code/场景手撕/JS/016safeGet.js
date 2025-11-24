/**
 *
 * @param {Object} obj
 * @param {string} path
 */
const safeGet = (obj, path, defaultValue) => {
	const pathArr = path.split('.');
	let temp = obj;
  
	for (const item of pathArr) {
	  if (temp[item]) {
		temp = temp[item];
	  } else {
		temp = defaultValue;
		break;
	  }
	}
  
	return temp;
  };
  
  const demo = {
	a: {
	  b: {
		c: 9
	  }
	}
  };
  console.log('=======safeGet=======', safeGet(demo, 'a.b.c'));
  console.log('=======safeGet=======', safeGet(demo, 'a.c.b', 10));
  