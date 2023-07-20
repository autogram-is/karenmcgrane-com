const contentful = require('../../utils/contentful.js')
const _ = require('lodash');

module.exports = async function () {
  return contentful.getContent()
    .then(items => items.map(
      item => {
        return {
          type: item.sys.contentType.sys.id,
          id: item.sys.id,
          tags: item.metadata.tags.map(tag => tag.sys.id),
          createdAt: item.sys.createdAt,
          updatedAt: item.sys.updatedAt,
          revision: item.sys.revision,
          fields: item.fields
        }
      }
    ))
    .then(items => _.groupBy(items, item => item.type))
}
