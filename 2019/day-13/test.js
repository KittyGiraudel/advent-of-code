const test = require('ava')
const { draw, getInitialState, initComputer, render } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

test.skip('Day 13 — Sample', t => {})

test('Day 13 — Solutions', t => {
  const state = getInitialState(initComputer(input))
  const tiles = Array.from(state.board.values())
  const { score, board } = draw(input)

  t.is(tiles.filter(t => t === 2).length, 280)
  t.is(score, 13298)
})
