import test from 'ava'
import $ from '../../helpers'
import { draw, getInitialState, initComputer, render } from './'

test('Day 13 — Solutions', t => {
  const [input] = $.readInput(import.meta)
  const state = getInitialState(initComputer(input))
  const tiles = Array.from(state.board.values())
  const { score, board } = draw(input)

  t.is(tiles.filter(t => t === 2).length, 280)
  t.is(score, 13298)
})
