const sum = require('../../helpers/sum')

const countFish = (fish, days = 80) => {
  let curr = new Map()

  for (let i = 0; i <= 8; i++) {
    curr.set(i, fish.filter(fish => fish === i).length)
  }

  for (let d = 0; d < days; d++) {
    let next = new Map()

    for (let a = 7; a >= 0; a--) next.set(a, curr.get(a + 1))
    next.set(8, curr.get(0))
    next.set(6, next.get(6) + curr.get(0))

    curr = next
  }

  return sum(Array.from(curr.values()))
}

module.exports = { countFish }
