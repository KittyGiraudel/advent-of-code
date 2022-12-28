const test = require('ava')
const $ = require('../../helpers')
const { run, getData } = require('./')

test('Day 22 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input), 960)
  t.is(getData(input), 225)
})
