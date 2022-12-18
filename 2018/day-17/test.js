const test = require('ava')
const { scan } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`.split('\n')

test('Day 16 — Sample', t => {
  const counts = scan(sampleA)
  t.is(counts[0] + counts[1], 57)
  t.is(counts[0], 29)
})

test.only('Day 16 — Solutions', t => {
  const counts = scan(input)
  t.is(counts[0] + counts[1], 41027)
  t.is(counts[0], 34214)
})
