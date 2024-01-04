export const find = (
  input: number[],
  value: number = 0,
  cache = new Map<number, number>([[0, 1]])
): number => {
  for (let i = 0; i < input.length; i++) {
    value += input[i]
    if (cache.get(value) === 1) return value
    else cache.set(value, 1)
  }

  return find(input, value, cache)
}
