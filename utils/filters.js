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
  }
}
