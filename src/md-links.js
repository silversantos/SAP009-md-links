const { dirAndFileReader } = require('./fs-reader')
const { getLinks, validateLinks, linkStats } = require('./links-handler')

function mdLinks (filePath, options) {
  return new Promise((resolve, reject) => {
    dirAndFileReader(filePath)
      .then(fileContent => {
        const linksArr = getLinks(fileContent)
        if (!options.validate && !options.stats) {
          return linksArr
        }
        return validateLinks(linksArr)
      })
      .then(linksArr => {
        if (options.stats) {
          return linkStats(linksArr)
        }
        return linksArr
      })
      .then(result => {
        resolve(result)
      })
      .catch(reject)
  })
}

module.exports = {
  mdLinks
}
