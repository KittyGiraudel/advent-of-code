import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 12 — Sample', () => {
  const sampleA = $.sample(`
  start-A
  start-b
  A-c
  A-b
  b-d
  A-end
  b-end
  `)

  const sampleB = $.sample(`
  dc-end
  HN-start
  start-kj
  dc-start
  dc-HN
  LN-dc
  HN-end
  kj-sa
  kj-HN
  kj-dc
  `)

  const sampleC = $.sample(`
  fs-end
  he-DX
  fs-he
  start-DX
  pj-DX
  end-zg
  zg-sl
  zg-pj
  pj-he
  RW-he
  fs-DX
  pj-RW
  zg-RW
  start-pj
  he-WI
  zg-he
  pj-fs
  start-RW
  `)

  assert.strictEqual(run(sampleA).length, 10)
  assert.strictEqual(run(sampleB).length, 19)
  assert.strictEqual(run(sampleA, true).length, 36)
  assert.strictEqual(run(sampleB, true).length, 103)
  assert.strictEqual(run(sampleC, true).length, 3509)
})

test('Day 12 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input).length, 4775)
  assert.strictEqual(run(input, true).length, 152_480)
})
