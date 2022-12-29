import test from 'ava'
import $ from '../../helpers'
import { paint } from './'

test('Day 11 — Solutions', t => {
  const [input] = $.readInput(import.meta)
  const startOnBlack = paint(input, 0)
  const startOnWhite = paint(input, 1)

  t.is(Array.from(startOnBlack.keys()).length, 2160)
})
