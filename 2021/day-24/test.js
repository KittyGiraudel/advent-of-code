const test = require('ava')
const { run, resolve } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `inp x
mul x -1`.split('\n')

const sampleB = `inp z
inp x
mul z 3
eql z x`.split('\n')

test('Day 24 — Sample', t => {
  t.is(run(sampleA, [7]).x, -7)
  t.is(run(sampleB, [3, 8]).z, 0)
  t.is(run(sampleB, [3, 9]).z, 1)
})

test('Day 24 — Solutions', t => {
  t.is(resolve(input, true), 53999995829399)
  t.is(resolve(input, false), 11721151118175)
})
