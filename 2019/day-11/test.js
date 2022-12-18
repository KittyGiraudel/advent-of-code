const test = require('ava')
const { paint, turn, move, render } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

const sample = `.....
.....
..^..
.....
.....`.split('\n')

test.skip('Day 11 — Sample', t => {})

test('Day 11 — Solutions', t => {
  const startOnBlack = paint(input, 0)
  const startOnWhite = paint(input, 1)

  t.is(Array.from(startOnBlack.keys()).length, 2160)
  // console.log(render(startOnWhite))
})
