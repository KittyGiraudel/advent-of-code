const test = require('ava')
const { run } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

test.skip('Day 01 — Sample', t => {})

test('Day 01 — Solutions', t => {
  t.deepEqual(run(input), [232, 1783])
})
