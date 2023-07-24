const { getContent, getAssets, getTags } = require("./contentful.js")

const { documentToHtmlString } = require('@contentful/rich-text-html-renderer')
const { documentToPlainTextString } = require('@contentful/rich-text-plain-text-renderer')


module.exports = {
  json: function(value) {
    return '<pre><code>' + JSON.stringify(value, undefined, 2) + '</code></pre>'
  },

  toHtml: function(value) {
    return documentToHtmlString(value)
  },

  toPlain: function(value) {
    return documentToPlainTextString(value)
  },

  byId: function(content, contentId) {
    return content.find(item => item.id === contentId)
  },

  excludeId: function(content, contentId) {
    return content.filter(item => item.id !== contentId)
  },

  withTag: function(content, withTag) {

  },
}
