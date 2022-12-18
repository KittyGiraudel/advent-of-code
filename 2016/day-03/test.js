const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

test.skip('Day 03 — Sample', t => {})

test('Day 03 — Solutions', t => {
  t.deepEqual(run(input), [862, 1577])
})
