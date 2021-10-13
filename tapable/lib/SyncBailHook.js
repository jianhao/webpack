class SyncBailHook {
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
    let ret;
    let i = 0;

    do {
      const { fn } = this.tasks[i];
      ret = fn(...args);
      i++;
    } while (ret === undefined && i < this.tasks.length);

    return ret;
  }
}

module.exports = SyncBailHook;