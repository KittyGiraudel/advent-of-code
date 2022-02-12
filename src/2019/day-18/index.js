const $ = require('../../helpers')

const isDoorAtCell = cell => /[A-Z]/.test(cell)
const isKeyAtCell = cell => /[a-z]/.test(cell)

const createGraph = (grid, start, locations) => {
  const count = Object.keys(locations).filter(isKeyAtCell).length
  const frontier = new $.PriorityQueue([
    { ...start, keys: [], path: [], doors: [] },
    10_000,
  ])

  while (frontier.length) {
    const [curr] = frontier.pop()

    if (curr.keys.length === count) return curr

    $.bordering(curr.coords, 'BOTH')
      .filter(({ coords }) => {
        const cell = $.access(grid, coords)

        if (isDoorAtCell(cell)) {
          return curr.keys.includes(cell.toLowerCase())
        }

        return cell !== '#'
      })
      .forEach(next => {
        const cell = $.access(grid, next.coords)
        const doors = [...curr.doors]
        const keys = [...curr.keys]
        const path = [...curr.path, curr.point]

        if (isKeyAtCell(cell) && !keys.includes(cell)) keys.push(cell)
        if (isDoorAtCell(cell) && !doors.includes(cell)) doors.push(cell)

        let priority = 10_000
        const unmatchedKeys = keys.filter(
          key => !doors.includes(key.toUpperCase())
        )

        if (unmatchedKeys.length) {
          const nextDoor = $.last(unmatchedKeys).toUpperCase()

          if (nextDoor in locations) {
            priority = $.manhattan(next.coords, locations[nextDoor])
          }
        }

        frontier.push([{ ...next, keys, doors, path }, priority])
      })
  }

  return from
}

const run = input => {
  const locations = {}

  const grid = $.grid.create(input, (v, ri, ci) => {
    const isKey = /[a-z]/.test(v)
    const isDoor = /[A-Z]/.test(v)
    const isStart = v === '@'
    if (isKey || isDoor || isStart) locations[v] = [ri, ci]
    return v
  })

  const startCoords = locations['@']
  const start = { coords: startCoords, point: $.toPoint(startCoords) }
  const graph = createGraph(grid, start, locations)

  return graph.path.length
}

module.exports = { run }
