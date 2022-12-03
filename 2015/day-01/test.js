const test = require('ava')
const { run } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

test.skip('Day 1.1', t => {})

test.skip('Day 1.2', t => {})

test('Day 1 — Solutions', t => {
  t.deepEqual(run(input), [232, 1783])
})
