import $ from '../../helpers'
import type { Grid, Point, SearchGraph } from '../../types'

const mapOutRegions = (grid: Grid<string>) => {
  const regions: SearchGraph[] = []

  grid.forEach((value, coords) => {
    const point = $.toPoint(coords)

    if (!regions.some(region => point in region)) {
      const { graph: region } = $.search.bfs({
        start: point,
        getNext: curr =>
          $.bordering(curr).filter(cell => grid.get(cell) === value),
      })

      regions.push(region)
    }
  })

  return regions.map(region => Object.keys(region) as Point[])
}

// My original solution for part 2 was absolutely insane (but it worked, albeit
// being so incredibly slow). I browsed Reddit for a little while trying to
// figure out what I missed (because my way couldn’t have possibly been the
// Right Way™). A lot of people mentioned counting sides is just like counting
// corners, which only clicked in the middle of the night a few hours later. I
// thus rewrote my part 2 in the form of `countCorners`, which became trivial
// (and fast of course).
export const run = (input: string[], part2 = false) => {
  const grid = $.Grid.fromRows(input)
  const regions = mapOutRegions(grid)

  const countCorners = (points: Point[]) => {
    const l = grid.get(points[0])
    const g = grid
    let corners = 0

    points.forEach(point => {
      const [N, NE, E, SE, S, SW, W, NW] = $.surrounding(point)
      if (g.get(W) !== l && g.get(N) !== l) corners++
      if (g.get(E) !== l && g.get(N) !== l) corners++
      if (g.get(W) !== l && g.get(S) !== l) corners++
      if (g.get(E) !== l && g.get(S) !== l) corners++
      if (g.get(W) === l && g.get(N) === l && g.get(NW) !== l) corners++
      if (g.get(E) === l && g.get(N) === l && g.get(NE) !== l) corners++
      if (g.get(S) === l && g.get(W) === l && g.get(SW) !== l) corners++
      if (g.get(S) === l && g.get(E) === l && g.get(SE) !== l) corners++
    })

    return corners
  }

  const getPerimeter = (points: Point[]) => {
    const letter = grid.get(points[0])

    if (points.length === 1) return 4
    if (points.length === 1) return 8

    return points.reduce(
      (perimeter, point) =>
        perimeter +
        4 -
        $.bordering(point).filter(cell => grid.get(cell) === letter).length,
      0
    )
  }

  return regions.reduce(
    (acc, region) =>
      acc +
      region.length * (part2 ? countCorners(region) : getPerimeter(region)),
    0
  )
}
