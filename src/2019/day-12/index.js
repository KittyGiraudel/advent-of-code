const $ = require('../../helpers')

const prepareMoon = line => ({
  position: line.match(/(-?\d+)/g).map(Number),
  velocity: [0, 0, 0],
})

const prepare = moons => moons.map(prepareMoon)

const applyPartialGravity = (axis, a, b) => {
  if (a.position[axis] > b.position[axis]) {
    a.velocity[axis]--
    b.velocity[axis]++
  } else if (a.position[axis] < b.position[axis]) {
    a.velocity[axis]++
    b.velocity[axis]--
  }
}

const applyGravity = ([a, b]) => {
  applyPartialGravity(0, a, b)
  applyPartialGravity(1, a, b)
  applyPartialGravity(2, a, b)
}

const applyVelocity = moon => {
  moon.position = $.applyVector(moon.position, moon.velocity)
}

const makePairs = array => $.combinations(array, 2)

const step = moons => {
  makePairs(moons).forEach(applyGravity)
  moons.forEach(applyVelocity)
  return moons
}

const calculateMoonEnergy = ({ position, velocity }) =>
  $.sum(position.map(Math.abs)) * $.sum(velocity.map(Math.abs))

const steps = (input, amount = 1) =>
  $.sum($.array(amount).reduce(step, prepare(input)).map(calculateMoonEnergy))

const serialize = (moons, axis) =>
  $.toPoint(moons.map(moon => moon.position[axis] + ';' + moon.velocity[axis]))

const findRepeatAxis = (axis, input) => {
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

const findRepeat = input =>
  [0, 1, 2]
    .map(axis => findRepeatAxis(axis, input))
    .reduce((acc, value) => $.lcm(acc, value), 1)

module.exports = { steps, findRepeat }
