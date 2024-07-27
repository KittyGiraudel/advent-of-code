import test from 'ava'
import $ from '../../helpers'
import { findHighestGroup, findHighestGroups } from './'

test('Day 01 — Sample', t => {
  const sample = $.sample(
    `
    1000
    2000
    3000

    4000

    5000
    6000

    7000
    8000
    9000

    10000
    `,
    { delimiter: '\n\n' }
  )

  t.is(findHighestGroup(sample), 24_000)
  t.is(findHighestGroups(sample, 3), 45_000)
})

test('Day 01 — Solutions', t => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })

  t.is(findHighestGroup(input), 70_369)
  t.is(findHighestGroups(input, 3), 203_002)
})
