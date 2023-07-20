const contentful = require('../../utils/contentful.js')
const _ = require('lodash');

module.exports = async function () {
  return contentful.getTags()
    .then(tags => tags.map(
      tag => {
        return {
          id: tag.sys.id,
          name: tag.name,
          visible: tag.sys.visibility === 'public',
        }
      }
    ))
}


/**
  Incoming tag data structure from Contentful:

  {
    "sys": {
      "space": {
        "sys": {
          "type": "Link",
          "linkType": "Space",
          "id": "<SpaceID>"
        }
      },
      "id": "<TagID>",
      "type": "Tag",
      "createdAt": "<ISODate>",
      "updatedAt": "<ISODate>",
      "environment": {
        "sys": {
          "id": "master",
          "type": "Link",
          "linkType": "Environment"
        }
      },
      "createdBy": {
        "sys": {
          "type": "Link",
          "linkType": "User",
          "id": "<UserId>"
        }
      },
      "updatedBy": {
        "sys": {
          "type": "Link",
          "linkType": "User",
          "id": "<UserId>"
        }
      },
      "version": 1,
      "visibility": "<public|private>"
    },
    "name": "<TagName>"
  }
*/
