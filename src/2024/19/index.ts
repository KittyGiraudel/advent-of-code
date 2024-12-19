import $ from '../../helpers'

export const run = (input: string[], part2 = false) => {
  const [rawTowels, , ...patterns] = input
  const towels = rawTowels.split(', ')

  // I solved part 1 with a hand-written DFS very easily, and then I realised
  // that brute-forcing part 2 would not be possible without memoization. But
  // because I wrote BFS as a while loop, I wasn’t too sure how to integrate
  // caching in the solution. I eventually took inspiration from a version found
  // on Reddit.
  // The logic is quite simple in the end (and very similar to the one I used in
  // my original version): for a given pattern, find the towels that fit at the
  // beginning of it, and then recursively do that, slicing off the length of
  // said towel so that caching can be leveraged.
  // See: https://www.reddit.com/r/adventofcode/comments/1hhlb8g/comment/m2sos6b/
  const countBuilds = $.memo((pattern: string): number => {
    if (pattern.length === 0) return 1

    return towels
      .filter(towel => pattern.startsWith(towel))
      .reduce((acc, towel) => acc + countBuilds(pattern.slice(towel.length)), 0)
  })

  const counts = patterns.map(countBuilds)

  return part2 ? $.sum(counts) : counts.filter(value => value > 0).length
}
