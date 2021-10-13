class AsyncSeriesWaterfallHook {
  constructor() {
    this.tasks = [];
  }
  
  tapAsync(name, fn) {
    this.tasks.push({
      name,
      fn
    });
  }
  
  callAsync(...args) {
    const finalCallback = args.pop();
    let index = 0;
    const next = (err, result) => {
      const task = this.tasks[index];
      if (!task) {
        return finalCallback();
      }
      if (index === 0) {
        task.fn(...args, next);
      } else {
        task.fn(result, next);
      }
      index++;
    }
    next();
  }
}

module.exports = AsyncSeriesWaterfallHook;