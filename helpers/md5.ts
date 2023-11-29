import * as crypto from 'node:crypto'

/**
 * Compute the md5 hash of the given value.
 */
const md5 = (value: string) =>
  crypto.createHash('md5').update(value).digest('hex')

export default md5
