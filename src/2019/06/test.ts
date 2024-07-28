import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { countOrbits, countTransfers, createGraph } from './'

test('Day 06 — Sample', () => {
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

  assert.strictEqual(countOrbits(createGraph(sampleA)), 42)
  assert.strictEqual(countTransfers(createGraph(sampleB)), 4)
})

test('Day 06 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(countOrbits(createGraph(input)), 292_387)
  assert.strictEqual(countTransfers(createGraph(input)), 433)
})
