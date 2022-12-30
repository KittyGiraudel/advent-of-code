import * as crypto from 'node:crypto'

const md5 = (value: string): string =>
  crypto.createHash('md5').update(value).digest('hex')

export default md5
