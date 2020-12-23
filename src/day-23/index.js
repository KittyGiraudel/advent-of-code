const anchor = (array, value) => {
  const index = array.indexOf(value)
  return array.slice(index).concat(array.slice(0, index))
}

const getDestinationCup = (cups, current, pick, max) => {
  let destination = current - 1

  if (destination < 1) return getDestinationCup(cups, max + 1, pick, max)
  if (pick.includes(destination))
    return getDestinationCup(cups, destination, pick, max)

  return destination
}

function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt)
}

const pickCups = (cups, index) => {
  const picks = cups.slice(index + 1, index + 4)

  return picks.length === 3
    ? picks
    : picks.concat(cups.slice(0, 3 - picks.length))
}

const play = (input, moves = 10, padTo = 9) => {
  let cups = String(input).split('').map(Number)
  if (cups.length < padTo - 1)
    cups = cups.concat(range(padTo - cups.length, Math.max(...cups) + 1))
  const length = cups.length
  let curr = cups[0]

  for (let i = 0; i < moves; i++) {
    if (i % 100 === 0) console.log(i)
    const currIdx = cups.indexOf(curr)
    let nextCurrIdx = currIdx

    // Pick the 3 next cups right-side of the current one
    const pick = pickCups(cups, currIdx)

    // Pick the destination cup
    const next = getDestinationCup(cups, curr, pick, padTo)

    // Remove picked cups from the circle
    const end = Math.min(length - 1 - currIdx, 3)
    const start = end < 3 ? pick.length - end : 0
    if (end > 0) cups.splice(currIdx + 1, end)
    if (start > 0) {
      cups.splice(0, start)
      nextCurrIdx -= start
    }

    // Insert cups after the destination cup
    const index = cups.indexOf(next)
    cups.splice(index + 1, 0, ...pick)
    if (index + 1 <= nextCurrIdx) nextCurrIdx += 3

    curr = cups[nextCurrIdx === length - 1 ? 0 : nextCurrIdx + 1]
  }

  return cups
}

module.exports = { play, anchor }
