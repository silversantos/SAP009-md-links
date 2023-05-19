const { mdLinks } = require('./src/md-links.js')

const dirPath = process.argv[2]
const options = {
  validate: true
}

mdLinks(dirPath, options)
  .then(links => {
    console.log(links)
  })
  .catch(error => {
    console.error(error)
  })
