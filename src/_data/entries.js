const filters = require('../../utils/filters.js')
const contentful = require('../../utils/contentful.js')
const _ = require('lodash');

module.exports = async function () {
  const content = await contentful.getContent();

  return {
    all: content,

    pages: filters.withType(content, 'page'),

    simplePages: filters.withType(content, 'page').filter(page => page.custom !== true),

    books: filters.withType(content, 'book'),

    posts: filters.withType(content, 'post'),

    presentations: filters.withType(content, 'presentation'),

    navigation: filters.withType(content, 'page')
      .filter(page => page.nav !== undefined)
      .sort(function(a, b) {
        return item.nav - item.nav; // sort by nav order - ascending
      }),

    articles: [],

    sources: [],
  }
}
