const $ = require('../../helpers')
const Deque = require('dqs')

const run = offset => {
  const memory = new Deque([0])

  // For part 1, we can use a double-ended queue that we rotate by the offset at
  // every iteration.
  for (let i = 1; i <= 2017; i++) {
    memory.rotate(offset * -1)
    memory.insert(i)
  }

  return memory.all()[0]
}

const run2 = offset => {
  let position = 0
  let next = null

  // For part 2, an array of 50,000,000 entries is not going to cut it, and we
  // also don’t need it. We only need to keep track of the current position in
  // the theoretical list, and record the value when we’d be inserting between
  // the 1st and 2nd value (so after `0`).
  for (let i = 1; i <= 50_000_000; i++) {
    position = ((position + offset) % i) + 1
    if (position === 1) next = i
  }

  return next
}

module.exports = { run, run2 }
