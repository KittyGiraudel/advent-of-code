/**
 * Rotate the given array to the right `n` times.
 */
const rotate = <T>(array: T[], n: number = 1) => {
  if (n > 0) {
    while (n--) array.unshift(array.pop()!)
  } else if (n < 0) {
    while (n++) array.push(array.shift()!)
  }
  return array
}

export default rotate
