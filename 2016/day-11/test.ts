import test from 'ava'
import { Floors, run } from './'

test('Day 11 — Sample', t => {
  const sample: Floors = [['HM', 'LM'], ['HG'], ['LG'], []]
  t.is(run(sample), 11)
})

test('Day 11 — Solutions', t => {
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
  t.is(run(floorsA), 37)
  t.is(run(floorsB), 61)
})
