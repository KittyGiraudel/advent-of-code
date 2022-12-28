const test = require('ava')
const $ = require('../../helpers')
const { paint } = require('./')

test('Day 11 — Solutions', t => {
  const [input] = $.readInput(__dirname)
  const startOnBlack = paint(input, 0)
  const startOnWhite = paint(input, 1)

  t.is(Array.from(startOnBlack.keys()).length, 2160)
})
