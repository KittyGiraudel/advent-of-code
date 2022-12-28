const test = require('ava')
const $ = require('../../helpers')
const { draw, getInitialState, initComputer, render } = require('./')

test('Day 13 — Solutions', t => {
  const [input] = $.readInput(__dirname)
  const state = getInitialState(initComputer(input))
  const tiles = Array.from(state.board.values())
  const { score, board } = draw(input)

  t.is(tiles.filter(t => t === 2).length, 280)
  t.is(score, 13298)
})
