const { EleventyHtmlBasePlugin } = require("@11ty/eleventy")
const pluginRss = require("@11ty/eleventy-plugin-rss")
const pluginBundle = require("@11ty/eleventy-plugin-bundle")
const pluginNavigation = require("@11ty/eleventy-navigation")
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const xmlFiltersPlugin = require('eleventy-xml-plugin')
const Image = require("@11ty/eleventy-img");

const filters = require('./utils/filters.js')
const collections = require('./utils/collections.js')
const transforms = require('./utils/transforms.js')
const shortcodes = require('./utils/shortcodes.js')

module.exports = function (eleventyConfig) {
		// Plugins
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
		eleventyConfig.addPlugin(pluginRss)
    eleventyConfig.addPlugin(pluginNavigation);
    eleventyConfig.addPlugin(pluginBundle);
    eleventyConfig.addPlugin(pluginWebc, {
      components: "_components/**/*.webc",
      useTransform: true, // Adds an Eleventy WebC transform to process all HTML output
    });

		// Adds date_to_rfc822, date_to_xmlschema, and xml_escape filters
		eleventyConfig.addPlugin(xmlFiltersPlugin)

    // Collections
		Object.keys(collections).forEach((collectionName) => {
      eleventyConfig.addCollection(collectionName, collections[collectionName])
		})

		// Filters
		Object.keys(filters).forEach((filterName) => {
			eleventyConfig.addFilter(filterName, filters[filterName])
		})

		// Transforms
		//Object.keys(transforms).forEach((transformName) => {
		//	eleventyConfig.addTransform(transformName, transforms[transformName])
		//})

		// Shortcodes
		Object.keys(shortcodes).forEach((shortcodeName) => {
			eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
		})

		// Asset Watch Targets
		eleventyConfig.addWatchTarget('./src/assets')

		let options = {
			html: true,
			breaks: true,
			linkify: true,
			typographer: true
		}

		// Layouts
		eleventyConfig.addLayoutAlias('base',				'layouts/base.njk')

		// Pass-through files
		eleventyConfig.addPassthroughCopy('src/assets')

		// Deep-Merge
		eleventyConfig.setDataDeepMerge(true)

    eleventyConfig.setServerOptions({
      liveReload: true,
      domDiff: true,
      encoding: "utf-8",

      // Additional files to watch that will trigger server updates
      // Accepts an Array of file paths or globs (passed to `chokidar.watch`).
      // Works great with a separate bundler writing files to your output folder.
      // e.g. `watch: ["_site/**/*.css"]`
      watch: [],
    });

    return {
      // Control which files Eleventy will process
      // e.g.: *.md, *.njk, *.html, *.liquid
      templateFormats: [
        "md",
        "njk",
        "html",
        "ejs",
        "webc"
      ],

      // Pre-process *.md files with: (default: `liquid`)
      markdownTemplateEngine: "njk",

      // Pre-process *.html files with: (default: `liquid`)
      htmlTemplateEngine: "njk",

      // These are all optional:
      dir: {
        input: "src",           // default: "."
        includes: "_includes",  // default: "_includes"
        data: "_data",          // default: "_data"
        output: "dist"          // default: "_site"
      },
    }
}
