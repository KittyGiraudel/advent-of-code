import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { type Path, run } from './'

const sortByScore = (a: Path, b: Path) => b.score - a.score
const sortByLength = (a: Path, b: Path) =>
  b.length - a.length || sortByScore(a, b)
const getBest = (bridges: Path[]) => bridges[0].score

test('Day 24 — Sample', () => {
  const sampleA = $.sample(`
  0/2
  2/2
  2/3
  3/4
  3/5
  0/1
  10/1
  9/10
  `)

  const outputA = run(sampleA)

  assert.strictEqual(getBest(outputA.sort(sortByScore)), 31)
  assert.strictEqual(getBest(outputA.sort(sortByLength)), 19)
})

test('Day 24 — Solutions', () => {
  const input = $.readInput(import.meta)
  const bridges = run(input)

  assert.strictEqual(getBest(bridges.sort(sortByScore)), 2006)
  assert.strictEqual(getBest(bridges.sort(sortByLength)), 1994)
})
