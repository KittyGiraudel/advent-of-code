import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 15 — Sample', () => {
  const sample = $.sample(
    'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7',
    { delimiter: ',' }
  )
  const sample2 = $.sample('HASH')

  assert.strictEqual(run(sample2), 52)
  assert.strictEqual(run(sample), 1320)
  assert.strictEqual(run(sample, true), 145)
})

test('Day 15 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: ',' })
  assert.strictEqual(run(input), 521_341)
  assert.strictEqual(run(input, true), 252_782)
})
