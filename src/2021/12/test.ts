import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 12 — Sample', t => {
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

  t.is(run(sampleA).length, 10)
  t.is(run(sampleB).length, 19)
  t.is(run(sampleA, true).length, 36)
  t.is(run(sampleB, true).length, 103)
  t.is(run(sampleC, true).length, 3509)
})

test('Day 12 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input).length, 4775)
  t.is(run(input, true).length, 152_480)
})
