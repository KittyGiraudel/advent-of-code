import $ from '../../helpers'
import type { Coords } from '../../types'

type Robot = { position: Coords; velocity: Coords }

export const run = (input: string[], part2 = false) => {
  const robots = input.map(line => {
    const [px, py, vx, vy] = $.numbers(line)
    return { position: [py, px] as Coords, velocity: [vy, vx] as Coords }
  })

  const sample = input[0] === 'p=0,4 v=3,-3'
  const width = sample ? 11 : 101
  const height = sample ? 7 : 103
  const grid = new $.Grid(width, height, 0)

  robots.forEach(robot =>
    grid.set(robot.position, grid.get(robot.position) + 1)
  )

  const plotQuadrants = (robots: Robot[]) => {
    const quadrants = [
      [0, 0],
      [0, 0],
    ]
    const pivotHeight = Math.floor(height / 2)
    const pivotWidth = Math.floor(width / 2)

    robots.forEach(({ position: [ri, ci] }) => {
      if (ri === pivotHeight) return
      if (ci === pivotWidth) return
      const i = ri < pivotHeight ? 0 : 1
      const j = ci < pivotWidth ? 0 : 1
      quadrants[i][j]++
    })

    return quadrants
  }

  const checksum = (robots: Robot[]) => $.product(plotQuadrants(robots).flat())

  const moveRobot = (robot: Robot) => {
    grid.set(robot.position, grid.get(robot.position) - 1)
    robot.position[0] = (robot.position[0] + robot.velocity[0]) % height
    if (robot.position[0] < 0) robot.position[0] += height
    robot.position[1] = (robot.position[1] + robot.velocity[1]) % width
    if (robot.position[1] < 0) robot.position[1] += width
    grid.set(robot.position, grid.get(robot.position) + 1)
  }

  const step = (n = 1) => {
    for (let i = 0; i < Math.abs(n); i++) robots.forEach(moveRobot)
  }

  step(100)

  // Part 2 is a bit different: we need to find out after how many iterations
  // will the dots be arranged to form a Christmas tree.
  //
  // I wasn’t sure how to approach it with code without knowing what the Christ-
  // mas tree would look like or whether it would even use all 500 dots (the
  // text actually makes it clear that *most* of them would, ergo not all of
  // them). I did think about looking for a horizontal line of, say, 10 dots in
  // a row, but it felt a bit too much like a shot in the dark at that point.
  //
  // For some reason, I looked into ways to get the density of a 2D grid and
  // found a demo using Plotly. So I set up a little playground where I could
  // walk through the iterations to find the one that displays a Christmas tree
  // (open index.html to try it out). It didn’t really work, because I did not
  // look at enough steps to reach the right one.
  //
  // By looking at the checksum (what part 1 requires) of every of the first 100
  // steps, I noticed that it’s significantly lower when dots are more cluttered
  // (which makes sense since it’s the product of the amounts of dots per
  // quadrant). I also realised that every 101 steps, the dots gather in a very
  // significant fashion. I then manually iterated through these steps (101 at a
  // time to only look at the relevant ones), until I found the Christmas tree
  // at step 8087. How delightful.
  //
  // The code below is just a solution written later on just to have one, which
  // relies on the reasonable (albeit not obvious) assumption that there would
  // be no robots overlap on the right frame.
  if (part2) {
    for (let i = 100; i < Number.POSITIVE_INFINITY; i++) {
      if (grid.every(cell => cell < 2)) return i
      else step(1)
    }
  }

  return checksum(robots)
}
