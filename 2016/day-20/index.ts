import $ from '../../helpers'

export const run = (
  lists: string[],
  MAX: number,
  advanced: boolean = false
) => {
  let blacklists = lists
    .map(a => a.split('-').map(Number))
    .sort((a, b) => a[0] - b[0] || a[1] - b[1])

  // Initialize the pointer beyond the upper bound of the first range, since
  // that is the potentially first valid IP.
  let pointer = blacklists[0][1] + 1
  let count = 0

  // Iterate over the blacklists. If there is a gap between the pointer and the
  // lower bound of the blacklist, this range of IPs is valid. Otherwise, push
  // the pointer beyond the max (provided it’s not already beyond it).
  for (let i = 1; i < blacklists.length; i++) {
    const [min, max] = blacklists[i]

    if (pointer < min) {
      count += min - pointer
      // For part 1, we can stop here as the pointer is at the first valid IP.
      if (!advanced) break
      pointer = max + 1
    } else if (max > pointer) {
      pointer = max + 1
    }
  }

  // Do not forget to count the potential valid IPs between the highest upper
  // bound and the maximum value. It doesn’t happen in my input, but it happens
  // with the example (where the maximum upper bound is 8 but the max is 9).
  count += MAX - Math.max(...blacklists.map(([, max]) => max))

  return advanced ? count : pointer
}
