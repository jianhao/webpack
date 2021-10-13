class SyncHook {
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
    this.tasks.forEach(task => task.fn(...args));
  }
}

module.exports = SyncHook;