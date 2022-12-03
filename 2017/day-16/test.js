const test = require('ava')
const { dance } = require('./')
const input = require('../../helpers/readInput')(__dirname, ',')

test('Day 16.1', t => {
  t.is(dance('s1,x3/4,pe/b'.split(','), 5), 'baedc')
})

test.skip('Day 16.2', t => {})

test('Day 16 — Solutions', t => {
  t.is(dance(input), 'ehdpincaogkblmfj')
  t.is(dance(input, 16, 1_000_000_000), 'bpcekomfgjdlinha')
})
