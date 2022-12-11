const $ = require('../../helpers')

const run = steps => {
  let map = new Set()
  let position = [0, 0]
  let direction = $.turn.DIRECTIONS[0]
  let location = null

  steps.forEach(step => {
    const turn = step.slice(0, 1)
    let length = +step.slice(1)
    if (turn === 'L') direction = $.turn.left(direction)
    if (turn === 'R') direction = $.turn.right(direction)
    while (length--) {
      position = $.applyVector(position, direction)
      const point = $.toPoint(position)

      if (!location) {
        if (map.has(point)) location = position
        else map.add(point)
      }
    }
  })

  return [$.manhattan(position), location && $.manhattan(location)]
}

module.exports = { run }