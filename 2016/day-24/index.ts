import $ from '../../helpers'
import { Coords } from '../../types'

export const discover = (input: string[], roundTrip: boolean = false) => {
  let start: Coords
  const locations: Coords[] = []
  const grid = $.grid.create(input, (cell, ...coords) => {
    if (cell === '0') start = coords
    else if (cell !== '#' && cell !== '.') locations.push(coords)
    return cell
  })

  // I originally cached the neighbors in a map to speed things up but it’s
  // negligible. What really makes a difference is not doing pathfinding on
  // paths we have alreadu done (hence this memoization).
  const getNextNodes = (curr: Coords) =>
    $.bordering(curr, 'COORDS').filter(
      coords => $.grid.at(grid, coords) !== '#'
    )

  // Memoize the pathfinding between two points to avoid computing it again and
  // again for every possible order.
  const search = $.memo((from: Coords, to: Coords) =>
    $.pathfinding.bfs({
      start: from,
      isGoal: curr => curr[0] === to[0] && curr[1] === to[1],
      getNextNodes,
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

      const graph = $.pathfinding.bfs({
        start,
        isGoal: curr => curr[0] === end[0] && curr[1] === end[1],
        getNextNodes
      })
      const length = $.pathfinding.path(graph.from, start, end).length

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
      const next = order.shift()
      // Which of the next two lines to comment out depends on which version is
      // used previously: my first version does pathfinding on the go with some
      // aggressive caching while the second version precomputes all distances
      // and just does summing to find the shortest path.
      count += $.pathfinding.path(search(curr, next).from, curr, next).length
      // count += distances[curr][next]
      curr = next
    }

    return Math.min(count, min)
  }, Infinity)
}
