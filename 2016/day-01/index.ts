import $ from '../../helpers'
import { Coords, Point } from '../../types'

export const run = (steps: string[]): [number, number?] => {
  let map: Set<Point> = new Set()
  let position: Coords = [0, 0]
  let direction: Coords | undefined = $.turn.DIRECTIONS[0]
  let location: Coords | null = null

  steps.forEach(step => {
    const turn = step.slice(0, 1)
    let length = +step.slice(1)
    if (turn === 'L') direction = direction ? $.turn.left(direction) : undefined
    if (turn === 'R')
      direction = direction ? $.turn.right(direction) : undefined
    while (length--) {
      position = direction ? $.applyVector(position, direction) : position
      const point = $.toPoint(position)

      if (!location) {
        if (map.has(point)) location = position
        else map.add(point)
      }
    }
  })

  return [$.manhattan(position), location ? $.manhattan(location) : undefined]
}
