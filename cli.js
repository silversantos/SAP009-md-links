const { dirAndFileReader } = require('./src/fs-reader.js')
const { getLinks } = require('./src/links-handler.js')

const dirPath = process.argv[2]

function mdLinks (dirPath) {
  const readerResult = dirAndFileReader(process.argv[2])
  return getLinks(readerResult).then((linksObj) => {
    console.log(linksObj)
  })
   .catch((err) => {
    console.log('this is the error:' + err)
  })
  return
}

//return new Promise((resolve, reject) => {

  // })
  // getLinks(fileContent).then((result) => {
  //   console.log(getLinks(result))
  // })
  // .catch((err) => {
  //   console.log('this is the error:' + err)
  // })