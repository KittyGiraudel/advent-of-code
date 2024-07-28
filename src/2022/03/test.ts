import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { process, processGroups } from './'

test('Day 03 — Sample', () => {
  const sample = $.sample(`
  vJrwpWtwJgWrhcsFMMfFFhFp
  jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
  PmmdzqPrVvPwwTWBwg
  wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
  ttgJtRGJQctTZtZT
  CrZsJsPPZsGzwwsLwLmpwMDw
  `)

  assert.strictEqual(process(sample), 157)
  assert.strictEqual(processGroups(sample), 70)
})

test('Day 03 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(process(input), 8394)
  assert.strictEqual(processGroups(input), 2413)
})
