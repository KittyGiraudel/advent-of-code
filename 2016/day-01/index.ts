import $ from '../../helpers'
import { Coords, Point } from '../../types'

export const run = (steps: string[], part2: boolean = false) => {
  let map: Set<Point> = new Set()
  let position: Coords = [0, 0]
  let direction: Coords | undefined = $.turn.DIRECTIONS[0]
  let location: Coords | null = null

  steps.forEach(step => {
    const [turn] = step
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

  if (part2) return $.manhattan(location!, [0, 0])
  return $.manhattan(position, [0, 0])
}
