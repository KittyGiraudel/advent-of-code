import $ from '../../helpers'
import { Grid, Coords } from '../../types'

type Blocks = Coords[]
type Rock = string[]

let DEBUG = false
const WIDTH = 7
const ROCKS: string[][] = [
  '####'.split('\n'),
  '.#.\n###\n.#.'.split('\n'),
  '..#\n..#\n###'.split('\n'),
  '#\n#\n#\n#'.split('\n'),
  '##\n##'.split('\n'),
]
const EMPTY_ROW = '.'.repeat(WIDTH)

const log = (...args: unknown[]) => DEBUG && console.log(...args)
const isRowEmpty = (row: string[]) => row && row.join('') === EMPTY_ROW

// This could be a bit more elegant (as in performant). Right now it drops every
// empty line at the top of the grid only to add back the right amount. It could
// figure out how many to add/remove instead but heh.
const adjustHeight = (grid: Grid<string>, rock: Rock) => {
  while (isRowEmpty(grid[0])) grid.shift()
  for (let i = 0; i < 3 + rock.length; i++) grid.unshift(EMPTY_ROW.split(''))

  return grid
}

const getBlocks = (rock: Rock) =>
  rock.flatMap((row, ri) =>
    Array.from(row)
      // So it took me a few hours to figure out that this was the missing part…
      // Only the non-empty spaces need to be checked for collision. I could
      // swear I handled empty spaces properly before (hence why I had the right
      // result on the sample), but there must have been something I didn’t
      // handle properly that only showed up in my input. Oh well.
      .map((col, ci) => (col === '.' ? null : ([ri, ci + 2] as Coords)))
      .filter(Boolean)
  ) as Blocks

const move = (grid: Grid<string>, blocks: Blocks, vector: Coords) => {
  const nextBlocks = blocks
    .map(block => $.applyVector(block, vector))
    .filter(nextCoords => $.access(grid, nextCoords) === '.')

  return blocks.length === nextBlocks.length ? nextBlocks : null
}

const moveSideways = (grid: Grid<string>, blocks: Blocks, side: string) =>
  move(grid, blocks, [0, side === '>' ? +1 : -1])

const moveDownwards = (grid: Grid<string>, blocks: Blocks) =>
  move(grid, blocks, [+1, 0])

const halt = (grid: Grid<string>, blocks: Blocks) => {
  blocks.forEach(coords => (grid[coords[0]][coords[1]] = '#'))
  return grid
}

const getHeight = (grid: Grid<string>) =>
  grid.filter(row => row.join('') !== EMPTY_ROW).length

const render = (grid: Grid<string>) => [log($.grid.render(grid)), log('')]

export const tetris = (input: string, count: number = 2022) => {
  const grid: Grid<string> = []
  const sideIndex = $.loopIndex(0, input.length - 1)

  for (let i = 0; i < count; i++) {
    const rock = ROCKS[i % ROCKS.length]

    // Adjust the height of the grid to account for the new rock.
    adjustHeight(grid, rock)

    // Retrieve the individual (non-empty) blocks from the new rock.
    let blocks = getBlocks(rock)

    // While the rock can move, keep moving it. First move it sideways (if it
    // can), then move it downwards. If it cannot move downwards, record it as
    // it reached its final position.
    while (true) {
      const sideways = moveSideways(grid, blocks, input[sideIndex.next().value])
      if (sideways) blocks = sideways

      const downwards = moveDownwards(grid, blocks)
      if (downwards) blocks = downwards
      else {
        halt(grid, blocks)
        break
      }
    }
  }

  return getHeight(grid)
}
