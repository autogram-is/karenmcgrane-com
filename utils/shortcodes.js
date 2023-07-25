const Image = require("@11ty/eleventy-img")

module.exports = {
  /**
   * Outputs parameters to the console during page generation.
   */
  log: console.log,

  /**
   * Get the navigation icon for a given page.
   *
   * @returns Raw SVG markup, suitable for embedding
   */
  navIcon: async(name) => {
    const src = `src/assets/svg/${name.toLowerCase()}.svg`;
    let metadata = await Image(src, {
      formats: ['svg'],
      dryRun: true,
    })
    return metadata.svg[0].buffer.toString()
  },

  /**
   * Description placeholder
   */
  buildImage(imageAsset, width = 480) {
    return `<img class='u-max-full-width'
      srcset="https:${imageAsset.fields.file.url}?w=${width}&fm=webp&q=80&fit=fill&f=faces ${width}w,
      https:${imageAsset.fields.file.url}?w=${width*2}&fm=webp&q=80&fit=fill&f=faces ${width*2}w" sizes="(max-width: 600px) ${width}px,${width*2}px"
      src="https:${imageAsset.fields.file.url}?w=${width*2}&fit=fill&f=faces"
      alt="${ imageAsset.fields.title }" loading="lazy">`;
  }
}
