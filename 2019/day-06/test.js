const test = require('ava')
const $ = require('../../helpers')
const { createGraph, countOrbits, countTransfers, getPaths } = require('./')

test('Day 06 — Sample', t => {
  const sampleA = $.sample(`
  COM)B
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
  `)

  const sampleB = $.sample(`
  COM)B
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
  I)SAN
  `)

  t.is(countOrbits(createGraph(sampleA)), 42)
  t.is(countTransfers(createGraph(sampleB)), 4)
})

test('Day 06 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(countOrbits(createGraph(input)), 292387)
  t.is(countTransfers(createGraph(input)), 433)
})
