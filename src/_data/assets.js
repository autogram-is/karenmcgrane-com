const contentful = require('../../utils/contentful.js')
const _ = require('lodash');

module.exports = async function () {
  return contentful.getAssets()
}
