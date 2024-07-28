import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 07 — Sample', () => {
  const sample = $.sample(`
  pbga (66)
  xhth (57)
  ebii (61)
  havc (66)
  ktlj (57)
  fwft (72) -> ktlj, cntj, xhth
  qoyq (66)
  padx (45) -> pbga, havc, qoyq
  tknk (41) -> ugml, padx, fwft
  jptl (61)
  ugml (68) -> gyxo, ebii, jptl
  gyxo (61)
  cntj (57)
  `)

  assert.strictEqual(run(sample).root, 'tknk')
  assert.strictEqual(run(sample).fix, 60)
})

test('Day 07 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input).root, 'vtzay')
  assert.strictEqual(run(input).fix, 910)
})
