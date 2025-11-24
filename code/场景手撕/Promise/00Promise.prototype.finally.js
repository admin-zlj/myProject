Promise.prototype.customFinally = function (cb) {
  return this.then(
    (res) => {
      return Promise.resolve(cb()).then(() => res);
    },
    (err) => {
      return Promise.resolve(cb()).then(() => {
        throw err;
      });
    }
  );
};

const p = new Promise((r, j) => {
  setTimeout(() => {
    r('p');
  }, 1000);
});

p.then((res) => {
  console.log('=======res=======', res);
  return 'pres';
})
  .finally(() => {
    console.log('=======pf=======');
    return new Promise((r, j) => {
      setTimeout(() => {
        console.log('=======newp=======');
        r('new');
      }, 1000);
    });
  })
  .then((res2) => {
    console.log('=======res2=======', res2);
  });

const p1 = new Promise((r, j) => {
  setTimeout(() => {
    r('p1');
  }, 1000);
});

p1.then((res) => {
  console.log('=======res=======', res);
  return 'p1res';
})
  .customFinally(() => {
    console.log('=======pf=======');
    return new Promise((r, j) => {
      setTimeout(() => {
        console.log('=======newp=======');
        r('new');
      }, 1000);
    });
  })
  .then((res2) => {
    console.log('=======res2=======', res2);
  });
