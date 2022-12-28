const test = require('ava')
const $ = require('../../helpers')
const { getEncryptionKey } = require('.')

test('Day 25 — Sample', t => {
  t.is(getEncryptionKey(5764801, 17807724), 14897079)
})

test('Day 25 — Solutions', t => {
  const [door, card] = $.readInput(__dirname).map(Number)

  t.is(getEncryptionKey(door, card), 17980581)
})
