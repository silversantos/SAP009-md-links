const { dirAndFileReader } = require('./fs-reader')
const { getLinks, validateLinks } = require('./links-handler')

function mdLinks (filePath, option) {
  return new Promise((resolve, reject) => {
    dirAndFileReader(filePath)
      .then(fileContent => {
        if (!Array.isArray(fileContent)) {
          getLinks(fileContent)
            .then(linksObj => {
              if (!option.validate) {
                resolve(linksObj)
              } else {
                validateLinks(linksObj)
                  .then(fetchLinkObjResolved => {
                    resolve(fetchLinkObjResolved)
                  })
              }
            })
        } else {
          fileContent.forEach((objContent) => {
            getLinks(objContent).then((linksObj) => {
              resolve(linksObj)
            })
              .catch(reject)
          })
        }
      })
      .catch(reject)
  })
}

module.exports = {
  mdLinks
}
