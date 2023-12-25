import $ from '../../helpers'

export const run = (
  input: string[],
  maximum: number,
  part2: boolean = false
) => {
  const lists = input
    .map(a => a.split('-').map(Number))
    .sort((a, b) => a[0] - b[0] || a[1] - b[1])

  // Initialize the pointer beyond the upper bound of the first range, since
  // that is the potentially first valid IP.
  let pointer = lists[0][1] + 1
  let count = 0

  // Iterate over the lists. If there is a gap between the pointer and the lower
  // bound of the list, this range of IPs is valid. Otherwise, push the pointer
  // beyond the max (provided it’s not already beyond it).
  for (let i = 1; i < lists.length; i++) {
    const [min, max] = lists[i]

    if (pointer < min) {
      count += min - pointer
      // For part 1, we can stop here as the pointer is at the first valid IP.
      if (!part2) break
      pointer = max + 1
    } else if (max > pointer) {
      pointer = max + 1
    }
  }

  // Do not forget to count the potential valid IPs between the highest upper
  // bound and the maximum value. It doesn’t happen in my input, but it happens
  // with the example (where the maximum upper bound is 8 but the max is 9).
  count += maximum - Math.max(...lists.map(([, max]) => max))

  return part2 ? count : pointer
}
