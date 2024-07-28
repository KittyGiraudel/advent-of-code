import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 11 — Sample', () => {
  assert.strictEqual(run('ne,ne,ne'.split(',')), 3)
  assert.strictEqual(run('ne,ne,sw,sw'.split(',')), 0)
  assert.strictEqual(run('ne,ne,s,s'.split(',')), 2)
  assert.strictEqual(run('se,sw,se,sw,sw'.split(',')), 3)
})

test('Day 11 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: ',' })

  // assert.strictEqual(run(input), 650)
  assert.strictEqual(run(input, true), 1465)
})
