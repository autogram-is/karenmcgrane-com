const filters = require("../../utils/filters.js")
const contentful = require("../../utils/contentful.js")

module.exports = {

  document: async data => {
    if (data.document) return data.document

    if (data.id) {
      const content = filters.byId(await contentful.getContent(), data.id);
      if (content) return content;
    }
  },

  title: data => {
    data.title ?? data.document?.hed
  },
};
