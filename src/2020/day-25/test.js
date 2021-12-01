const test = require('ava')
const { getEncryptionKey } = require('.')
const [door, card] = require('../../helpers/readInput')(__dirname).map(Number)

test('Day 25.1', t => {
  t.is(getEncryptionKey(5764801, 17807724), 14897079)
})

// test('Day 25.2', t => {})

test('Day 25 — Solutions', t => {
  t.is(getEncryptionKey(door, card), 17980581)
})
