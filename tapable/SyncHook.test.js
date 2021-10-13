const { SyncHook } = require('tapable')
// const SyncHook = require('./lib/SyncHook');


let hook = new SyncHook(['name']);

hook.tap('hello1', function(name) {
  console.log('hello1', name);
});

hook.tap('hello2', function(name) {
  console.log('hello2', name);
});

hook.call('jinguo');
