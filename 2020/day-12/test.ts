import test from 'ava'
import $ from '../../helpers'
import { navigateLoose, navigateStrict } from '.'

test('Day 12 — Sample', t => {
  t.is(navigateLoose('F10,N3,F7,R90,F11'.split(',')), 25)
  t.is(navigateStrict('F10,N3,F7,R90,F11'.split(',')), 286)
})

test('Day 12 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(navigateLoose(input), 1631)
  t.is(navigateStrict(input), 58_606)
})
