const $ = require('../../helpers')

const CORNERS = {
  '/': { '^': '>', '>': '^', '<': 'v', v: '<' },
  '\\': { '<': '^', '^': '<', v: '>', '>': 'v' },
}

const ROTATIONS = {
  '>': ['^', '>', 'v'],
  '<': ['v', '<', '^'],
  '^': ['<', '^', '>'],
  v: ['>', 'v', '<'],
}

const VECTORS = {
  '>': [0, +1],
  '<': [0, -1],
  '^': [-1, 0],
  v: [+1, 0],
}

const rotate = cart => ROTATIONS[cart.orientation][cart.index.next().value]

const move = (grid, point, cart) => {
  const [ri, ci] = $.toCoords(point)
  // Compute the new orientation for the cart. If it’s sitting on an
  // intersection, its internal counter determines the new orientation,
  // otherwise it just goes straight (orientation does not change).
  let orientation = grid[ri][ci] === '+' ? rotate(cart) : cart.orientation
  // Determine the coordinates of the destination cell by applying a vector
  // defined by the orientation.
  const [nextRi, nextCi] = $.applyVector([ri, ci], VECTORS[orientation])
  // Check the orientation of the track on the destination cell. Namely, we‘re
  // looking for corners, as they cause the cart to rotate some more.
  const nextCell = grid[nextRi][nextCi]
  // If the destination cell is indeed a corner, the cart orientation needs
  // to be adjusted based on the corner tile.
  if (nextCell in CORNERS) orientation = CORNERS[nextCell][orientation]

  return { point: $.toPoint([nextRi, nextCi]), orientation }
}

const gridOrder = (a, b) => {
  const [aRi, aCi] = $.toCoords(a)
  const [bRi, bCi] = $.toCoords(b)
  return aRi - bRi || aCi - bCi
}

const tick = (grid, carts, cleanUp = false) => {
  Object.keys(carts)
    .sort(gridOrder)
    .forEach(point => {
      const cart = carts[point]

      // This cannot be done with a `.filter` because that would be resolved
      // before iterating, while the object of carts gets updated within every
      // loop iteration.
      if (!cart || cart.crashed) return

      // Get the coordinates of the destination cell, as well as the orientation
      // for the cart once moved.
      const next = move(grid, point, cart)

      // If there is already a cart in the destination cell, mark the existing
      // cart as crashed (or delete it altogether if runnijng in cleanup mode).
      if (next.point in carts) {
        if (cleanUp) delete carts[next.point]
        else carts[next.point].crashed = true
      } else {
        carts[next.point] = { ...cart, orientation: next.orientation }
      }

      // The cart has either moved or crashed, so it should always be deleted.
      delete carts[point]
    })
}

const run = (rows, cleanUp) => {
  const carts = {}

  // Iterate over the grid to:
  // 1. Collect the coordinates and orientation of every cart.
  // 2. Restore the proper track value underneath the grid.
  // From there onwards, the grid is never modified again, and is only read.
  const grid = $.grid.create(rows, (value, ri, ci) => {
    if (/[<>v^]/.test(value))
      carts[ri + ',' + ci] = { orientation: value, index: $.loopIndex(0, 2) }
    if (['<', '>'].includes(value)) return '-'
    if (['v', '^'].includes(value)) return '|'
    return value
  })

  // Move the carts until we are considered done. For part 1, it means until we
  // have witnessed a crash. For part 2, it means until we have only one cart
  // left standing.
  while (
    !Object.values(carts).some(cart => cart.crashed) &&
    Object.keys(carts).length > 1
  ) {
    tick(grid, carts, cleanUp)
  }

  // Finally, we can return the crash site, or the last cart standing, without
  // forgetting to flip the coordinates.
  const points = Object.keys(carts)
  const flip = point => $.toCoords(point).reverse()
  const interest = points.find(point => carts[point].crashed) || points[0]

  return flip(interest)
}

module.exports = { run }
