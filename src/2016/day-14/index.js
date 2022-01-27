const $ = require('../../helpers')
const crypto = require('crypto')

const hash = (value, iterations = 1) => {
  while (iterations--)
    value = crypto.createHash('md5').update(value).digest('hex')
  return value
}

const run = (salt, iterations = 1) => {
  const keys = []
  const re = /(\w)\1{2}/
  const hashes = new Map()
  let index = 0

  while (keys.length < 64) {
    const currSalt = salt + index
    const curr = hashes.get(currSalt) || hash(currSalt, iterations)
    const match = curr.match(re)

    if (match) {
      for (let i = 1; i <= 1000; i++) {
        const nextSalt = salt + (index + i)
        const next = hashes.get(nextSalt) || hash(nextSalt, iterations)
        const needle = match[1][0].repeat(5)

        hashes.set(nextSalt, next)

        if (!next.includes(needle)) continue

        keys.push({ index, hash: curr })
        console.log('Found key', keys.length, curr, 'at index', index)
        break
      }
    }

    index++
  }

  console.log(keys)

  return $.last(keys).index
}

console.log(run('jlmsuwbz', 2017))

module.exports = { run }
