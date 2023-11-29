import $ from '../../helpers'
import { Coords } from '../../types'

type Moon = {
  position: Coords
  velocity: Coords
}

const prepareMoon = (line: string): Moon => ({
  position: line.match(/(-?\d+)/g).map(Number) as Coords,
  velocity: [0, 0, 0],
})

const prepare = (moons: Array<string>): Array<Moon> => moons.map(prepareMoon)

const applyPartialGravity = (axis: number, a: Moon, b: Moon): void => {
  if (a.position[axis] > b.position[axis]) {
    a.velocity[axis]--
    b.velocity[axis]++
  } else if (a.position[axis] < b.position[axis]) {
    a.velocity[axis]++
    b.velocity[axis]--
  }
}

const applyGravity = ([a, b]: [Moon, Moon]): void => {
  applyPartialGravity(0, a, b)
  applyPartialGravity(1, a, b)
  applyPartialGravity(2, a, b)
}

const applyVelocity = (moon: Moon): void => {
  moon.position = $.applyVector(moon.position, moon.velocity)
}

const makePairs = array => $.combinations(array, 2)

const step = (moons: Array<Moon>): Array<Moon> => {
  makePairs(moons).forEach(applyGravity)
  moons.forEach(applyVelocity)
  return moons
}

const calculateMoonEnergy = ({ position, velocity }: Moon): number =>
  $.sum(position.map(Math.abs)) * $.sum(velocity.map(Math.abs))

export const steps = (input: Array<string>, amount: number = 1): number =>
  $.sum($.array(amount).reduce(step, prepare(input)).map(calculateMoonEnergy))

const serialize = (moons: Array<Moon>, axis: number): string =>
  moons.map(moon => moon.position[axis] + ';' + moon.velocity[axis]).join(',')

const findRepeatAxis = (axis: number, input: Array<string>): number => {
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

export const findRepeat = (input: Array<string>): number =>
  [0, 1, 2]
    .map(axis => findRepeatAxis(axis, input))
    .reduce((acc, value) => $.lcm(acc, value), 1)
