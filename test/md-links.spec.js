const { mdLinks } = require('../src/md-links.js')
const { dirAndFileReader, getLinks, validateLinks, linkStats } = require('../src/links-handler.js')

describe('mdLinks', () => {
  it('should resolve with linksObj when validate option is false', () => {
    // mock dirAndFileReader's return value
    const fileContent = '...'
    const filePath = '/path/to/file.md'
    jest.spyOn(dirAndFileReader, 'mockResolvedValue').mockResolvedValue(fileContent)

    // mock getLinks' return value
    const linksObj = [{ href: 'https://example.com', text: 'Example' }]
    jest.spyOn(getLinks, 'mockResolvedValue').mockResolvedValue(linksObj)

    const options = { validate: false }
    return mdLinks(filePath, options).then(result => {
      expect(result).toEqual(linksObj)
    })
  })

  it('should resolve with fetchLinkObjResolved when validate option is true', () => {
    // mock dirAndFileReader's return value
    const fileContent = '...'
    const filePath = '/path/to/file.md'
    jest.spyOn(dirAndFileReader, 'mockResolvedValue').mockResolvedValue(fileContent)

    // mock getLinks' return value
    const linksObj = [{ href: 'https://example.com', text: 'Example' }]
    jest.spyOn(getLinks, 'mockResolvedValue').mockResolvedValue(linksObj)

    // mock validateLinks' return value
    const fetchLinkObjResolved = [{ href: 'https://example.com', text: 'Example', status: 200 }]
    jest.spyOn(validateLinks, 'mockResolvedValue').mockResolvedValue(fetchLinkObjResolved)

    const options = { validate: true }
    return mdLinks(filePath, options).then(result => {
      expect(result).toEqual(fetchLinkObjResolved)
    })
  })

  it('should resolve with fetchLinkObjResolved and statsObj when validate and stats options are true', () => {
    // mock dirAndFileReader's return value
    const fileContent = '...'
    const filePath = '/path/to/file.md'
    jest.spyOn(dirAndFileReader, 'mockResolvedValue').mockResolvedValue(fileContent)

    // mock getLinks' return value
    const linksObj = [{ href: 'https://example.com', text: 'Example' }]
    jest.spyOn(getLinks, 'mockResolvedValue').mockResolvedValue(linksObj)

    // mock validateLinks' return value
    const fetchLinkObjResolved = [{ href: 'https://example.com', text: 'Example', status: 200 }]
    jest.spyOn(validateLinks, 'mockResolvedValue').mockResolvedValue(fetchLinkObjResolved)

    // mock linkStats' return value
    const statsObj = { total: 1, unique: 1 }
    jest.spyOn(linkStats, 'mockResolvedValue').mockResolvedValue(statsObj)

    const options = { validate: true, stats: true }
    return mdLinks(filePath, options).then(result => {
      expect(result).toEqual({ links: fetchLinkObjResolved, stats: statsObj })
    })
  })

  it('should resolve with linksObj and statsObj when validate is false and stats is true', () => {
    // mock dirAndFileReader's return value
    const fileContent = '...'
    const filePath = '/path/to/file.md'
    jest.spyOn(dirAndFileReader, 'mockResolvedValue').mockResolvedValue(fileContent)

    // mock getLinks' return value
    const linksObj = [{ href: 'https://example.com', text: 'Example' }]
    jest.spyOn(getLinks, 'mockResolvedValue').mockResolvedValue(linksObj)

    // mock linkStats' return value
    const statsObj = { total: 1, unique: 1 }
    jest.spyOn(linkStats, 'mockResolvedValue').mockResolvedValue(statsObj)

    const options = { validate: false, stats: true }
    return mdLinks(filePath, options).then(result => {
      expect(result).toEqual({ links: linksObj, stats: statsObj })
    })
  })

  it('should handle an array of fileContent and resolve with fetchLinkObjResolved when validate option is true', () => {
    // mock dirAndFileReader's return value
    const fileContent1 = '...'
    const fileContent2 = '...'
    const filePaths = ['/path/to/file1.md', '/path/to/file2.md']
    jest.spyOn(dirAndFileReader, 'mockResolvedValue').mockResolvedValue([fileContent1, fileContent2])

    // mock getLinks' return value
    const linksObj1 = [{ href: 'https://example.com', text: 'Example1' }]
    const linksObj2 = [{ href: 'https://example.com', text: 'Example2' }]
    jest.spyOn(getLinks, 'mockResolvedValue').mockResolvedValueOnce(linksObj1).mockResolvedValueOnce(linksObj2)

    // mock validateLinks' return value
    const fetchLinkObjResolved = [
      { href: 'https://example.com', text: 'Example1', status: 200 },
      { href: 'https://example.com', text: 'Example2', status: 404 }
    ]
    jest.spyOn(validateLinks, 'mockResolvedValue').mockResolvedValue(fetchLinkObjResolved)

    const options = { validate: true }
    return mdLinks(filePaths, options).then(result => {
      expect(result).toEqual(fetchLinkObjResolved)
    })
  })
})
