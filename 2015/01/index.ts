export const run = (string: string) => {
  let floor = 0
  let basement = Number.POSITIVE_INFINITY

  for (let i = 0; i < string.length; i++) {
    if (string[i] === '(') floor++
    if (string[i] === ')') floor--
    if (!Number.isFinite(basement) && floor === -1) basement = i + 1
  }

  return [floor, basement] as [number, number]
}
