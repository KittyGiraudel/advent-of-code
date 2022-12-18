const test = require('ava')
const { steps, findRepeat } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`.split('\n')

const sampleB = `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`.split('\n')

test('Day 12 — Sample', t => {
  t.is(steps(sampleA, 100), 1940)
  t.is(findRepeat(sampleB), 2772)
  t.is(findRepeat(sampleA), 4686774924)
})

test('Day 12 — Solutions', t => {
  t.is(steps(input, 1000), 6849)
  t.is(findRepeat(input), 356658899375688)
})
