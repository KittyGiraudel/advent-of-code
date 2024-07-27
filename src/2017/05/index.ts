export const run = (
  memory: number[],
  boundary: number = Number.POSITIVE_INFINITY
) => {
  memory = memory.slice(0)
  let index = 0
  let i = 0

  while (typeof memory[index] !== 'undefined') {
    i++
    const offset = memory[index]
    memory[index] = memory[index] + (offset >= boundary ? -1 : +1)
    index += offset
  }

  return i
}
