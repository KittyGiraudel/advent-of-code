// Return an array of consecutive numbers of the expected size.
const range = (size: number, startAt: number = 0): number[] =>
  [...Array(size).keys()].map(i => i + startAt)

export default range
