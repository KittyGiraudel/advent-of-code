import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { findHighestGroup, findHighestGroups } from './'

test('Day 01 — Sample', () => {
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

  assert.strictEqual(findHighestGroup(sample), 24_000)
  assert.strictEqual(findHighestGroups(sample, 3), 45_000)
})

test('Day 01 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })

  assert.strictEqual(findHighestGroup(input), 70_369)
  assert.strictEqual(findHighestGroups(input, 3), 203_002)
})
