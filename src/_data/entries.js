const filters = require('../../utils/filters.js')
const contentful = require('../../utils/contentful.js')
const _ = require('lodash');

module.exports = async function () {
  const content = await contentful.getContent()

  const output = {
    all: content,

    pages: filters.ofType(content, 'page'),

    simplePages: filters.ofType(content, 'page').filter(page => page?.custom !== true),

    books: filters.ofType(content, 'book'),

    sources: filters.ofType(content, 'source'),

    posts: filters.ofType(content, 'post')
      .sort(function(a, b) {
        return b.date - a.date; // sort by nav order - descending
      }),

    presentations: filters.ofType(content, 'presentation')
      .sort(function(a, b) {
        return new Date(b.date) - new Date(a.date); // sort by nav order - descending
      }),

    navigation: filters.ofType(content, 'page')
      .filter(page => page.nav !== undefined)
      .sort(function(a, b) {
        return a.nav - b.nav; // sort by nav order - ascending
      }),

    aboutKaren: content
      .filter(item => item.type == 'source')
      .filter(item => item.tags.includes('about-karen'))
      .sort(function(a, b) {
        return new Date(b.date) - new Date(a.date); // sort by nav order - descending
      }),
  }

  return output;
}
