class AsyncParallelBailHook {
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
    const tasks = this.tasks.map(task => {
      return new Promise((resolve, reject) => {
        task.fn(...args).then(res => {
          resolve(res);
        }).catch(err => {
          err ? reject(err) : resolve();
        });
      });
    });
    return Promise.all(tasks);
  }
}

module.exports = AsyncParallelBailHook;