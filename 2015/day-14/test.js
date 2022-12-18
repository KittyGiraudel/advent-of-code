const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample =
  `Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`.split(
    '\n'
  )

test('Day 14 — Sample', t => {
  t.is(run(sample, 1000)[0], 1120)
  t.is(run(sample, 1000)[1], 689)
})

test('Day 14 — Solutions', t => {
  t.deepEqual(run(input, 2503), [2655, 1059])
})
