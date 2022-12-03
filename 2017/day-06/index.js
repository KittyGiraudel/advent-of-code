const $ = require('../../helpers')

const run = memory => {
  memory = memory.slice(0)
  const history = []
  let cycles = 0

  while (!history.includes(memory.join(','))) {
    history.push(memory.join(','))
    cycles++

    // Find the index of the largest pool. In case of tie, the value at the
    // lowest index should be used, which is what `indexOf` conveniently
    // returns (first hit).
    const bank = memory.indexOf(Math.max(...memory))
    let blocks = memory[bank]
    let index = bank
    // Reset the memory bank to 0, then distribute its blocks by rotating the
    // index.
    memory[bank] = 0

    while (blocks--) {
      index++
      if (index === memory.length) index = 0
      memory[index]++
    }
  }

  return [cycles, history.length - history.indexOf(memory.join(','))]
}

module.exports = { run }
