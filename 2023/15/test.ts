import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 15 — Sample', t => {
  const sample = $.sample(
    'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7',
    { delimiter: ',' }
  )
  const sample2 = $.sample('HASH')

  t.is(run(sample2), 52)
  t.is(run(sample), 1320)
  t.is(run(sample, true), 145)
})

test('Day 15 — Solutions', t => {
  const input = $.readInput(import.meta, { delimiter: ',' })
  t.is(run(input), 521_341)
  t.is(run(input, true), 252_782)
})
