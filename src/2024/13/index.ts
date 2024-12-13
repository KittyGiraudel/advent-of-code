import $ from '../../helpers'

export const run = (input: string[], part2 = false) => {
  const offset = part2 ? 10000000000000 : 0
  const machines = input.map(block => {
    const lines = block.split('\n')
    const A = $.numbers(lines[0])
    const B = $.numbers(lines[1])
    const P = $.numbers(lines[2])

    return { A, B, P: [P[0] + offset, P[1] + offset] }
  })

  // Like an oblivious idiot, I solved part 1 with GBFS. Of course, this is
  // undoable for part 2. At this point, I knew I wouldn’t be able to sovle it
  // since this is a math problem (linear equation specifically), and math ain’t
  // my strong suit. I found a good explanation of the solution on Reddit, which
  // makes total sense (although I couldn’t come up with it myself).
  // See: https://www.reddit.com/r/adventofcode/comments/1hd7irq/2024_day_13_an_explanation_of_the_mathematics/
  return $.sum(
    machines.map(({ P: [pX, pY], A: [aX, aY], B: [bX, bY] }) => {
      const det = aX * bY - aY * bX
      const cA = (pX * bY - pY * bX) / det
      const cB = (aX * pY - aY * pX) / det
      // To figure out whether we can reach the exact prize position, we need to
      // check whether our result is made of 2 integers, since they are button
      // presses. If any of the 2 numbers isn’t round, it means the prize cannot
      // be reached in a given amount of button presses.
      return Math.round(cA) === cA && Math.round(cB) === cB ? cA * 3 + cB : 0
    })
  )
}
