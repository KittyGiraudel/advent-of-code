import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 09 — Sample', () => {
  const sample = $.sample(`
  London to Dublin = 464
  London to Belfast = 518
  Dublin to Belfast = 141
  `)

  assert.strictEqual(Math.min(...run(sample)), 605)
  assert.strictEqual(Math.max(...run(sample)), 982)
})

test('Day 09 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(Math.min(...run(input)), 207)
  assert.strictEqual(Math.max(...run(input)), 804)
})
