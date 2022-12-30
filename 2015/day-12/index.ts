import $ from '../../helpers'

// 1. If the value is a number, return it.
// 2. If the value is an array, recursively walk it.
// 3. If the value is an object (and not null) and doesn’t contain `red` as a
//    value, recursively walk it.
// 4. Otherwise return 0.
const getSum = (item: any): number => {
  if (typeof item === 'number') return item
  if (Array.isArray(item)) return $.sum(item.map(getSum))
  if (item && typeof item === 'object' && !Object.values(item).includes('red'))
    return Object.keys(item).reduce((acc, key) => acc + getSum(item[key]), 0)
  return 0
}

export const run = (input: string, advanced: boolean = false): number =>
  advanced
    ? getSum(JSON.parse(input))
    : $.sum(input.match(/-?\d+/g).map(Number))
