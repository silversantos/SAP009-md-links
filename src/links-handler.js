function getLinks (fileData) {
  return new Promise((resolve, reject) => {
    const mdText = fileData.data
    const regExLink = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const linkMatcher = mdText.match(regExLink)

    if (linkMatcher !== null) {
      const linksArr = linkMatcher.map(link => {
        const removePunctuation = link.replace(/.$/, '').replace(/^./, '')
        const splitEx = removePunctuation.split(']{')

        const linksObj = {
          file: fileData.file,
          text: splitEx[0],
          href: splitEx[1]
        }

        return linksObj
      })
      resolve(linksArr)
    } else {
      reject(new Error('There were no links in the file'))
    }
  })
}

module.exports = {
  getLinks
}
