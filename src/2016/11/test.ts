import assert from 'node:assert'
import test from 'node:test'
import { type Floors, run } from './'

test('Day 11 — Sample', () => {
  const sample: Floors = [['HM', 'LM'], ['HG'], ['LG'], []]
  assert.strictEqual(run(sample), 11)
})

test('Day 11 — Solutions', () => {
  const floorsA: Floors = [
    ['PM', 'PG', 'SM', 'SG'],
    ['CM', 'CG', 'RM', 'RG', 'TG'],
    ['TM'],
    [],
  ]
  const floorsB: Floors = [
    ['PM', 'PG', 'SM', 'SG', 'EM', 'EG', 'DM', 'DG'],
    ['CM', 'CG', 'RM', 'RG', 'TG'],
    ['TM'],
    [],
  ]
  assert.strictEqual(run(floorsA), 37)
  assert.strictEqual(run(floorsB), 61)
})
