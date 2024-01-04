import $ from '../../helpers'
import { Coords } from '../../types'

export const discover = (input: string[], roundTrip: boolean = false) => {
  let start: Coords
  const locations: Coords[] = []
  const grid = $.Grid.fromRows(input, (cell, coords) => {
    if (cell === '0') start = coords
    else if (cell !== '#' && cell !== '.') locations.push(coords)
    return cell
  })

  const getNext = (curr: Coords) =>
    $.bordering(curr).filter(coords => grid.get(coords) !== '#')

  // I originally cached the neighbors in a map to speed things up but it’s
  // negligible. What really makes a difference is not doing search on paths we
  // have already done (hence this memoization).
  // Memoize the search between two points to avoid computing it again and again
  // for every possible order.
  const search = $.memo((from: Coords, to: Coords) =>
    $.search.bfs({
      start: from,
      isGoal: curr => curr[0] === to[0] && curr[1] === to[1],
      getNext,
    })
  )

  /*
  // This version is a different implementation inspired by some Reddit comment.
  // This is twice as fast as my own version up there because it pre-computes
  // the distance between every location, and then compute the total distance
  // for each possible order. All in all similar, but faster (~500ms).
  const pairs = $.combinations([...locations, start], 2)
  const distances = pairs.reduce(
    (acc, [start, end]) => {
      if (!(start in acc)) acc[start] = {}
      if (!(end in acc)) acc[end] = {}

      const length = $.search.bfs({
        start,
        isGoal: curr => curr[0] === end[0] && curr[1] === end[1],
        getNext
      }).getPath().length

      acc[start][end] = acc[end][start] = length

      return acc
    },
    {}
  )
  */

  // Although this solution is pretty unoptimized, it runs (both parts!) in
  // about a second thanks to some aggressive caching. It consists on generating
  // all the possible permutations of the locations (without including the start
  // point). Then for each order, find the shortest path from point to point
  // (and then back to the start for part 2).
  return $.permutations(locations).reduce((min, order) => {
    let count = 0
    let curr: Coords | undefined = start

    if (roundTrip) order.push(curr)

    while (order.length) {
      const next = order.shift()!
      // Which of the next two lines to comment out depends on which version is
      // used previously: my first version does pathfinding on the go with some
      // aggressive caching while the second version precomputes all distances
      // and just does summing to find the shortest path.
      count += search(curr, next).getPath().length
      // count += distances[curr][next]
      curr = next
    }

    return Math.min(count, min)
  }, Infinity)
}
