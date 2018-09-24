module.exports = {
  chainWebpack: config => {
    config.entryPoints.delete('app')

    config.entry('demo')
      .add('./src/demo.js')
      .end()

      config.entry('library')
      .add('./src/library.js')
      .end()
  }
}