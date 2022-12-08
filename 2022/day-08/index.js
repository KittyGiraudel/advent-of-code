const $ = require('../../helpers')

const countVisibleTrees = rows => {
  const grid = $.grid.create(rows)
  const height = grid.length
  const width = grid[0].length

  return $.grid
    .flatMap(grid, (tree, ri, ci) => {
      const isSmaller = t => t < tree

      // Edge check
      if (ri === 0 || ci === 0) return true
      if (ri === height - 1 || ci === width - 1) return true

      // Left/right check
      if (grid[ri].slice(0, ci).every(isSmaller)) return true
      if (grid[ri].slice(ci + 1).every(isSmaller)) return true

      // Top/bottom check
      if ($.column(grid.slice(0, ri), ci).every(isSmaller)) return true
      if ($.column(grid.slice(ri + 1), ci).every(isSmaller)) return true

      return false
    })
    .filter(Boolean).length
}

const getHighestScenicScore = rows => {
  const grid = $.grid.create(rows)
  const height = grid.length
  const width = grid[0].length

  return Math.max(
    ...$.grid.flatMap(grid, (tree, ri, ci) => {
      // Edge shortcut
      if (ri === 0 || ci === 0) return 0
      if (ri === height - 1 || ci === width - 1) return 0

      let top = (right = bottom = left = 0)

      // Start from the previous row and move up until the edge or finding a
      // tree which is as tall or taller than the current tree.
      for (let row = ri - 1; row >= 0; row--) {
        top++
        if ($.access(grid, [row, ci]) >= tree) break
      }

      // Start from the next column and move right until the edge or finding a
      // tree which is as tall or taller than the current tree.
      for (let col = ci + 1; col < width; col++) {
        right++
        if ($.access(grid, [ri, col]) >= tree) break
      }

      // Start from the next row and move down until the edge or finding a tree
      // which is as tall or taller than the current tree.
      for (let row = ri + 1; row < height; row++) {
        bottom++
        if ($.access(grid, [row, ci]) >= tree) break
      }

      // Start from the previous column and move left until the edge or finding
      // a tree which is as tall or taller than the current tree.
      for (let col = ci - 1; col >= 0; col--) {
        left++
        if ($.access(grid, [ri, col]) >= tree) break
      }

      return top * right * bottom * left
    })
  )
}

module.exports = { countVisibleTrees, getHighestScenicScore }
