const { SyncBailHook } = require('tapable');
// const SyncBailHook = require('./lib/SyncBailHook');

let hook = new SyncBailHook(['name']);

hook.tap('hello1', function (name) {
  console.log('hello1', name);
  return 'hello1';
});

hook.tap('hello2', function (name) {
  console.log('hello2', name);
  return 'hello2';
});

hook.call('jinguo');