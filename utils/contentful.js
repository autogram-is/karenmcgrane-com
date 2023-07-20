require('dotenv').config()

const { AssetCache } = require("@11ty/eleventy-fetch");
const contentful = require('contentful')
const resolveResponse = require('contentful-resolve-response')

// Instantiates a Contentful client, and handles retrieval and
// caching of the raw content. Using the caching mechanism
// allows us to put the majority of the logic in eleventy
// and avoid thrashing the API with lots of queries, even during
// design/dev cycles with lots of iteration.

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT
})

const getContent = async function(flushCache = false) {
  let asset = new AssetCache("contentful_content")

  if(asset.isCacheValid("1d") && !flushCache) {
    return asset.getCachedValue()
  } else {
    return client.withoutUnresolvableLinks.getEntries({
      limit: 1000,
      locale: 'en-US'
    }).then(response => {
      return asset.save(response.items, "json").then(() => response.items)
    })
  }
}

const getAssets = async function(flushCache = false) {
  let asset = new AssetCache("contentful_assets")

  if(asset.isCacheValid("1d") && !flushCache) {
    return asset.getCachedValue()
  } else {
    return client.withoutUnresolvableLinks.getAssets({
      limit: 1000,
      locale: 'en-US'
    }).then(response => {
      return asset.save(response.items, "json").then(() => response.items)
    })
  }
}

const getTags = async function(flushCache = false) {
  let asset = new AssetCache("contentful_tags")

  if(asset.isCacheValid("1d") && !flushCache) {
    return asset.getCachedValue()
  } else {
    return client.withoutUnresolvableLinks.getTags().then(response => {
      return asset.save(response.items, "json").then(() => response.items)
    })
  }
}

module.exports = { client, getContent, getAssets, getTags }
