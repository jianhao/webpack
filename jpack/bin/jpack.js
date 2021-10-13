#! /usr/bin/env node

const Compiler = require('../lib/Compiler.js');
const path = require('path');

// config 配置文件
const config = require(path.resolve('webpack.config.js'));

// 初始化 Compiler：构造函数中挂载了打包参数、插件、钩子函数
const compiler = new Compiler(config);
compiler.hooks.entryOption.call(); // 触发 entryOption 钩子
compiler.run(); // 开始执行编译打包流程