const test = require('ava')
const { run } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

test('Day 8.1', t => {
  t.is(run('{}').score, 1)
  t.is(run('{{{}}}').score, 6)
  t.is(run('{{},{}}').score, 5)
  t.is(run('{{{},{},{{}}}}').score, 16)
  t.is(run('{<a>,<a>,<a>,<a>}').score, 1)
  t.is(run('{{<ab>},{<ab>},{<ab>},{<ab>}}').score, 9)
  t.is(run('{{<!!>},{<!!>},{<!!>},{<!!>}}').score, 9)
  t.is(run('{{<a!>},{<a!>},{<a!>},{<ab>}}').score, 3)
})

test('Day 8.2', t => {
  t.is(run('<>').chars, 0)
  t.is(run('<random characters>').chars, 17)
  t.is(run('<<<<>').chars, 3)
  t.is(run('<{!>}>').chars, 2)
  t.is(run('<!!>').chars, 0)
  t.is(run('<!!>').chars, 0)
  t.is(run('<{o"i!a,<{i<a>').chars, 10)
})

test('Day 8 — Solutions', t => {
  t.is(run(input).score, 12803)
  t.is(run(input).chars, 6425)
})
