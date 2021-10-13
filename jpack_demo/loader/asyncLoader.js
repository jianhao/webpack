module.exports = function (source) {
    const asyncfunc = this.async()
    setTimeout(() => {
        source = source.replace('打工人', '程序猿')
        asyncfunc(null, source)
    }, 200)
}
