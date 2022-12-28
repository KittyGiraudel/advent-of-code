const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 23 — Sample', t => {
  const sample = $.sample(`
  cpy 2 a
  tgl a
  tgl a
  tgl a
  cpy 1 a
  dec a
  dec a
  `)

  t.is(run(sample), 3)
})

test('Day 23 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input, 7), 11739)
  // t.is(run(input, 12), 479008299) // Takes several minutes…
})
