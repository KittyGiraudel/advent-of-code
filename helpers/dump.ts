import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import md5 from './md5'

const getFileName = (content: string): string => md5(content) + '.log'

/**
 * Write the given data on a file on disk provided the file doesn’t already
 */
const dump = (
  data: string,
  importMeta: ImportMeta = import.meta,
  fileName: string = getFileName(data)
): boolean => {
  const directory = path.dirname(fileURLToPath(importMeta.url))
  const pathName = path.join(directory, fileName)

  if (!fs.existsSync(pathName)) {
    fs.writeFileSync(pathName, data, 'utf8')
    return true
  }

  return false
}

export default dump
