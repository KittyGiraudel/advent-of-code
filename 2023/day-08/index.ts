import $ from '../../helpers'

const createMap = (lines: string[]) =>
  lines.reduce<Record<string, [string, string]>>((acc, line) => {
    const [, key, left, right] = $.match(line, /^(\w+) = \((\w+), (\w+)\)$/)
    acc[key] = [left, right]
    return acc
  }, {})

const process = (
  map: Record<string, [string, string]>,
  directions: string,
  start: string,
  end: (curr: string) => boolean
) => {
  const steps = Array.from(directions).map(step => (step === 'L' ? 0 : 1))
  let curr = start
  let count = 0

  // Golfed for funsies: it basically just follows the left or right node based
  // on the current step.
  while (!end(curr)) curr = map[curr][steps[count++ % steps.length]]

  return count
}

export const run = ([directions, , ...lines]: string[], advanced?: boolean) => {
  const map = createMap(lines)

  if (!advanced) {
    return process(map, directions, 'AAA', curr => curr === 'ZZZ')
  }

  // Like a basic bitch, I initially attempted to brute-force part 2. Because it
  // obviously didn’t work, I assumed it was a performance problem, until I
  // tried to solve it sort of manually. Basically, for each start node, I tried
  // to find the distance to every end node. It quickly became apparent that
  // not every end node can be reached from every start node; in fact, only one
  // end node can be reached by a given start node. Anyway, once we find the
  // distance from a start node to its end node, the result is the least common
  // multiple of all distances. I’m pretty happy I figured that out on my own
  // and quite quickly at that.
  // There are some interesting discussions on Reddit about why LCM even work
  // for this problem:
  // https://www.reddit.com/r/adventofcode/comments/18dg1hw/2023_day_8_part_2_about_the_correctness_of_a/
  // https://www.reddit.com/r/adventofcode/comments/18dfpub/2023_day_8_part_2_why_is_spoiler_correct/
  // As well as an insightful visualization:
  // https://www.reddit.com/r/adventofcode/comments/18did3d/2023_day_8_part_1_my_input_maze_plotted_using/
  return Object.keys(map)
    .filter(key => key.endsWith('A'))
    .map(key => process(map, directions, key, curr => curr.endsWith('Z')))
    .reduce((a, b) => $.lcm(a, b), 1)
}
