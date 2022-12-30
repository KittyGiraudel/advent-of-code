import test from 'ava'
import $ from '../../helpers'
import { checksum, findId } from './'

test('Day 02 — Sample', t => {
  t.is(
    checksum([
      'abcdef',
      'bababc',
      'abbcde',
      'abcccd',
      'aabcdd',
      'abcdee',
      'ababab',
    ]),
    12
  )
})

test('Day 02 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(checksum(input), 6916)
  t.is(findId(input), 'oeylbtcxjqnzhgyylfapviusr')
})
