const { AsyncParallelHook } = require('tapable');
// const AsyncParallelHook = require('./lib/AsyncParallelHook');

let hook = new AsyncParallelHook(['name']);

hook.tapPromise('hello1', function (name) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('hello1', name);
      resolve();
    }, 2000);
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
});