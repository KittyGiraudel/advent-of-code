import $ from '../../helpers'
import { Coords, Grid, Point } from '../../types'

type Orientation = '^' | 'v' | '<' | '>'
type Cart = {
  orientation: Orientation
  index: Generator
  crashed?: boolean
}
type CartMap = Record<Point, Cart>
type Slashes = '/' | '\\'

const CORNERS: {
  [K in Slashes]: { [K in Orientation]: Orientation }
} = {
  '/': { '^': '>', '>': '^', '<': 'v', v: '<' },
  '\\': { '<': '^', '^': '<', v: '>', '>': 'v' },
}

const ROTATIONS: {
  [K in Orientation]: [Orientation, Orientation, Orientation]
} = {
  '>': ['^', '>', 'v'],
  '<': ['v', '<', '^'],
  '^': ['<', '^', '>'],
  v: ['>', 'v', '<'],
}

const VECTORS: { [K in Orientation]: Coords } = {
  '>': [0, +1],
  '<': [0, -1],
  '^': [-1, 0],
  v: [+1, 0],
}

const rotate = (cart: Cart) =>
  ROTATIONS[cart.orientation][cart.index.next().value] as Orientation

const move = (grid: Grid<string>, point: Point, cart: Cart) => {
  const coords = $.toCoords(point)
  // Compute the new orientation for the cart. If it’s sitting on an
  // intersection, its internal counter determines the new orientation,
  // otherwise it just goes straight (orientation does not change).
  let orientation = grid.get(coords) === '+' ? rotate(cart) : cart.orientation
  // Determine the coordinates of the destination cell by applying a vector
  // defined by the orientation.
  const nextCoords = $.applyVector(coords, VECTORS[orientation])
  // Check the orientation of the track on the destination cell. Namely, we‘re
  // looking for corners, as they cause the cart to rotate some more.
  const nextCell = grid.get(nextCoords)
  // If the destination cell is indeed a corner, the cart orientation needs
  // to be adjusted based on the corner tile.
  if (nextCell in CORNERS)
    orientation = CORNERS[nextCell as keyof typeof CORNERS][orientation]

  return { point: $.toPoint(nextCoords), orientation }
}

const gridOrder = (a: Point, b: Point) => {
  const [aRi, aCi] = $.toCoords(a)
  const [bRi, bCi] = $.toCoords(b)
  return aRi - bRi || aCi - bCi
}

const tick = (grid: Grid<string>, carts: CartMap, cleanUp: boolean = false) => {
  ;(Object.keys(carts) as Point[]).sort(gridOrder).forEach(point => {
    const cart = carts[point]

    // This cannot be done with a `.filter` because that would be resolved
    // before iterating, while the object of carts gets updated within every
    // loop iteration.
    if (!cart || cart.crashed) return

    // Get the coordinates of the destination cell, as well as the orientation
    // for the cart once moved.
    const next = move(grid, point, cart)

    // If there is already a cart in the destination cell, mark the existing
    // cart as crashed (or delete it altogether if running in cleanup mode).
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

export const run = (rows: string[], cleanUp: boolean = false) => {
  const carts: CartMap = {}

  // Iterate over the grid to:
  // 1. Collect the coordinates and orientation of every cart.
  // 2. Restore the proper track value underneath the grid.
  // From there onwards, the grid is never modified again, and is only read.
  const grid = $.Grid.fromRows(rows, (value, coords) => {
    if (/[<>v^]/.test(value))
      carts[$.toPoint(coords)] = {
        orientation: value as Orientation,
        index: $.loopIndex(0, 2),
      }
    if (['<', '>'].includes(value)) return '-'
    if (['v', '^'].includes(value)) return '|'
    return value
  })

  // Move the carts until we are considered done. For part 1, it means until we
  // have witnessed a crash. For part 2, it means until we have only one cart
  // left standing.
  while (
    !Object.values(carts).some((cart: Cart) => cart.crashed) &&
    Object.keys(carts).length > 1
  ) {
    tick(grid, carts, cleanUp)
  }

  // Finally, we can return to the crash site, or the last cart standing,
  // without forgetting to flip the coordinates.
  const points = Object.keys(carts) as Point[]
  const flip = (point: Point) => $.toCoords(point).reverse()
  const interest = points.find(point => carts[point].crashed) || points[0]

  return flip(interest)
}
