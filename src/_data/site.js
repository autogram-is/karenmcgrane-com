const contentful = require('../../utils/contentful.js')
const { set } = require('lodash');

module.exports = async function () {
  return contentful.getContent()
    .then(items => items.filter(item => item.sys.contentType.sys.id === 'setting'))
    .then(items => {
      let settings = {};
      for (const setting of items) {
        set(settings, setting.fields.id, setting.fields.value);
      }
      return settings;
    });
}
