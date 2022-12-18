const test = require('ava')
const { run } = require('./')
const input =
  '...^^^^^..^...^...^^^^^^...^.^^^.^.^.^^.^^^.....^.^^^...^^^^^^.....^.^^...^^^^^...^.^^^.^^......^^^^'

test('Day 18 — Sample', t => {
  t.is(run('.^^.^.^^^^', 10), 38)
})

test('Day 18 — Solutions', t => {
  t.is(run(input, 40), 1982)
  t.is(run(input, 400_000), 20005203)
})
