const $ = require('../../helpers')

const run = (input, n = 5) => {
  let i = 0
  while (true) {
    if ($.md5(input + ++i).startsWith('0'.repeat(n))) return i
  }
}

module.exports = { run }
