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
    if (data.permalink) return data.permalink
    if (data.document) return filters.permalink(data.document)
  },
};
