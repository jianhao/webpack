class SyncWaterfallHook {
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
    let ret = null;
    this.tasks.forEach((task, index) => {
      ret = index === 0 ? task.fn(...args) : task.fn(ret);
    });
  }
}

module.exports = SyncWaterfallHook;