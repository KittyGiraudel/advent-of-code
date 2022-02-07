const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname).map(Number)

test('Day 17.1', t => {
  t.is(run([20, 15, 10, 5, 5], 25)[0], 4)
})

test.skip('Day 17.2', t => {
  t.is(run([20, 15, 10, 5, 5], 25)[1], 3)
})

test('Day 17 — Solutions', t => {
  t.deepEqual(run(input, 150), [654, 57])
})
