const test = require('ava')
const { play } = require('./')

test('Day 9.1', t => {
  t.is(play(9, 25), 32)
  t.is(play(17, 1104), 2764)
  t.is(play(10, 1618), 8317)
  t.is(play(21, 6111), 54718)
  t.is(play(30, 5807), 37305)
  t.is(play(13, 7999), 146373)
})

test.skip('Day 9.2', t => {})

test('Day 9 — Solutions', t => {
  t.is(play(468, 71010), 374287)
  t.is(play(468, 71010 * 100), 3083412635)
})
