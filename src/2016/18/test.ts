import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 18 — Sample', () => {
  assert.strictEqual(run('.^^.^.^^^^', 10), 38)
})

test('Day 18 — Solutions', () => {
  const input =
    '...^^^^^..^...^...^^^^^^...^.^^^.^.^.^^.^^^.....^.^^^...^^^^^^.....^.^^...^^^^^...^.^^^.^^......^^^^'

  assert.strictEqual(run(input, 40), 1982)
  assert.strictEqual(run(input, 400_000), 20_005_203)
})
