import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { draw, getInitialState, initComputer } from './'

test('Day 13 — Solutions', () => {
  const [input] = $.readInput(import.meta)
  const state = getInitialState(initComputer(input))
  const tiles = Array.from(state.board.values())
  const { score, board } = draw(input)

  assert.strictEqual(tiles.filter(t => t === 2).length, 280)
  assert.strictEqual(score, 13_298)
})
