import Circularray from 'circularray'

// My solution uses my double-ended queue library. That being said, it is not
// better than using arrays considering the volume we’re dealing with. A linked
// list would be better if we had so many items that storing such a huge array
// in memory wouldn’t work. We only have 5,000 items here, so an array would
// most likely be better but I’m keeping this solution for posterity (still runs
// within 2 seconds).
//
// Side note, kudos to that solution which is much simpler and faster:
// https://www.reddit.com/r/adventofcode/comments/zqezkn/comment/j0ywkpy/?utm_source=share&utm_medium=web2x&context=3
export const mix = (
  numbers: Array<number>,
  count: number = 1,
  multiplier: number = 1
): number => {
  const circle = new Circularray(
    numbers.map((n, index) => ({ number: n * multiplier, index }))
  )

  while (count--) {
    // For each number, the strategy is find, drop, insert at the new position.
    // This is kind of similar to `.indexOf()` + 2 successive `.splice()` (one
    // for deletion, one for addition). It would be faster on a much larger data
    // set but given the size of the list, it’s actually slower. 🙃
    for (let i = 0; i < circle.length; i++) {
      while (circle.pointer.value.index !== i % circle.length) circle.rotate(1)
      const node = circle.shift()
      circle.rotate(-node.number).unshift(node)
    }
  }

  const array = circle.toArray()
  const zero = array.findIndex(node => node.number === 0)

  return (
    array[(zero + 1000) % array.length].number +
    array[(zero + 2000) % array.length].number +
    array[(zero + 3000) % array.length].number
  )
}
