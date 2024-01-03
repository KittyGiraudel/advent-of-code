import $ from './helpers'
import { Coords, Point } from './types'

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateWithPrim = (size = 20) => {
  const grid = new $.Grid(size, size, '#')

  const getNeighbors = (curr: Coords) =>
    $.bordering(curr).filter(next => grid.get(next))
  const isWall = (position: Coords | Point) => grid.get(position) === '#'
  const isWalkable = (position: Coords | Point) => grid.get(position) === '.'

  const start: Coords = [0, 0]
  const walls = getNeighbors(start)
  grid.set(start, '.')

  while (walls.length) {
    const index = random(0, walls.length - 1)
    const [wall] = walls.splice(index, 1)
    const neighbors = getNeighbors(wall)

    if (neighbors.filter(isWalkable).length === 1) {
      grid.set(wall, '.')
      walls.push(...neighbors.filter(isWall))
    }
  }

  grid.appendColumn(Array.from('#'.repeat(size)))
  grid.prependColumn(Array.from('#'.repeat(size)))
  grid.appendRow(Array.from('#'.repeat(size + 2)))
  grid.prependRow(Array.from('#'.repeat(size + 2)))

  grid.set([0, 1], '.').set(
    [
      size + 1,
      size -
        grid
          .row(-2)
          .slice(0)
          .reverse()
          .findIndex(cell => cell === '.') +
        1,
    ],
    '.'
  )

  console.log(grid.render())
}

generateWithPrim()
