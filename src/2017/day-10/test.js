const test = require('ava')
const { run, getHash } = require('./')
const input = require('../../helpers/readInput')(__dirname, ',').map(Number)

test('Day 10.1', t => {
  t.is(run([3, 4, 1, 5], [0, 1, 2, 3, 4]), 12)
})

test('Day 10.2', t => {
  t.is(getHash(''), 'a2582a3a0e66e6e86e3812dcb672a272')
  t.is(getHash('AoC 2017'), '33efeb34ea91902bb2f59c9920caa6cd')
  t.is(getHash('1,2,3'), '3efbe78a8d82f29979031a4aa0b16a9d')
  t.is(getHash('1,2,4'), '63960835bcdc130f0b66d7ff4f6a5a8e')
})

test('Day 10 — Solutions', t => {
  t.is(run(input), 11375)
  t.is(getHash(input.join(',')), 'e0387e2ad112b7c2ef344e44885fe4d8')
})