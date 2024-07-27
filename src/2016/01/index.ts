import $ from '../../helpers'
import type { Coords, Point } from '../../types'

export const run = (steps: string[], part2 = false) => {
  const map = new Set<Point>()
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

  return $.manhattan((part2 ? location : position)!, [0, 0])
}
