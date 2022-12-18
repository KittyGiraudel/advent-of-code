const test = require('ava')
const { find } = require('./')
const input = require('../../helpers/readInput')(__dirname)

test.skip('Day 04 — Sample', t => {})

test('Day 04 — Solutions', t => {
  t.deepEqual(find(input), [4716, 117061])
})
