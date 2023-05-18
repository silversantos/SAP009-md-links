const { dirAndFileReader } = require('./fs-reader')
const { getLinks } = require('./links-handler')

function mdLinks (dirPath) {
  return dirAndFileReader(dirPath).then(getLinks)
    .catch((err) => {
      throw new Error(`There are no links: ${err}`)
    })
}

module.exports = {
  mdLinks
}
