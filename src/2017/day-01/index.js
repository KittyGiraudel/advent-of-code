const $ = require('../../helpers')

const captcha = (input, inc = input.length / 2) => {
  let sum = 0

  for (let i = 0; i < input.length; i++) {
    const digit = input[i]
    const match = input[(i + inc) % input.length] || input[0]

    if (digit === match) sum += +digit
  }

  return sum
}

module.exports = { captcha }