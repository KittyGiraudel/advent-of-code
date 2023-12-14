import test from 'ava'
import { run } from './'

test('Day 18 — Sample', t => {
  t.is(run('.^^.^.^^^^', 10), 38)
})

test('Day 18 — Solutions', t => {
  const input =
    '...^^^^^..^...^...^^^^^^...^.^^^.^.^.^^.^^^.....^.^^^...^^^^^^.....^.^^...^^^^^...^.^^^.^^......^^^^'

  t.is(run(input, 40), 1982)
  t.is(run(input, 400_000), 20_005_203)
})
