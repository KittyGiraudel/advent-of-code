import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 12 — Sample', () => {
  assert.strictEqual(run('[1,2,3]'), 6)
  assert.strictEqual(run('{"a":2,"b":4}'), 6)
  assert.strictEqual(run('[-1,{"a":1}]'), 0)
  assert.strictEqual(run('[1,2,3]', true), 6)
  assert.strictEqual(run('[1,{"c":"red","b":2},3]', true), 4)
  assert.strictEqual(run('{"d":"red","e":[1,2,3,4],"f":5}', true), 0)
  assert.strictEqual(run('[1,"red",5]', true), 6)
})

test('Day 12 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(run(input), 156_366)
  assert.strictEqual(run(input, true), 96_852)
})
