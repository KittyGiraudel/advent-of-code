import test from 'ava'
import $ from '../../helpers'
import { getEncryptionKey } from '.'

test('Day 25 — Sample', t => {
  t.is(getEncryptionKey(5764801, 17807724), 14897079)
})

test('Day 25 — Solutions', t => {
  const [door, card] = $.readInput(import.meta).map(Number)

  t.is(getEncryptionKey(door, card), 17980581)
})
