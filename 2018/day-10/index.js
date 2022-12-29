import $ from '../../helpers'

const applyVelocity = ([position, velocity]) => [
  $.applyVector(position, velocity),
  velocity,
]

const parseLine = line => $.chunk(line.match(/(-?\d+)/g).map(Number), 2)

const getDimensions = ([minX, maxX, minY, maxY]) => [
  maxX + 1 - minX,
  maxY + 1 - minY,
]

export const render = curr => {
  const positions = curr.map(([position]) => position)
  const coords = positions.map($.toPoint)
  const boundaries = $.boundaries(positions)
  const grid = $.grid.init(...getDimensions(boundaries))
  const [minX, , minY] = boundaries

  $.grid.forEach(grid, (_, ri, ci) => {
    const key = `${ci + minX},${ri + minY}`
    grid[ri][ci] = coords.includes(key) ? '#' : ' '
  })

  return $.grid.render(grid, ' ')
}

export const plot = input => {
  let curr = input.map(parseLine)
  let [width, height] = [Infinity, Infinity]
  let seconds = 0

  // This condition is somewhat arbitrary. I assumed the message would be
  // letters (given it was in the example), and looking back at other AoC
  // puzzles where letters were rendered, they usually were displayed over a few
  // rows. So I thought once the height is within a dozen lines or so, it’s
  // probably fine.
  while (!$.isClamped(height, 5, 15)) {
    // Increment the amount of seconds one has to wait to see the message.
    seconds++
    // Apply the velocity to every point.
    curr = curr.map(applyVelocity)
    // Compute the new grid dimensions based on the updated points.
    const positions = curr.map(([position]) => position)
    const boundaries = $.boundaries(positions)
    ;[width, height] = getDimensions(boundaries)
  }

  // Render the message:
  // console.log(render(curr))

  return seconds
}
