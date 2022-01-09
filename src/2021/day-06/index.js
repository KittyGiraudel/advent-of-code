const $ = require('../../helpers/')

const countFish = (fish, days = 80) => {
  let curr = $.array(9).map((_, i) => $.countInString(fish, i))

  while (days--) {
    let next = []

    for (let a = 7; a >= 0; a--) next[a] = curr[a + 1]
    next[8] = curr[0]
    next[6] = next[6] + curr[0]

    curr = next
  }

  return $.sum(curr)
}

module.exports = { countFish }
