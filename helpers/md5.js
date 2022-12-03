const crypto = require('crypto')

const md5 = value => crypto.createHash('md5').update(value).digest('hex')

module.exports = md5
