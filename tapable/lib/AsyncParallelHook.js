class AsyncParallelHook {
  constructor() {
    this.tasks = [];
  }
  
  tapPromise(name, fn) {
    this.tasks.push({
      name,
      fn
    });
  }
  
  promise(...args) {
    let tasks = this.tasks.map(task => task.fn(...args));
    return Promise.all(tasks);
  }
}

module.exports = AsyncParallelHook;