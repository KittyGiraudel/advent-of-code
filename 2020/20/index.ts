import $ from '../../helpers'
import { Coords, Grid } from '../../types'

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
    /* Top    */ grid.row(0),
    /* Right  */ grid.column(-1),
    /* Bottom */ grid.row(-1),
    /* Left   */ grid.column(0),
  ].map(line => line!.join(''))

// Parse the snapshot into a collection of 8 variants (all rotations + flips
// possibilities).
const parseSnapshot = (snapshot: string) => {
  const [header, ...lines] = snapshot.split('\n')
  const [id] = $.numbers(header)
  const grid = $.Grid.fromRows(lines)

  return grid
    .variants()
    .map(grid => ({ sides: getSides(grid), grid, id } as Tile))
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
  const mozaic = new $.Grid<Tile>(length, length)
  const used = new Set<number>()

  mozaic.set([0, 0], start)
  used.add(start.id)

  for (let ri = 0; ri < mozaic.height; ri++) {
    for (let ci = 0; ci < mozaic.width; ci++) {
      if (ri === 0 && ci === 0) continue

      const left = mozaic.get([ri, ci - 1])
      const top = mozaic.get([ri - 1, ci])

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
      if (!next) return null

      mozaic.set([ri, ci], next)
      used.add(next.id)
    }
  }

  return mozaic
}

const assemble = (mozaic: Grid<Tile>) => {
  const grid = new $.Grid<string>(0)

  // For every row of 3 tiles …
  for (let ri = 0; ri < mozaic.height; ri++) {
    const row = mozaic.rows[ri]

    // Loop over the lines of the tiles, omitting the first and the last.
    for (let i = 1; i < row[0].grid.height - 1; i++) {
      grid.appendRow(row.map(tile => tile.grid.row(i).slice(1, -1)).flat())
    }
  }

  return grid
}

const isMonsterTail = (image: Grid<string>, coords: Coords) =>
  MONSTER_PATTERN.every(
    vector => image.get($.applyVector(coords, vector)) === '#'
  )

// Count the amount of sea monsters in the given image.
const countMonsters = (image: Grid<string>) =>
  image.reduce((acc, _, coords) => acc + +isMonsterTail(image, coords), 0)

// Iterate over all 8 variants of the given image (rotated and flipped) to find
// the maximum number of sea monsters that can be spotted. Then, computed how
// many `#` do not belong to a sea monster pattern.
const inspectWaters = (image: Grid<string>) => {
  const variants = image.variants()
  const monsters = Math.max(...variants.map(countMonsters))
  const sharps = $.countInString(image.flat().join(''), '#')

  return sharps - monsters * MONSTER_PATTERN.length
}

// Compute the mozaic checksum by multiplying the ID of the 4 corner tiles.
const checksum = (mozaic: Grid<Tile>) => {
  const corners: Coords[] = [
    /* Top left     */ [0, 0],
    /* Top right    */ [0, mozaic.width - 1],
    /* Bottom left  */ [mozaic.height - 1, 0],
    /* Bottom right */ [mozaic.height - 1, mozaic.width - 1],
  ]

  const ids = corners.map(coords => mozaic.get(coords)).map(tile => tile.id)

  return $.product(ids)
}

// Given the raw collection of snapshots, find the right layout to reassemble
// the jigsaw puzzle (mozaic).
const solve = (snapshots: string[]) =>
  snapshots
    .map(parseSnapshot)
    .flat()
    .reduce<Grid<Tile> | null>(
      (acc, tile, _, tiles) => acc ?? jigsaw(tiles, tile),
      null
    )

export const run = (snapshots: string[]) => {
  const mozaic = solve(snapshots)

  if (!mozaic) {
    throw new Error('Could not solve the mozaic')
  }

  return [checksum(mozaic), inspectWaters(assemble(mozaic))]
}
