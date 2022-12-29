import $ from '../../helpers'

const toArray = value => (Array.isArray(value) ? value : [value])
const isDefined = value => typeof value !== 'undefined'
const isNumber = value => typeof value === 'number'

// Compare two values and return `true`, `false` or `undefined` whether they are
// respectively ordered properly, ordered wrongly, or cannot be compared. The
// algorithm to figure out the order goes like this:
// 1. Check whether one of the packet is undefined.
//    - If the second is missing, the order is incorrect.
//    - If the first is missing, the order is correct.
// 2. Compare numeric values.
//    - If the first is smaller, the order is correct.
//    - If the second is smaller, the order is incorrect.
//    - If the values are equal, the order is undetermined.
// 3. Force both values as array then iterate over their individual values.
//    - If the comparison yields a result, return it.
//    - If the comparison is undetermined, skip to next set of values.
// @param {Number|Number[]|undefined} a - First value
// @param {Number|Number[]|undefined} b - Second value
// @return {Boolean|undefined}
export const compare = (a, b) => {
  if (!isDefined(b)) return false
  if (!isDefined(a)) return true

  if (isNumber(a) && isNumber(b))
    return a < b ? true : a > b ? false : undefined

  a = toArray(a)
  b = toArray(b)

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const result = compare(a[i], b[i])
    if (isDefined(result)) return result
  }
}

export const getScore = pairs =>
  $.sum(
    pairs.map((pair, index) =>
      compare(...pair.split('\n').map(JSON.parse)) ? index + 1 : 0
    )
  )

// Add divider packets and sort all packets in the right order. To do so, add a
// pair of dividers, then join all pairs together, and split it on line breaks
// to get an array of individual packets; parse them all as JSON. Then sort all
// packets based, and find the index of the dividers again.
export const sort = pairs => {
  const dividers = `[[2]]\n[[6]]`
  const packets = pairs.concat(dividers).join('\n').split('\n').map(JSON.parse)
  const sorted = packets.sort((a, b) => (compare(a, b) ? -1 : +1))
  const indices = sorted
    .map(JSON.stringify)
    .map((packet, index) =>
      dividers.split('\n').includes(packet) ? index + 1 : 1
    )

  return $.product(indices)
}
