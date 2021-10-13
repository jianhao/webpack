const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('@babel/traverse').default; // https://www.babeljs.cn/docs/babel-traverse
const generate = require('@babel/generator').default;
const t = require('@babel/types');
const ejs = require('ejs');
const { SyncHook } = require('tapable');

class Compiler {
  constructor(config) {
    // 往实例上挂载打包的一些信息
    this.config = config;
    this.entryId; // './src/index.js'
    this.modules = {}; // 所有模块依赖
    this.entry = config.entry; // 入口路径
    this.root = process.cwd(); // 当前工作目录

    // 挂载 hooks，利用 tapable 提供的 hook，方便后边 plugins 去订阅钩子，在合适的时机触发一下操作
    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPlugins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook()
    }
    
    // 触发所有 plugins 的 apply 方法，apply中 plugins 去订阅钩子
    const plugins = this.config.plugins;
    if (Array.isArray(plugins)) {
      plugins.forEach(plugin => {
        plugin.apply(this);
      })
    }
    this.hooks.afterPlugins.call(); // 触发 afterPlugins 钩子
  }

  // 获取模块内容
  getSource(modulePath) {
    const rules = this.config.module.rules;
    let source = fs.readFileSync(modulePath, 'utf-8');

    // 遍历模块处理的 rules，用对应的 loader 处理模块
    for(let i = 0; i < rules.length; i++) {
      const { test, use } = rules[i];
      let len = use.length - 1;
      if (test.test(modulePath)) {
        // 
        function normalLoader() {
          // 此处是逆序使用 loader，因为 webpack 用的函数编程方式是 compose， 不是 pipe
          const loaderName = typeof use[len--] === 'string' ? use[len--] : use[len--].loader
          const loader = require(loaderName); 
          source = loader(source)
          if (len >= 0) { // 递归让所有 loader 处理完模块
            normalLoader();
          }
        }
        normalLoader();
      }
    }
    
    return source;
  }

  // AST 解析，主要是切换 require
  parse(source, parentPath) {
    const ast = babylon.parse(source); // 解析代码生成 AST 树
    const dependencies = [];
    traverse(ast, { // 遍历 AST 树，更新节点
      CallExpression(p) { // 选定特定类型的节点处理：调用表达式
        if (p.node.callee.name === 'require') { // 将 require 切换为 __webpack_require__
          // console.log('解析的ast树', ast);
          p.node.callee.name = '__webpack_require__';
          let moduleName = p.node.arguments[0].value;
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js');
          moduleName = './' + path.join(parentPath, moduleName);
          dependencies.push(moduleName);
          p.node.arguments[0] = t.stringLiteral(moduleName);
        }
      }
    })
    const sourceCode = generate(ast).code;
    return {
      sourceCode,
      dependencies
    }
  }

  // 打包模块
  buildModule(modulePath, isEntry) {
    // loader 处理后的模块内容
    const source = this.getSource(modulePath);
    // 模块相对路径
    const moduleName = './' + path.relative(this.root, modulePath);
    if (isEntry) {
      this.entryId = moduleName; // 保存入口名字
    }
    // 解析代码修改内容
    const { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName));
    // 模块内容和路径对应
    this.modules[moduleName] = sourceCode;

    dependencies.forEach(dep => { // 递归加载
      this.buildModule(path.join(this.root, dep), false);
    })
  }

  emitFile() {
    // 输出路径
    let main = path.join(this.config.output.path, this.config.output.filename);
    let templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
    const code = ejs.render(templateStr, {
      entryId: this.entryId,
      modules: this.modules
    })
    this.assets = {}
    this.assets[main] = code;
    fs.writeFileSync(main, this.assets[main]);
  }

  run() {
    this.hooks.run.call();
    this.hooks.compile.call();

    // 执行并创建模块的依赖关系
    this.buildModule(path.resolve(this.root, this.entry), true);
    this.hooks.afterCompile.call();
    // 打包后的文件
    this.emitFile();
    this.hooks.emit.call();
    this.hooks.done.call();
  }

}

module.exports = Compiler;