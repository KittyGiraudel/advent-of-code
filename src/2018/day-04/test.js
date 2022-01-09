const test = require('ava')
const { find } = require('./')
const input = require('../../helpers/readInput')(__dirname)

test.skip('Day 4.1', t => {})

test.skip('Day 3.2', t => {})

test('Day 4 — Solutions', t => {
  t.deepEqual(find(input), [4716, 117061])
})
