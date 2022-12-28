const test = require('ava')
const $ = require('../../helpers')
const { debug } = require('./')

test('Day 16 — Solutions', t => {
  const input = $.readInput(__dirname, '\n\n')

  t.is(debug(input)[0], 627)
})
