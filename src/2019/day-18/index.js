const $ = require('../../helpers')
const PF = require('pathfinding')
const input = require('../../helpers/readInput')(__dirname)

const finder = new PF.AStarFinder()

const getGraph = rows => {
  const grid = $.createGrid(rows)
  const matrix = $.gridMap(grid, v => +(v === '#' || /[A-Z]/.test(v)))
  const doors = new Map()
  const keys = []

  $.gridForEach(grid, (v, ri, ci) => {
    if (/[a-z]/.test(v)) keys.push({ key: v, coords: [ci, ri] })
    if (/[A-Z]/.test(v)) doors.set(v, [ci, ri])
  })

  const pfGrid = new PF.Grid(matrix)
  const finder = new PF.AStarFinder()
  const state = { position: [40, 40], steps: 0, collected: [] }

  while (state.collected.length < keys.length) {
    const reachableKeys = keys
      .filter(key => !state.collected.includes(key.key))
      .map(key => {
        const grid = pfGrid.clone()
        const path = finder.findPath(...state.position, ...key.coords, grid)
        key.distance = path.length
        return key
      })
      .filter(key => key.distance > 0)
      .sort((a, b) => a.distance - b.distance)

    const next = reachableKeys[0]
    state.position = next.coords
    state.steps += next.distance
    state.collected.push(next.key)
    pfGrid.setWalkableAt(...doors.get(next.key.toUpperCase()), true)
  }

  return state
}

console.log(getGraph(input))
