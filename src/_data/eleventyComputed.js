const filters = require("../../utils/filters.js")
const contentful = require("../../utils/contentful.js")

module.exports = {
  document: async data => {
    if (data.document) return data.document

    if (data.contentId) {
      const content = filters.byId(await contentful.getContent(), data.contentId)
      if (content) return content
    }
  },

  title: data => {
    data.title ?? data.document?.hed
  },

  permalink: data => {
    const document = data.document ?? filters.byId(data.entries.all, data.contentId);

    // This gives us a chance to halt the rendering of manually-created templates
    // whose documents haven't been marked as 'custom'; it allows builds to proceed
    // without permalink collisions.
    if (document) {
      if (data.contentId && !document.custom) {
        console.log(`Skipping ${data.page.inputPath}; Content ID ${data.contentId} is not flagged for a custom template.`)
        return false;
      }
    }

    if (data.permalink) return data.permalink
    if (data.document) return filters.permalink(data.document)
  },
};
