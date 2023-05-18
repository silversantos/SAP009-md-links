const fs = require('fs')
const path = require('path')
// const errorHandling = require("./errorHandling");

// const isDirVerifier = (file) => {
//   fs.promises.stat(file)
//     .then(statsObj => {
//       return statsObj.isDirectory()
//     })
// }

function dirReader (dirPath) {
  return new Promise((resolve) => {
    fs.promises.readdir(dirPath)
      .then((files) => {
        files.forEach(file => {
          fs.promises.stat(`${dirPath}/${file}`)
            .then(statsObj => {
              if (statsObj.isDirectory()) {
                return dirReader(`${dirPath}/${file}`)
              } else {
                const readMd = files.filter(file => {
                  return path.extname(file) === '.md'
                })
                  .map(file => {
                    return fileReader(path.resolve(dirPath, file))
                  })
                return Promise.all(readMd)
                  .then((result) => {
                    resolve(result)
                  })
              }
            })
        })
      })
  })
}

function fileReader (file) {
  const isFileMd = path.extname(file) === '.md'
  if (!isFileMd) {
    return Promise.reject(new Error('file is not .md'))
  }
  return fs.promises.readFile(file).then(data => {
    return { file, data: data.toString() }
  })
}

function dirAndFileReader (dirPath) {
  return fs.promises.stat(dirPath)
    .then(statsObj => {
      return statsObj.isDirectory() ? dirReader(dirPath) : fileReader(dirPath).then((result) => [result])
    })
}

module.exports = {
  dirReader,
  fileReader,
  dirAndFileReader
}
