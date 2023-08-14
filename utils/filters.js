const { documentToHtmlString } = require('@contentful/rich-text-html-renderer')
const { documentToPlainTextString } = require('@contentful/rich-text-plain-text-renderer')
const { BLOCKS, MARKS, INLINES } = require("@contentful/rich-text-types")
const { flattenEntry, flattenAsset } = require('./contentful.js')
const { buildImage } = require('./shortcodes.js')

/**
* Generates the permalink for a particular content item; this allows
* us to build page paths before they're processed by Eleventy and
* consistently figure out what a given content ID's permalink would be.
*
* Page/Post permalinks are usually `{{ document | permalink }}`, while
* the OpenGraph preview file would be `{{ document | permalink }}og.html`.
*
* Pages with *no* underlying API-derived content won't have the data
* needed for this filter to work, and will need hard-coded permalinks.
*
* Entry types that aren't supposed to be output (slides, citations, etc)
* will have 'false' for a permalink.
*
* @returns URL path with leading and trailing slashes, or `false` for no
* permalink.
*/
function permalink(document) {
  if (document.home === true) return '/'

  switch (document.type) {
    case 'page':
    case 'post':
      return `/${document.slug}/`;
      break
    case 'presentation':
      return `/talks/${document.slug}/`;
      break
  }
}

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
    const options = {
      renderMark: {
        [MARKS.BOLD]: text => `<strong>${text}</strong>`,
        [MARKS.ITALIC]: text => `<em>${text}</em>`,
      },
      renderNode: {
        // This is ugly and assumes there's no formatting to the linked asset. That's bad.
        [INLINES.ASSET_HYPERLINK]: (node, next) => {
          return `<a href="https:${node.data.target.fields.file.url}" target="_new" />${node.content[0].value}</a>`
        },
        [INLINES.ENTRY_HYPERLINK]: (node, next) => {
          return `<a href="${permalink(flattenEntry(node.data.target))}"/>${node.content[0].value}</a>`
        },
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          return `<p>${buildImage(node.data.target)}</p>`
        }
      },
    }

    return documentToHtmlString(value, options)
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
  ofType: function(content, contentType) {
    if (!Array.isArray(content)) return []
    const type = Array.isArray(contentType) ? contentType : [contentType]
    return content.filter(item => type.includes(item.type))
  },

  /**
   * Given an array of formatted Contentful entities, limit the list to a specific length.
   */
  limit: function(content, entries) {
    if (!Array.isArray(content)) return []
    return content.slice(0, entries)
  },

  permalink,

  friendlyDate: function(incomingDate) {
    return new Date(incomingDate).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"})
  },

  flatten: flattenEntry
}
