// Get the last number said after `target` rounds with `numbers` as a starting
// point.
// @param numbers - Initial set of numbers
// @param rounds - Rounds to play
export const get = (numbers: Array<number>, rounds: number = 1): number => {
  const map = new Uint32Array(rounds)
  let last = 0

  for (let i = 0; i < rounds; i++) {
    if (i < numbers.length) {
      last = numbers[i]
      map[last] = i + 1
    } else {
      const lastIndex = map[last] || null
      map[last] = i
      last = lastIndex === null ? 0 : i - lastIndex
    }
  }

  return last
}
