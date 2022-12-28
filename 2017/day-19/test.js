const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 19 — Sample', t => {
  const sample = $.sample(
    `
      |
      |  +--+
      A  |  C
  F---|----E|--+
      |  |  |  D
      +B-+  +--+`,
    '\n',
    false,
    false
  ).slice(1)

  t.is(run(sample)[0], 'ABCDEF')
  t.is(run(sample)[1], 38)
})

test('Day 19 — Solutions', t => {
  const input = $.readInput(__dirname, '\n', false)

  t.deepEqual(run(input), ['VTWBPYAQFU', 17358])
})
