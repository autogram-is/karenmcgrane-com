const { documentToHtmlString } = require('@contentful/rich-text-html-renderer')
const { documentToPlainTextString } = require('@contentful/rich-text-plain-text-renderer')

module.exports = {
  /**
   * Debug filter that outputs the JSON-stringified structure of any variable.
   *
   * @returns Formatted HTML string wrapped in `<pre>` and `<code>` tags
   */
  json: function(value) {
    return '<pre><code>' + JSON.stringify(value, undefined, 2) + '</code></pre>'
  },

  /**
   * Render a Contentful Rich Text field as HTML.
   */
  toHtml: function(value) {
    return documentToHtmlString(value)
  },

  /**
   * Render a Contentful Rich Text field as plain text.
   */
  toPlain: function(value) {
    return documentToPlainTextString(value)
  },

  /**
   * Given an array of formatted Contentful entities, return the one with a
   * specific if it exists.
   */
  byId: function(content, contentId) {
    if (!Array.isArray(content)) return undefined
    return content.find(item => item.id === contentId)
  },

  /**
   * Given an array of formatted Contentful entities, return the one with a
   * particular slug if it exists.
   */
  bySlug: function(content, slug) {
    if (!Array.isArray(content)) return undefined
    return content.find(item => item?.slug === slug)
  },

  /**
   * Given an array of formatted Contentful entities, exclude the entity with a
   * particular ID. This is useful for generating lists of content related to the
   * current page.
   */
  excludeId: function(content, contentId) {
    if (!Array.isArray(content)) return []
    return content.filter(item => item.id !== contentId)
  },

  /**
   * Given an array of formatted Contentful entities, return entities with a
   * specific tag.
   */
  withTag: function(content, tag) {
    if (!Array.isArray(content)) return []
    return content.filter(item => item.tags.includes(tag))
  },

  /**
   * Given an array of formatted Contentful entities, return entities with a
   * specific tag.
   */
  withType: function(content, contentType) {
    if (!Array.isArray(content)) return []
    return content.filter(item => item.type === contentType)
  },
}
