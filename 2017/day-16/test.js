const test = require('ava')
const { dance } = require('./')
const input = require('../../helpers/readInput')(__dirname, ',')

test('Day 16 — Sample', t => {
  t.is(dance('s1,x3/4,pe/b'.split(','), 5), 'baedc')
})

test('Day 16 — Solutions', t => {
  t.is(dance(input), 'ehdpincaogkblmfj')
  t.is(dance(input, 16, 1_000_000_000), 'bpcekomfgjdlinha')
})
