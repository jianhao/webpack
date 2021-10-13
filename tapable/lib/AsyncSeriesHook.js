class AsyncSeriesHook {
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
    const [first, ...others] = args;
    this.tasks.forEach((task, index) => {
      ret = index === 0 ? task.fn(...args) : ret.then(() => task.fn(...args));
    });
    return ret;
  }
}

module.exports = AsyncSeriesHook;