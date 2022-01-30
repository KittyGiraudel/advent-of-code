const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `5-8
0-2
4-7`.split('\n')

test('Day 20.1', t => {
  t.is(run(sample, 9), 3)
})

test('Day 20.2', t => {
  t.is(run(sample, 9, true), 2)
})

test('Day 20 — Solutions', t => {
  t.is(run(input, 4294967295), 19449262)
  t.is(run(input, 4294967295, true), 119)
})

// Too high: 800436672
// Too high: 800436898
// Too high: 800437124
// Too high: 800437350
// Too high: 801988815
