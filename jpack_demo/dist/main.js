(() => {
  var __webpack_modules__ = {
    "./src/hello.js": (module) => {
      eval(
        "module.exports = 'hello';\n\n//# sourceURL=webpack://jpack_demo/./src/hello.js?"
      );
    },

    "./src/index.js": (
      __unused_webpack_module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {
      eval(
        'const hello = __webpack_require__(/*! ./hello.js */ "./src/hello.js");\n\ndocument.body.appendChild(document.createTextNode(hello));\n\n//# sourceURL=webpack://jpack_demo/./src/index.js?'
      );
    },
  };
  var __webpack_module_cache__ = {};

  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });

    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    return module.exports;
  }

  var __webpack_exports__ = __webpack_require__("./src/index.js");
})();
