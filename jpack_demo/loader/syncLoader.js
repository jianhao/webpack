const loaderUtils = require('loader-utils')
module.exports = function (source) {
    const options = loaderUtils.getOptions(this)
    source = source.replace('打工人', options.message)
    this.callback(null, source)
}