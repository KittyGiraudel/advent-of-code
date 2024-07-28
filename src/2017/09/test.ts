import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 09 — Sample', () => {
  assert.strictEqual(run('{}').score, 1)
  assert.strictEqual(run('{{{}}}').score, 6)
  assert.strictEqual(run('{{},{}}').score, 5)
  assert.strictEqual(run('{{{},{},{{}}}}').score, 16)
  assert.strictEqual(run('{<a>,<a>,<a>,<a>}').score, 1)
  assert.strictEqual(run('{{<ab>},{<ab>},{<ab>},{<ab>}}').score, 9)
  assert.strictEqual(run('{{<!!>},{<!!>},{<!!>},{<!!>}}').score, 9)
  assert.strictEqual(run('{{<a!>},{<a!>},{<a!>},{<ab>}}').score, 3)
  assert.strictEqual(run('<>').chars, 0)
  assert.strictEqual(run('<random characters>').chars, 17)
  assert.strictEqual(run('<<<<>').chars, 3)
  assert.strictEqual(run('<{!>}>').chars, 2)
  assert.strictEqual(run('<!!>').chars, 0)
  assert.strictEqual(run('<!!>').chars, 0)
  assert.strictEqual(run('<{o"i!a,<{i<a>').chars, 10)
})

test('Day 09 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(run(input).score, 12_803)
  assert.strictEqual(run(input).chars, 6425)
})
