//手写 Promise.race

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  #status = PENDING;
  #result = undefined;
  #queueList = [];
  #finallyList = [];

  constructor(callback) {
    const resolve = (data) => this.#changeStatus(FULFILLED, data);
    const reject = (error) => this.#changeStatus(REJECTED, error);

    try {
      callback(resolve, reject);
    } catch (error) {
      this.#changeStatus(REJECTED, error);
    }
  }

  #changeStatus(s, r) {
    if (this.#status !== PENDING) return;
    this.#status = s;
    this.#result = r;
    this.#run();
  }

  #run() {
    if (this.#status === PENDING) return;
    while (this.#queueList.length) {
      const { successFn, failFn, resolve, reject } = this.#queueList.shift();

      if (this.#status === FULFILLED) {
        queueMicrotask(() => {
          const data = successFn(this.#result);
          resolve(data);
        });
      }
      if (this.#status === REJECTED) {
        queueMicrotask(() => {
          const reason = failFn(this.#result);
          reject(reason);
        });
      }
    }
  }

  then(successFn, failFn) {
    return new MyPromise((resolve, reject) => {
      this.#queueList.push({
        successFn,
        failFn,
        resolve,
        reject,
      });
      this.#run();
    });
  }

  finally(cbFn) {
    return this.then(
      (data) => {
        cbFn();
        return data;
        // return this.then(() => data);
      },
      (err) => {
        cbFn();
        return err;
        // return this.then(() => err);
      }
    );
  }
}

const p = new MyPromise((resolve, reject) => {
  //   reject(2);
  //   resolve(1);
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

p.then((res) => {
  console.log('=======res=======', res);
  return 111;
})
  .then((res2) => {
    console.log('=======res2=======', res2);
    return 222;
  })
  .finally(() => {
    console.log('=======finally=======');
  })
  .then((res3) => {
    console.log('=======res3=======', res3);
  });

// const _fn = async () => {
//   const res = await p;
//   console.log('=======res=======', res);
// };

// _fn();
