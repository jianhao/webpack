const { AsyncParallelBailHook } = require('tapable');
// const AsyncParallelBailHook = require('./lib/AsyncParallelBailHook');

let hook = new AsyncParallelBailHook(['name']);

hook.tapPromise('hello1', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('hello1', name);
      reject('hello1 error');
    }, 1000);
  })
});

hook.tapPromise('hello2', function (name) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('hello2', name);
      resolve();
    }, 1000);
  })
});

hook.promise('jinguo').then(() => {
  console.log('success');
}).catch(() => {
  console.log('error');
});