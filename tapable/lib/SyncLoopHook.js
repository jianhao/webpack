class SyncLoopHook {
  constructor() {
    this.tasks = [];
  }
  
  tap(name, fn) {
    this.tasks.push({
      name,
      fn
    });
  }
  
  call(...args) {
    this.tasks.forEach(task => {
      let ret;
      do {
        ret = task.fn(...args);
      } while (ret !== undefined);
    });
  }
}

module.exports = SyncLoopHook;