const { SyncWaterfallHook } = require('tapable');
// const SyncWaterfallHook = require('./lib/SyncWaterfallHook');

let hook = new SyncWaterfallHook(['name']);

hook.tap('hello1', function (name) {
  console.log('hello1', name);
  return 'hello1';
});

hook.tap('hello2', function (res) {
  console.log('hello2', res);
  return 'hello2';
});

hook.call('jinguo');