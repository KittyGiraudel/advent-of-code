import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 05 — Sample', () => {
  assert.strictEqual(run(['ugknbfddgicrmopn']), 1)
  assert.strictEqual(run(['aaa']), 1)
  assert.strictEqual(run(['jchzalrnumimnmhp']), 0)
  assert.strictEqual(run(['haegwjzuvuyypxyu']), 0)
  assert.strictEqual(run(['dvszwmarrgswjxmb']), 0)
  assert.strictEqual(run(['qjhvhtzxzqqjkmpb'], true), 1)
  assert.strictEqual(run(['xxyxx'], true), 1)
  assert.strictEqual(run(['uurcxstgmygtbstg'], true), 0)
  assert.strictEqual(run(['ieodomkazucvgmuy'], true), 0)
})

test('Day 05 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 255)
  assert.strictEqual(run(input, true), 55)
})
