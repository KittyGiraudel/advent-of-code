import $ from '../../helpers'
import { Grid, Coords } from '../../types'

type Tile = {
  id: number
  grid: Grid<string>
  sides: string[]
}

// Terminology for this whole file:
// Snapshot:
//    A raw image block from the input file, starting with its header line
//    containing its ID.
// Tile:
//    A parsed snapshot with an ID, a grid, and 4 sides.
// Mozaic:
//    The square grid of tiles in the right orientation, yielded by solving
//    the jigsaw puzzle.
// Image:
//    The reassembled mozaic once the puzzle is complete (made by shaving off
//    the sides of every tile’s grid and putting them all together).
// Cell:
//    A single character value from a snapshot (either `#` or `.`).

// The pattern to find in the image for part 2. It’s just an array of vectors so
// it doesn’t *have* to be formatted like this, but I feel like it helps
// visualizing so why not.
// prettier-ignore
const MONSTER_PATTERN: Coords[] = [
                                                                 [-1,18],
[0,0],        [0,5],[0,6],         [0,11],[0,12],          [0,17],[0,18],[0,19],
    [1,1],[1,4],        [1,7],[1,10],          [1,13],[1,16],
]

// Get every side of the grid, ordered top -> right -> bottom -> left (which
// matters later on).
const getSides = (grid: Grid<string>) =>
  [
    /* Top    */ grid[0],
    /* Right  */ $.column(grid, grid.length - 1),
    /* Bottom */ grid.at(-1),
    /* Left   */ $.column(grid, 0),
  ].map(line => line!.join(''))

// Parse the snapshot into a collection of 8 variants (all rotations + flips
// possibilities).
const parseSnapshot = (snapshot: string) => {
  const [header, ...lines] = snapshot.split('\n')
  const [id] = header.match(/\d+/g)!
  const grid = $.grid.from<string>(lines)

  return $.grid
    .variants(grid)
    .map(grid => ({ sides: getSides(grid), grid, id: +id } as Tile))
}

// Brute-force the jigsaw in reading order (left-to-right and top-to-bottom)
// until completion or dead-end starting with the given tile in the top-left
// corner.
const jigsaw = (tiles: Tile[], start: Tile) => {
  // The mozaic is guaranteed to be a square, and its length is the square root
  // of the amount of tiles divided by 8 (since there are 8 variants per
  // snapshot). For instance, if there are 72 tiles, it means 9 snapshots, so a
  // 3x3 mozaic.
  const length = Math.sqrt(tiles.length / 8)
  const mozaic = $.grid.init<Tile>(length, length)
  const used = new Set()

  mozaic[0][0] = start
  used.add(start.id)

  for (let ri = 0; ri < mozaic.length; ri++) {
    for (let ci = 0; ci < mozaic[0].length; ci++) {
      if (ri === 0 && ci === 0) continue

      const left = $.grid.at(mozaic, [ri, ci - 1])
      const top = $.grid.at(mozaic, [ri - 1, ci])

      // Look amongst the tiles that are not used yet for one that matches the
      // top and left tiles (if any).
      const next = tiles.find(
        ({ id, sides }) =>
          !used.has(id) &&
          (!left || left.sides[1] === sides[3]) &&
          (!top || top.sides[2] === sides[0])
      )

      // If we could not find a tile here, that means previous pieces were
      // incorrect and we can abort.
      if (!next) return

      mozaic[ri][ci] = next
      used.add(next.id)
    }
  }

  return mozaic
}

const assemble = (mozaic: Grid<Tile>) => {
  const grid: Grid<string> = []

  // For every row of 3 tiles …
  for (let ri = 0; ri < mozaic.length; ri++) {
    const row = mozaic[ri]

    // Loop over the lines of the tiles, omitting the first and the last.
    for (let i = 1; i < row[0].grid.length - 1; i++) {
      grid.push(row.map(tile => tile.grid[i].slice(1, -1)).flat())
    }
  }

  return grid
}

const isMonsterTail = (image: Grid<string>, ri: number, ci: number) =>
  MONSTER_PATTERN.every(vector => {
    const coords = $.applyVector([ri, ci], vector)
    return $.grid.at(image, coords) === '#'
  })

// Count the amount of sea monsters in the given image.
const countMonsters = (image: Grid<string>) =>
  $.grid.reduce(
    image,
    (acc, _, ri, ci) => acc + +isMonsterTail(image, ri, ci),
    0
  )

// Iterate over all 8 variants of the given image (rotated and flipped) to find
// the maximum number of sea monsters that can be spotted. Then, computed how
// many `#` do not belong to a sea monster pattern.
const inspectWaters = (image: Grid<string>) => {
  const variants = $.grid.variants(image)
  const monsters = Math.max(...variants.map(countMonsters))
  const sharps = $.countInString(image.flat().join(''), '#')

  return sharps - monsters * MONSTER_PATTERN.length
}

// Compute the mozaic checksum by multiplying the ID of the 4 corner tiles.
const checksum = (mozaic: Grid<Tile>) => {
  const length = mozaic.length
  const corners: Coords[] = [
    /* Top left     */ [0, 0],
    /* Top right    */ [0, length - 1],
    /* Bottom left  */ [length - 1, 0],
    /* Bottom right */ [length - 1, length - 1],
  ]

  const ids = corners
    .map(coords => $.grid.at(mozaic, coords))
    .map(tile => tile.id)

  return $.product(ids)
}

// Given the raw collection of snapshots, find the right layout to reassemble
// the jigsaw puzzle (mozaic).
const solve = (snapshots: string[]) =>
  snapshots
    .map(parseSnapshot)
    .flat()
    .reduce<Grid<Tile> | null>(
      (acc, tile, _, tiles) => acc ?? jigsaw(tiles, tile) ?? null,
      null
    )

export const run = (snapshots: string[]) => {
  const mozaic = solve(snapshots)!
  const image = assemble(mozaic)

  return [checksum(mozaic), inspectWaters(image)]
}
