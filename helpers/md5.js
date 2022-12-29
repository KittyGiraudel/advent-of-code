import crypto from 'crypto'

const md5 = value => crypto.createHash('md5').update(value).digest('hex')

export default md5
