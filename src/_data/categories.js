const contentful = require('../../utils/contentful.js')
const _ = require('lodash');

module.exports = async function () {
  return contentful.getTags()
    .then(tags => tags
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter(tag => [
        'by-karen', 'about-karen', 'article', 'book', 'republished', 'slides', 'karenmcgrane', 'conference', 'podcast', 'interview', 'research'
      ].includes(tag.id) === false)
    )
}
