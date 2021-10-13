class AsyncSeriesBailHook {
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
    let ret = null;
    return new Promise((resolve, reject) => {
      this.tasks.forEach((task, index) => {
        ret = index === 0 ? task.fn(...args) : ret.then(() => task.fn(...args)).catch(err => {reject(err)});
      });
    });
  }
}

module.exports = AsyncSeriesBailHook;