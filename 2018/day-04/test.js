const test = require('ava')
const $ = require('../../helpers')
const { find } = require('./')

test('Day 04 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.deepEqual(find(input), [4716, 117061])
})
