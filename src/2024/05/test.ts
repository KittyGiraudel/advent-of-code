import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 05 — Sample', () => {
  const sample = $.sample(
    `
    47|53
    97|13
    97|61
    97|47
    75|29
    61|13
    75|53
    29|13
    97|29
    53|29
    61|53
    97|53
    61|29
    47|13
    75|47
    97|75
    47|61
    75|61
    47|29
    75|13
    53|13

    75,47,61,53,29
    97,61,53,29,13
    75,29,13
    75,97,47,61,53
    61,13,29
    97,13,75,29,47
  `,
    { delimiter: '\n\n' }
  ) as [string, string]

  assert.strictEqual(run(sample), 143)
  assert.strictEqual(run(sample, true), 123)
})

test('Day 05 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' }) as [
    string,
    string,
  ]
  assert.strictEqual(run(input), 6034)
  assert.strictEqual(run(input, true), 6305)
})
