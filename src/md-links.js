const { dirAndFileReader } = require('./fs-reader.js')
const { getLinks } = require('./links-handler.js')

function mdLinks (dirPath) {
  const readerResult = dirAndFileReader(dirPath)
  return getLinks(readerResult)
    .then((linksObj) => {
      return linksObj
    })
    .catch(() => {
      throw new Error('There are no links')
    })
}

module.exports = {
  mdLinks
}
