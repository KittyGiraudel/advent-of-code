import $ from '../../helpers'
import type { Coords, Grid } from '../../types'

export const run = (input: string[], part2 = false) => {
  const grid = $.Grid.fromRows(input, Number)
  const starts = grid.filterCoords(value => value === 0)

  // To find *all* paths that go from a starting point (a `0`) to an end point
  // (a `9`), we can run BFS without a visited set. Note that finding all paths
  // between 2 nodes is a NP-Hard problem, but doable in this instance because
  // the input guarantees no cycles.
  // See: https://stackoverflow.com/questions/9535819/find-all-paths-between-two-graph-nodes
  if (part2) {
    return starts.reduce((total, start) => total + countTrails(grid, start), 0)
  }

  // For part 1, we run BFS between every starting point (a `0`) and every end
  // point (a `9`), and count how many are valid.
  return $.sum(
    starts.map(
      start =>
        grid
          .filterCoords(value => value === 9)
          .filter(
            end =>
              $.search.bfs({
                start,
                isGoal: curr => curr[0] === end[0] && curr[1] === end[1],
                getNext: curr =>
                  $.bordering(curr).filter(
                    coords => grid.get(coords) === grid.get(curr) + 1
                  ),
              }).end
          ).length
    )
  )
}

function countTrails(grid: Grid<number>, start: Coords) {
  let count = 0

  $.search.bfs({
    start,
    // Randomize the key to essentially bypass the visited set, so a given node
    // can be visited multiple times.
    toKey: () => String(Math.random()),
    // Never mark a node as the goal in order to never stop early and process
    // the whole queue.
    isGoal: curr => (grid.get(curr) === 9 && count++, false),
    getNext: curr =>
      $.bordering(curr).filter(
        coords => grid.get(coords) === grid.get(curr) + 1
      ),
  })

  return count
}
