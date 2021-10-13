const { SyncLoopHook } = require('tapable');
// const SyncLoopHook = require('./lib/SyncLoopHook');

let hook = new SyncLoopHook(['name']);
let index = 0;

hook.tap('hello1', function (name) {
  console.log('hello1', name);
  return ++index === 2 ? undefined : 'hello1';
});

hook.tap('hello2', function (name) {
  console.log('hello2', name);
});

hook.call('jinguo');