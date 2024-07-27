import $ from '../../helpers'

export const countVisibleTrees = (rows: string[]) => {
  const grid = $.Grid.fromRows(rows)

  return grid.filter((tree, [ri, ci]) => {
    const isLower = (t: string) => +t < +tree

    // Edge check
    if (ri === 0 || ci === 0) return true
    if (ri === grid.height - 1 || ci === grid.width - 1) return true

    // Left/right check
    if (grid.row(ri).slice(0, ci).every(isLower)) return true
    if (
      grid
        .row(ri)
        .slice(ci + 1)
        .every(isLower)
    )
      return true

    // Top/bottom check
    if (grid.column(ci).slice(0, ri).every(isLower)) return true
    if (
      grid
        .column(ci)
        .slice(ri + 1)
        .every(isLower)
    )
      return true

    return false
  }).length
}

export const getHighestScenicScore = (rows: string[]) => {
  const grid = $.Grid.fromRows(rows)

  return Math.max(
    ...grid.flatMap((tree, [ri, ci]) => {
      // Edge shortcut
      if (ri === 0 || ci === 0) return 0
      if (ri === grid.height - 1 || ci === grid.width - 1) return 0

      let top = 0
      let right = 0
      let bottom = 0
      let left = 0

      // Start from the previous row and move up until the edge or finding a
      // tree which is as tall or taller than the current tree.
      for (let row = ri - 1; row >= 0; row--) {
        top++
        if (grid.get([row, ci]) >= tree) break
      }

      // Start from the next column and move right until the edge or finding a
      // tree which is as tall or taller than the current tree.
      for (let col = ci + 1; col < grid.width; col++) {
        right++
        if (grid.get([ri, col]) >= tree) break
      }

      // Start from the next row and move down until the edge or finding a tree
      // which is as tall or taller than the current tree.
      for (let row = ri + 1; row < grid.height; row++) {
        bottom++
        if (grid.get([row, ci]) >= tree) break
      }

      // Start from the previous column and move left until the edge or finding
      // a tree which is as tall or taller than the current tree.
      for (let col = ci - 1; col >= 0; col--) {
        left++
        if (grid.get([ri, col]) >= tree) break
      }

      return top * right * bottom * left
    })
  )
}
