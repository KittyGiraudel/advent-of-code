import $ from '../../helpers'
import { Coords, Point } from '../../types'

type Particle = {
  position: Coords
  velocity: Coords
  acceleration: Coords
}

const tick = (particle: Particle): Particle => {
  particle.velocity[0] += particle.acceleration[0]
  particle.velocity[1] += particle.acceleration[1]
  particle.velocity[2]! += particle.acceleration[2]!
  particle.position[0] += particle.velocity[0]
  particle.position[1] += particle.velocity[1]
  particle.position[2]! += particle.velocity[2]!
  return particle
}

const sortByDistance = (a: Particle, b: Particle): number =>
  $.manhattan(b.position) - $.manhattan(a.position)

const countCollisions = (particles: Particle[]): number =>
  particles
    .map(particle => $.toPoint(particle.position))
    .reduce((acc, position, index, array) => {
      const match = array.indexOf(position)
      if (match !== index) acc.add(match).add(index)
      return acc
    }, new Set()).size

export const run = (input: Array<string>): [number, number] => {
  const particles = input.map((line, index) => {
    const [p, v, a] = line.split(', ')
    const position = $.toCoords(p.slice(3, -1) as Point)
    const velocity = $.toCoords(v.slice(3, -1) as Point)
    const acceleration = $.toCoords(a.slice(3, -1) as Point)

    return { index, position, velocity, acceleration }
  })

  let count = particles.length

  // 500 is an arbitrary upper bound. I guess a cleaner way would be to check
  // at which point the distance order would no longer change, but it might be
  // one of these cases where the check is more costly than the computation
  // itself.
  for (let i = 0; i < 500; i++) {
    count -= countCollisions(particles.map(tick))
  }

  return [particles.sort(sortByDistance).pop()!.index, count]
}
