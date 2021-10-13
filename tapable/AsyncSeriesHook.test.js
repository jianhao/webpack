const { AsyncSeriesHook } = require('tapable');
// const AsyncSeriesHook = require('./lib/AsyncSeriesHook');

let hook = new AsyncSeriesHook(['name']);

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
})