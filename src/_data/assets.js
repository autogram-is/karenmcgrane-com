const contentful = require('../../utils/contentful.js')
const _ = require('lodash');

module.exports = async function () {
  return contentful.getAssets()
    .then(assets => assets.map(
      asset => {
        return {
          id: asset.sys.id,
          tags: asset.metadata.tags.map(tag => tag.sys.id),
          createdAt: asset.sys.createdAt,
          updatedAt: asset.sys.updatedAt,
          revision: asset.sys.revision,
          fields: asset.fields
        }
      }
    ))
}
