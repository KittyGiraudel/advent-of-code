import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 04 — Sample', t => {
  const sample = $.sample(`
  aaaaa-bbb-z-y-x-123[abxyz]
  a-b-c-d-e-f-g-h-987[abcde]
  not-a-real-room-404[oarel]
  totally-real-room-200[decoy]
  `)

  t.is(run(sample), 1514)
})

test('Day 04 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 409_147)
  t.is(run(input, true), 991)
})
