import $ from '../../helpers'

export const run = (input: string[], advanced: boolean = false) => {
  if (advanced) {
    const time = +$.numbers(input[0]).join('')
    const distance = +$.numbers(input[1]).join('')
    const pivot = Math.ceil(time / 2)
    const boundary = $.binarySearch(0, pivot, i =>
      (time - i) * i > distance ? -1 : +1
    )

    // We know the distribution is symmetrical, so we only need to find the
    // lower bound under which games are no longer winnable. If the distribution
    // was to be asymmetrical, we’d need to compute the upper bound as well, and
    // use the difference.
    return (pivot - boundary) * 2 + 1

    /*
    // Leaving here my original, working and fast enough implementation for part
    // 2 for posterity. I only authored the binary search approach after having
    // browsed Reddit (although I did write it myself).
    //
    // This might not be the most elegant approach for part 2, but it works and
    // it’s imperceptibly fast. While doing part 1, I noticed the distribution
    // of winning configurations is on a bell curve, with the winning ones
    // sitting in the middle. So instead of brute-forcing from 0 to time, I
    // brute-force twice from the middle to 0 and from the middle to time,
    // stopping as soon as we find the first falsy value.
    let count = 0

    for (let i = Math.ceil(time / 2); i < time; i++)
      if ((time - i) * i > distance) count++
      else break

    for (let i = Math.floor(time / 2); i > 0; i--)
      if ((time - i) * i > distance) count++
      else break

    // We need to subtract one because we count the pivot twice in case of an
    // even number input (which is the case).
    return count - 1
    */
  }

  const possibilities = $.zip(input.map($.numbers)).map(([time, distance]) => {
    let count = 0
    for (let i = 0; i < time; i++) if ((time - i) * i > distance) count++
    return count
  })

  return $.product(possibilities)
}
