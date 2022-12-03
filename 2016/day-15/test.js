const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`.split('\n')

test('Day 15.1', t => {
  t.is(run(sample), 5)
})

test.skip('Day 15.2', t => {})

test('Day 15 — Solutions', t => {
  const extraDisk = 'Disc #7 has 11 positions; at time=0, it is at position 0.'
  t.is(run(input), 121834)
  t.is(run(input.concat(extraDisk)), 3208099)
})
