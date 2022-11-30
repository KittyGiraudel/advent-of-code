const $ = require('../../helpers')

const run = (salt, iterations = 1) => {
  // Declare the hash function within this scope because the memoization is more
  // effective when there is only one argument, as it doesn’t perform JSON
  // serialization on the args to get a key.
  const hash = $.memo(value => {
    for (let i = 0; i < iterations; i++) value = $.md5(value)
    return value
  })

  const cache = new Map()
  const keys = new Set()
  const re5 = /(\w)\1{4}/
  const re3 = /(\w)\1{2}/
  let index = -1

  while (keys.size < 64) {
    const currSalt = salt + ++index
    const curr = hash(currSalt)
    const match5 = curr.match(re5)
    const match3 = curr.match(re3)?.[1][0]

    cache.set(currSalt, match3)

    if (!match5) continue

    for (let i = Math.max(0, index - 1000); i < index; i++) {
      let match3 = cache.get(salt + i)
      if (keys.has(i) || !match3 || match3 !== match5[1][0]) continue
      keys.add(i)
    }
  }

  return Array.from(keys).slice(0, 64).pop()
}

module.exports = { run }
