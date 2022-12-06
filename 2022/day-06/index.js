const $ = require('../../helpers')

const findMarker = (input, length = 4) => {
  for (let i = length; i < input.length; i++) {
    const slice = input.slice(i - length, i)
    const uniq = new Set(Array.from(slice))

    if (uniq.size === length) return i
  }

  return null
}

module.exports = { findMarker }
