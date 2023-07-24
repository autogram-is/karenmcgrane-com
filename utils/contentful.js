require('dotenv').config()

const { AssetCache } = require("@11ty/eleventy-fetch");
const contentful = require('contentful')

// Instantiates a Contentful client, and handles retrieval and
// caching of the raw content. Using the caching mechanism
// allows us to put the majority of the logic in eleventy
// and avoid thrashing the API with lots of queries, even during
// design/dev cycles with lots of iteration.

const getClient = function() {
  return contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_TOKEN,
    environment: process.env.CONTENTFUL_ENVIRONMENT
  })
}

const getContent = async function(flushCache = false) {
  const client = getClient();
  let asset = new AssetCache("contentful_content")

  if(asset.isCacheValid("1d") && !flushCache) {
    return asset.getCachedValue()
  } else {
    return client.withoutUnresolvableLinks.getEntries({
      limit: 1000,
      locale: 'en-US'
    })
    .then(response => response.items.map(flattenEntry))
    .then(entries => {
      return asset.save(entries, "json").then(() => entries)
    })
  }
}

const flattenEntry = function (entry) {
  return {
    type: entry.sys.contentType.sys.id,
    id: entry.sys.id,
    tags: entry.metadata.tags.map(tag => tag.sys.id),
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
    revision: entry.sys.revision,
    ...entry.fields
  }
}

const flattenAsset = function (asset) {
  return {
    id: asset.sys.id,
    tags: asset.metadata.tags.map(tag => tag.sys.id),
    createdAt: asset.sys.createdAt,
    updatedAt: asset.sys.updatedAt,
    revision: asset.sys.revision,
    ...asset.fields
  }
}

const getAssets = async function(flushCache = false) {
  const client = getClient();
  let asset = new AssetCache("contentful_assets")

  if(asset.isCacheValid("1d") && !flushCache) {
    return asset.getCachedValue()
  } else {
    return client.withoutUnresolvableLinks.getAssets({
      limit: 1000,
      locale: 'en-US'
    })
      .then(response => response.items.map(flattenAsset))
      .then(assets => {
        return asset.save(assets, "json").then(() => assets)
      })
  }
}

const getTags = async function(flushCache = false) {
  const client = getClient();
  let asset = new AssetCache("contentful_tags")

  if(asset.isCacheValid("1d") && !flushCache) {
    return asset.getCachedValue()
  } else {
    return client.withoutUnresolvableLinks.getTags()
      .then(response => response.items.map(
        tag => {
          return {
            id: tag.sys.id,
            name: tag.name,
            visible: tag.sys.visibility === 'public',
          }
        }
      ))
      .then(tags => {
        return asset.save(tags, "json").then(() => tags)
      })
  }
}

module.exports = { getClient, getContent, getAssets, flattenEntry, flattenAsset, getTags }
