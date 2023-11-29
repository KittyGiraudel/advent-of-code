import $ from '../../helpers'
import Circularray from 'circularray'

// Usage of a double-ended queue inspired by this comment on Reddit.
// https://www.reddit.com/r/adventofcode/comments/a4i97s/2018_day_9_solutions/
export const play = (players: number, max: number) => {
  const scores = $.array(players).map(() => 0)
  const circle = new Circularray([0])

  for (let marble = 1; marble <= max; marble++) {
    // If the marble is a multiple of 23, rotate the circle 7 items counter-
    // clockwise, score that marble, then rotate it again by 1 marble clockwise
    // for the next iteration. Otherwise, rotate the circle clockwise by 1, and
    // insert the new marble there.
    if (marble % 23 === 0) {
      circle.rotate(7)
      scores[marble % players] += marble + circle.pop()
      circle.rotate(-1)
    } else {
      circle.rotate(-1).push(marble)
    }
  }

  // Preserving my original implementation for posterity, which is pretty
  // similar to the final one, except it splices instead of push/pop-ing, which
  // is significantly slower. A linked listed is the way to go.
  /*
  const circle = [0]
  let curr = 0

  for (let marble = 1; marble <= max; marble++) {
    if (marble % 23 === 0) {
      curr = curr < 7 ? circle.length + (curr - 7) : curr - 7
      scores[marble % players] += marble + circle.splice(curr, 1).pop()
    } else {
      const next = (curr + 2) % circle.length
      curr = next || circle.length
      if (next) circle.splice(next, 0, marble)
      else circle.push(marble)
    }
  }
  */

  return Math.max(...scores)
}
