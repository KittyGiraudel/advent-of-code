import $ from '../../helpers'

export const find = (input, value = 0, cache = new Map([[0, 1]])) => {
  for (let i = 0; i < input.length; i++) {
    value += input[i]
    if (cache.get(value) === 1) return value
    else cache.set(value, 1)
  }

  return find(input, value, cache)
}
