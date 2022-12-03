const test = require('ava')
const { createGraph, countOrbits, countTransfers, getPaths } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`.split('\n')

const sampleB = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`.split('\n')

test('Day 6.1', t => {
  t.is(countOrbits(createGraph(sampleA)), 42)
})

test('Day 6.2', t => {
  t.is(countTransfers(createGraph(sampleB)), 4)
})

test('Day 6 — Solutions', t => {
  t.is(countOrbits(createGraph(input)), 292387)
  t.is(countTransfers(createGraph(input)), 433)
})
