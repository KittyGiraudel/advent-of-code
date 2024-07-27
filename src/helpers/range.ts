/**
 * Return an array of consecutive numbers of the expected size.
 */
const range = (size: number, startAt = 0) =>
  [...Array(size).keys()].map(i => i + startAt)

export default range
