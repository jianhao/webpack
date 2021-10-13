const { AsyncSeriesWaterfallHook } = require('tapable');
// const AsyncSeriesWaterfallHook = require('./lib/AsyncSeriesWaterfallHook');

let hook = new AsyncSeriesWaterfallHook(['name']);

hook.tapAsync('hello1', (name, cb) => {
  setTimeout(() => {
    console.log('hello1', name);
    cb(null, 'hello1')
  }, 2000);
});

hook.tapAsync('hello2', (res, cb) => {
  setTimeout(() => {
    console.log('hello2', res);
    cb(null, 'hello2')
  }, 1000);
});

hook.callAsync('jinguo', data => {
  console.log('success');
});