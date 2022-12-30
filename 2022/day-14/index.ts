import $ from '../../helpers'
import { Point } from '../../types'

const BLOCK = '#'
const SAND = 'o'

class Cave {
  map: Map<Point, string>
  minY: number
  maxY: number
  minX: number
  maxX: number

  constructor(walls, withFloor = false) {
    // My first version was using a 2D grid to store the data, which was pretty
    // convenient to debug the code since I could print it to visualize the
    // cave. However, it turned out to be unsurprisingly super slow so I
    // refactored it using a map to speed up lookups.
    //
    // Worth mentioning that there is also this nice Python implementation on
    // Reddit which skips the lookup at all for part 2 and compute the amount of
    // sand by doing math line by line, which is neat. I actually re-implemented
    // it in JS before landing on a Map() so I can confirm it works (and is very
    // fast).
    // Ref: Ref: https://github.com/PBearson/Advent_Of_Code_2022/blob/main/day_14/infinite_floor_fast.py
    this.map = new Map()

    // Compute the boundaries while considering the position of the source as
    // well.
    const [minX, maxX, minY, maxY] = $.boundaries(walls.flat())

    // If the floor should be added (part 2), update the boundaries to reflect
    // the position of the floor, then add a block at the bottom left and bottom
    // right corners so the floor gets drawn as well with `erectWalls()`.
    if (withFloor) {
      this.minY = 0
      this.maxY = maxY + 2
      this.minX = 500 - this.maxY
      this.maxX = 500 + this.maxY

      walls.push([
        [this.minX, this.maxY],
        [this.maxX, this.maxY],
      ])
    } else {
      this.minX = minX
      this.maxX = maxX
      this.minY = 0
      this.maxY = maxY
    }

    // Erect all the walls based on the input data (and added floor if needed).
    this.erectWalls(walls)
  }

  erectWalls(walls) {
    walls.forEach(wall => {
      wall.forEach(([x, y], index) => {
        // Mark the current cell as a wall brick.
        this.set(x, y, BLOCK)

        if (index === 0) return

        // If not the first wall brick of the line, read the position of the
        // previous wall brick and mark every slot between the two as bricks.
        const prev = wall[index - 1]

        // Vertical walls of rocks
        if (prev[1] === y) {
          const min = Math.min(prev[0], x)
          const max = Math.max(prev[0], x)
          for (let i = min; i < max; i++) this.set(i, y, BLOCK)
        }

        // Horizontal walls of rocks
        else if (prev[0] === x) {
          const min = Math.min(prev[1], y)
          const max = Math.max(prev[1], y)
          for (let i = min; i < max; i++) this.set(x, i, BLOCK)
        }
      })
    })

    return this
  }

  get(x: number, y: number): string {
    return this.map.get(x + ',' + y)
  }

  set(x: number, y: number, value: string) {
    this.map.set(x + ',' + y, value)
    return this
  }

  fill(source: [number, number]) {
    // For as long as we can pour more sand into the cave, do it.
    while (this.fillAt(...source)) {}

    return this
  }

  fillAt(x: number, y: number) {
    // Respectively part 1 and part 2 loop breakers: whether we have reached the
    // abyss (out of bounds), or whether we’ve completed the mountain (source).
    if (y >= this.maxY || this.get(x, y) === 'o') return null

    // Check the south, south-west, south-east cells in that order and fill the
    // first one that’s empty. If none is, mark the current cell as resting.
    if (!this.get(x, y + 1)) return this.fillAt(x, y + 1)
    else if (!this.get(x - 1, y + 1)) return this.fillAt(x - 1, y + 1)
    else if (!this.get(x + 1, y + 1)) return this.fillAt(x + 1, y + 1)
    else return this.set(x, y, SAND)
  }

  count(): number {
    return Array.from(this.map.values()).filter(v => v === SAND).length
  }
}

export const countSandUnits = (input: string[], withFloor: boolean): number => {
  const walls = input.map(wall => wall.split(' -> ').map($.toCoords))
  const cave = new Cave(walls, withFloor)

  return cave.fill([500, 0]).count()
}
