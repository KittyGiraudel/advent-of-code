import test from 'ava'
import { getEncryptionKey } from '.'
import $ from '../../helpers'

test('Day 25 — Sample', t => {
  t.is(getEncryptionKey(5_764_801, 17_807_724), 14_897_079)
})

test('Day 25 — Solutions', t => {
  const [door, card] = $.readInput(import.meta).map(Number)

  t.is(getEncryptionKey(door, card), 17_980_581)
})
