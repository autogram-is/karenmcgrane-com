const Image = require("@11ty/eleventy-img");

module.exports = {
  log: console.log,
  navIcon: async(name) => {
    const src = `src/assets/svg/${name.toLowerCase()}.svg`;
    let metadata = await Image(src, {
      formats: ['svg'],
      dryRun: true,
    })
    return metadata.svg[0].buffer.toString()
  }
}
