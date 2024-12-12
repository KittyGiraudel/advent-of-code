import $ from '../../helpers'

// This halfing mechanism is a bit convoluted, and using string slicing would be
// much simpler, but I originally thought optimizing this for speed would get me
// to solve part — it did not.
const half = (value: number): [number, number] => {
  const length = String(value).length
  const multiplier = 10 ** (length / 2)
  const a = Math.floor(value / multiplier)
  const b = value - a * multiplier

  return [a, b]
}

const processStone = (stone: number): [number, number | undefined] => {
  if (stone === 0) return [1, undefined]
  if (String(stone).length % 2 === 0) return half(stone)
  return [stone * 2024, undefined]
}

// The memoization is not optional here: we end up hitting the same pathways
// many times (like a given stone value at a given depth), so we need cache to
// avoid recomputing the same thing over and over.
const blink = $.memo((stone: number, iterations: number): number => {
  const [left, right] = processStone(stone)
  const hasSplit = right !== undefined

  if (iterations === 1) return hasSplit ? 2 : 1

  const leftNext = blink(left, iterations - 1)
  const rightNext = hasSplit ? blink(right, iterations - 1) : 0

  return leftNext + rightNext
})

// Truth be told, I couldn’t solve part 2 on my own. I had to resort to reading
// a tutorial on how to logically solve the problem. I knew it wasn’t doable
// with arrays since it would become too large, but I couldn’t figure out a way
// to store the output in a number while keeping track of the changes of every
// stone. Ultimately, the trick is to understand that you can process each stone
// fully individually since they have no relation to other stones, and then sum
// the total of each stone.
// See: https://www.reddit.com/r/adventofcode/comments/1hbnyx1/2024_day_11python_mega_tutorial/
export const run = (input: string, iterations = 25) =>
  $.numbers(input).reduce((acc, stone) => acc + blink(stone, iterations), 0)
