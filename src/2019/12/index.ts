import $ from '../../helpers'
import type { TriCoords } from '../../types'

type Moon = {
  position: TriCoords
  velocity: TriCoords
}

const prepareMoon = (line: string): Moon => ({
  position: $.numbers(line) as TriCoords,
  velocity: [0, 0, 0],
})

const prepare = (moons: string[]) => moons.map(prepareMoon)

const applyPartialGravity = (axis: number, a: Moon, b: Moon) => {
  if (a.position[axis] > b.position[axis]) {
    a.velocity[axis]--
    b.velocity[axis]++
  } else if (a.position[axis] < b.position[axis]) {
    a.velocity[axis]++
    b.velocity[axis]--
  }
}

const applyGravity = ([a, b]: [Moon, Moon]) => {
  applyPartialGravity(0, a, b)
  applyPartialGravity(1, a, b)
  applyPartialGravity(2, a, b)
}

const applyVelocity = (moon: Moon) => {
  moon.position = $.applyVector(moon.position, moon.velocity)
}

const step = (moons: Moon[]) => {
  $.pairs(moons).forEach(moonPair => applyGravity(moonPair))
  moons.forEach(applyVelocity)
  return moons
}

const calculateMoonEnergy = ({ position, velocity }: Moon) =>
  $.sum(position.map(Math.abs)) * $.sum(velocity.map(Math.abs))

export const steps = (input: string[], amount = 1) =>
  $.sum($.array(amount).reduce(step, prepare(input)).map(calculateMoonEnergy))

const serialize = (moons: Moon[], axis: number) =>
  moons.map(moon => moon.position[axis] + ';' + moon.velocity[axis]).join(',')

const findRepeatAxis = (axis: number, input: string[]) => {
  // Compute the initial state and snapshot it. It’s the state we try to get
  // back to.
  let moons = prepare(input)
  const snapshot = serialize(moons, axis)
  // Immediately move to the next step outside of the loop and thus start the
  // counter at 1.
  let i = 1
  moons = step(moons)

  // While the current state of the analysed axis is not the same as the initial
  // state snapshot, keep iterating.
  while (serialize(moons, axis) !== snapshot) {
    moons = step(moons)
    i++
  }

  return i
}

export const findRepeat = (input: string[]) =>
  [0, 1, 2]
    .map(axis => findRepeatAxis(axis, input))
    .reduce((acc, value) => $.lcm(acc, value), 1)
