class DemoPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('emit', () => {
      console.log('emit');
    });
    compiler.hooks.emit.tap('afterPlugins', () => {
      console.log('afterPlugins');
    });
  }
}

module.exports = DemoPlugin;