const fs = require('fs')
const path = require('path')

const { dirAndFileReader, dirReader, fileReader } = require('..fs-reader.js')

jest.mock('fs')
fs.promises.stat.mockImplementation((filePath) => {
  const isDirectory = filePath.includes('dir')
  return Promise.resolve({ isDirectory })
})

fs.promises.readdir.mockResolvedValueOnce(['file1.md', 'file2.txt', 'dir1'])
fs.promises.readdir.mockResolvedValueOnce([])

fs.promises.readFile.mockResolvedValue('Mocked file data')

describe('dirAndFileReader', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('deve ler um diretório e seus arquivos .md', () => {
    fs.promises.stat.mockResolvedValueOnce({ isDirectory: true })

    return dirAndFileReader('/path/to/dir').then((result) => {
      expect(fs.promises.stat).toHaveBeenCalledWith('/path/to/dir')
      expect(fs.promises.readdir).toHaveBeenCalledWith('/path/to/dir')

      expect(dirReader).toHaveBeenCalledWith('/path/to/dir')
      expect(fileReader).toHaveBeenCalledWith('/path/to/dir/file1.md')
      expect(fileReader).not.toHaveBeenCalledWith('/path/to/dir/file2.txt')
      expect(fileReader).not.toHaveBeenCalledWith('/path/to/dir/dir1')

      expect(result).toEqual(['Mocked file data'])
    })
  })

  it('deve ler um diretório vazio', () => {
    fs.promises.stat.mockResolvedValueOnce({ isDirectory: true })

    return dirAndFileReader('/path/to/empty-dir').then((result) => {
      expect(fs.promises.stat).toHaveBeenCalledWith('/path/to/empty-dir')
      expect(fs.promises.readdir).toHaveBeenCalledWith('/path/to/empty-dir')

      expect(dirReader).toHaveBeenCalledWith('/path/to/empty-dir')
      expect(fileReader).not.toHaveBeenCalled()

      expect(result).toEqual([])
    })
  })

  it('deve ler um arquivo individual', () => {
    fs.promises.stat.mockResolvedValueOnce({ isDirectory: false })

    return dirAndFileReader('/path/to/file.md').then((result) => {
      expect(fs.promises.stat).toHaveBeenCalledWith('/path/to/file.md')
      expect(fs.promises.readdir).not.toHaveBeenCalled()

      expect(dirReader).not.toHaveBeenCalled()
      expect(fileReader).toHaveBeenCalledWith('/path/to/file.md')

      expect(result).toEqual([{ file: '/path/to/file.md', data: 'Mocked file data' }])
    })
  })
})
