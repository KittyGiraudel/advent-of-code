const $ = require('../../helpers')

const getTop = image => image[0]
const getBottom = image => image[image.length - 1]
const getLeft = image => image.map(row => row[0]).join('')
const getRight = image => image.map(row => row[row.length - 1]).join('')

// Read the variant of a tile at its record variant index.
// @param {Tile} tile - Tile to read the variant from
// @return {Image}
const readTile = tile => tile.variants[tile.actualVariantIndex]

// Check whether the right tile can fit next to the left tile.
// @param {Tile} left - Left tile (if any)
// @param {Tile} right - Right tile
// @return {Boolean}
const checkLeft = (left, right) =>
  !left || getRight(readTile(left)) === getLeft(readTile(right))

// Check whether the bottom tile can fit next to the top tile.
// @param {Tile} top - Top tile (if any)
// @param {Tile} bottom - Bottom tile
// @return {Boolean}
const checkTop = (top, bottom) =>
  !top || getTop(readTile(bottom)) === getBottom(readTile(top))

// Taken and reworked from:
// https://github.com/bylexus/adventofcode2020/blob/95998d0a55e17091f0d03ef108407a3d151a182f/20-jurassic-jigsaw.py#L98
const checkTile = (tiles, used, matrix, row, col, size) => {
  if (row >= size || col >= size) return true

  for (let tile of tiles) {
    if (used.has(tile.id)) continue

    used.add(tile.id)
    matrix[row][col] = tile

    for (let i = 0; i < tile.variants.length; i++) {
      tile.actualVariantIndex = i

      const leftFit = col > 0 ? checkLeft(matrix[row][col - 1], tile) : true
      const topFit = row > 0 ? checkTop(matrix[row - 1][col], tile) : true

      if (leftFit && topFit) {
        const nextCol = (col + 1) % size
        const nextRow = Math.floor((size * row + col + 1) / size)

        if (checkTile(tiles, used, matrix, nextRow, nextCol, size)) {
          tile.matchingVariantIndex = i
          return true
        }
      }

      tile.actualVariantIndex = null
    }

    matrix[row][col] = undefined
    used.delete(tile.id)
  }

  return false
}

const rotateMatrix = rows => {
  const cols = Array.isArray(rows[0]) ? rows[0] : rows[0].split('')

  return cols.map((_, col) =>
    rows
      .map(row => row[col])
      .reverse()
      .join('')
  )
}

// Flip a matrix along the vertical axis.
// @param {Matrix} matrix - Matrix to flip
// @return {Matrix}
const flip = matrix => {
  const out = $.grid.init(matrix.length)

  for (let row = 0; row < out.length; row++) {
    for (let col = 0; col < out.length; col++) {
      out[row][out.length - 1 - col] = matrix[row][col]
    }
  }

  return out.map(row => row.join(''))
}

// Rotate a matrix clockwise.
// @param {Matrix} matrix - Matrix to rotate
// @return {Matrix}
const rotate = (matrix, times = 1) => {
  for (let i = 0; i < times; i++) matrix = rotateMatrix(matrix)
  return matrix
}

// Compute the 8 variants (flipped and rotated) of an image.
// @param {Matrix} image - Image to compute the variants for
// @return {Matrix[]}
const getVariants = image =>
  [
    i => rotate(i, 4),
    i => rotate(i, 1),
    i => rotate(i, 2),
    i => rotate(i, 3),
    i => flip(i),
    i => rotate(flip(i), 1),
    i => rotate(flip(i), 2),
    i => rotate(flip(i), 3),
  ].map(fn => fn(image))

// Parse an image to extract its ID and its 8 variants (flipped and rotated).
// @param {String} input - Raw tile input
// @return {Object}
const parseImage = input => {
  const [header, ...rows] = input.split('\n')
  const id = +header.match(/Tile (\d+):/)[1]

  return { id, variants: getVariants(rows) }
}

const recompose = input => {
  const matrix = completeJigsaw(input)
  const width = matrix.length * (matrix[0][0].variants[0].length - 2)
  const image = $.grid.init(width)

  for (let ri = 0; ri < matrix.length; ri++) {
    const row = matrix[ri]

    for (let ci = 0; ci < row.length; ci++) {
      const { variants, matchingVariantIndex } = row[ci]
      const pixels = variants[matchingVariantIndex]
      const plen = pixels.length - 2

      for (let pri = 1; pri < pixels.length - 1; pri++) {
        for (let pci = 1; pci < pixels.length - 1; pci++) {
          image[ri * plen + pri - 1][ci * plen + pci - 1] = pixels[pri][pci]
        }
      }
    }
  }

  return image
}

// Get the relative coords of all the cells composing a monster from the tip of
// its head as the base cell.
// @param {Number} row - Row (Y)
// @param {Number} col - Col (X)
// @return {Number[][]}
const getMonsterShapeCoords = (row, col) => [
  [row, col],
  [row + 1, col],
  [row + 1, col + 1],
  [row + 1, col - 1],
  [row + 2, col - 2],
  [row + 2, col - 5],
  [row + 1, col - 6],
  [row + 1, col - 7],
  [row + 2, col - 8],
  [row + 2, col - 11],
  [row + 1, col - 12],
  [row + 1, col - 13],
  [row + 2, col - 14],
  [row + 2, col - 17],
  [row + 1, col - 18],
]

// Count all the sea cells (`#`).
// @param {Matrix} image - Image to count waves in
// @return {Number}
const countSeaCells = image =>
  image
    .map(a => a.join(''))
    .join('\n')
    .match(/#/g)?.length ?? 0

// Try to find monsters in every variant of the given image. In the one that has
// monsters, count the remaining amount of sea cells.
// @param {String[]} rawTiles - Raw unparsed tiles
// @return {Number}
const findMonsters = rawTiles => {
  const image = recompose(rawTiles)
  const variants = getVariants(image)
  const makeArray = image => image.map(row => row.split(''))

  return Math.min(
    ...variants.map(makeArray).map(image => {
      image.forEach((line, row) =>
        line.forEach((_, col) => {
          const shape = getMonsterShapeCoords(row, col)

          if (shape.every(coords => $.access(image, coords) === '#')) {
            shape.forEach(coord => (image[coord[0]][coord[1]] = 'X'))
          }
        })
      )

      return countSeaCells(image)
    })
  )
}

// Complete the jigsaw puzzle by finding the proper order and orientation of
// all tiles.
// @param {String[]} rawTiles - Raw unparsed tiles
// @return {Object[]}
const completeJigsaw = rawTiles => {
  const size = Math.sqrt(rawTiles.length)
  const matrix = $.grid.init(size)

  checkTile(rawTiles.map(parseImage), new Set(), matrix, 0, 0, size)

  return matrix
}

// Get the full image ID by multiplying the ID of the 4 corner tiles.
// @param {String[]} rawTiles - Raw unparsed tiles
// @return {Number}
const getFullImageId = rawTiles => {
  const size = Math.sqrt(rawTiles.length)
  const matrix = completeJigsaw(rawTiles)

  return $.product(
    [
      matrix[0][0],
      matrix[0][size - 1],
      matrix[size - 1][0],
      matrix[size - 1][size - 1],
    ].map(cell => cell.id)
  )
}

module.exports = { recompose, getFullImageId, findMonsters }
