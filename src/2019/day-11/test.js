const test = require('ava')
const { paint, turn, move, render } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

const sample = `.....
.....
..^..
.....
.....`.split('\n')

test('Day 11.1', t => {
  t.is(turn({ orientation: 'UP' }, 0).orientation, 'LEFT')
  t.is(turn({ orientation: 'LEFT' }, 0).orientation, 'DOWN')
  t.is(turn({ orientation: 'DOWN' }, 0).orientation, 'RIGHT')
  t.is(turn({ orientation: 'RIGHT' }, 0).orientation, 'UP')
  t.is(turn({ orientation: 'UP' }, 1).orientation, 'RIGHT')
  t.is(turn({ orientation: 'RIGHT' }, 1).orientation, 'DOWN')
  t.is(turn({ orientation: 'DOWN' }, 1).orientation, 'LEFT')
  t.is(turn({ orientation: 'LEFT' }, 1).orientation, 'UP')
  t.deepEqual(move({ orientation: 'UP', position: [0, 0] }).position, [0, -1])
  t.deepEqual(move({ orientation: 'DOWN', position: [0, 0] }).position, [0, 1])
  t.deepEqual(move({ orientation: 'LEFT', position: [0, 0] }).position, [-1, 0])
  t.deepEqual(
    move({ orientation: 'RIGHT', position: [0, 0] }).position,
    [+1, 0]
  )
})

test.skip('Day 11.2', t => {})

test('Day 11 — Solutions', t => {
  const startOnBlack = paint(input, 0)
  const startOnWhite = paint(input, 1)

  t.is(Array.from(startOnBlack.keys()).length, 2160)
  // console.log(render(startOnWhite))
})
