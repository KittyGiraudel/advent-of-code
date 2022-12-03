const $ = require('../../helpers/')

const isGridComplete = grid => {
  const hasFullRow = grid.some(row => row.every(item => item.marked))
  const hasFullCol = grid[0].some((_, i) => grid.every(row => row[i].marked))

  return hasFullRow || hasFullCol
}

const roll = (grids, number) => {
  grids.forEach(grid => {
    $.grid.forEach(grid, item => {
      if (item.value === number) item.marked = true
    })
  })
}

const computeGridScore = grid =>
  $.sum($.grid.map(grid, item => (item.marked ? 0 : item.value)).flat())

const getBingos = input => {
  const [numbers, ...grids] = parseInput(input)
  const bingos = []

  for (let i = 0; i < numbers.length; i++) {
    roll(grids, numbers[i])

    for (let g = 0; g < grids.length; g++) {
      if (isGridComplete(grids[g])) {
        bingos.push(numbers[i] * computeGridScore(grids[g]))
        grids.splice(g, 1)
      }
    }
  }

  return bingos
}

const formatGrid = grid =>
  grid.split('\n').map(row =>
    row
      .split(/\s+/g)
      .filter(Boolean)
      .map(Number)
      .map(value => ({ value, marked: false }))
  )

const parseInput = input => {
  const [numbers, ...grids] = input.split('\n\n')

  return [numbers.split(',').map(Number), ...grids.map(formatGrid)]
}

module.exports = { getBingos }
