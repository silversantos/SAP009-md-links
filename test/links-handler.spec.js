const { getLinks, validateLinks, linkStats } = require('../src/links-handler.js')

describe('getLinks', () => {
  it('should extract links from file data', () => {
    const fileData = {
      file: 'example.md',
      data: 'This is a [link](https://example.com) to example website.'
    }

    const expectedLinks = [
      {
        file: 'example.md',
        text: 'link',
        href: 'https://example.com'
      }
    ]

    const result = getLinks(fileData)

    return expect(result).resolves.toEqual(expectedLinks)
  })

  it('should return an empty array if no links are found', () => {
    const fileData = {
      file: 'example.md',
      data: 'This is a plain text without any links.'
    }

    const result = getLinks(fileData)

    return expect(result).resolves.toEqual([])
  })
})

describe('validateLinks', () => {
  it('should validate links and return the results', () => {
    const linksArr = [
      {
        file: 'example.md',
        text: 'link',
        href: 'https://example.com'
      }
    ]

    const mockResponse = {
      ok: true,
      status: 200
    }

    const mockFetch = jest.fn().mockResolvedValue(mockResponse)
    global.fetch = mockFetch

    const expectedValidatedLinks = [
      {
        file: 'example.md',
        text: 'link',
        href: 'https://example.com',
        status: 200,
        ok: true
      }
    ]

    const result = validateLinks(linksArr)

    return expect(result).resolves.toEqual(expectedValidatedLinks)
  })

  it('should handle invalid fetch response', () => {
    const linksArr = [
      {
        file: 'example.md',
        text: 'link',
        href: 'https://example.com'
      }
    ]

    const mockFetch = jest.fn().mockRejectedValue(new Error('Invalid fetch response'))
    global.fetch = mockFetch

    const expectedInvalidatedLinks = [
      {
        file: 'example.md',
        text: 'link',
        href: 'https://example.com',
        status: new Error('Invalid fetch response'),
        ok: false
      }
    ]

    const result = validateLinks(linksArr)

    return expect(result).resolves.toEqual(expectedInvalidatedLinks)
  })
})

describe('linkStats', () => {
  it('should calculate statistics for links', () => {
    const linksArr = [
      {
        file: 'example.md',
        text: 'link1',
        href: 'https://example1.com',
        status: 200,
        ok: true
      },
      {
        file: 'example.md',
        text: 'link2',
        href: 'https://example2.com',
        status: 404,
        ok: false
      },
      {
        file: 'example.md',
        text: 'link3',
        href: 'https://example3.com',
        status: 200,
        ok: true
      }
    ]

    const expectedStats = {
      total: 3,
      unique: 3,
      broken: 1
    }

    const result = linkStats(linksArr)

    return expect(result).resolves.toEqual(expectedStats)
  })
})
