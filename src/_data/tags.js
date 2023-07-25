const contentful = require('../../utils/contentful.js')
const _ = require('lodash');

module.exports = async function () {
  return contentful.getTags()
    .then(tags => tags.sort(function(a, b) {
      return a.name.localeCompare(b.name)
    }))
}
