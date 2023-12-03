import $ from '../../helpers'

export const countVisibleTrees = (rows: string[]) => {
  const grid = $.grid.from<string>(rows)
  const { width, height } = $.grid.dimensions(grid)

  return $.grid
    .flatMap(grid, (tree, ri, ci) => {
      const isSmaller = (t: string) => +t < +tree

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

export const getHighestScenicScore = (rows: string[]) => {
  const grid = $.grid.from<string>(rows)
  const { width, height } = $.grid.dimensions(grid)

  return Math.max(
    ...$.grid.flatMap(grid, (tree, ri, ci) => {
      // Edge shortcut
      if (ri === 0 || ci === 0) return 0
      if (ri === height - 1 || ci === width - 1) return 0

      let top = 0
      let right = 0
      let bottom = 0
      let left = 0

      // Start from the previous row and move up until the edge or finding a
      // tree which is as tall or taller than the current tree.
      for (let row = ri - 1; row >= 0; row--) {
        top++
        if ($.grid.at(grid, [row, ci]) >= tree) break
      }

      // Start from the next column and move right until the edge or finding a
      // tree which is as tall or taller than the current tree.
      for (let col = ci + 1; col < width; col++) {
        right++
        if ($.grid.at(grid, [ri, col]) >= tree) break
      }

      // Start from the next row and move down until the edge or finding a tree
      // which is as tall or taller than the current tree.
      for (let row = ri + 1; row < height; row++) {
        bottom++
        if ($.grid.at(grid, [row, ci]) >= tree) break
      }

      // Start from the previous column and move left until the edge or finding
      // a tree which is as tall or taller than the current tree.
      for (let col = ci - 1; col >= 0; col--) {
        left++
        if ($.grid.at(grid, [ri, col]) >= tree) break
      }

      return top * right * bottom * left
    })
  )
}
