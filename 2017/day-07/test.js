const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 07 — Sample', t => {
  const sample = $.sample(`
  pbga (66)
  xhth (57)
  ebii (61)
  havc (66)
  ktlj (57)
  fwft (72) -> ktlj, cntj, xhth
  qoyq (66)
  padx (45) -> pbga, havc, qoyq
  tknk (41) -> ugml, padx, fwft
  jptl (61)
  ugml (68) -> gyxo, ebii, jptl
  gyxo (61)
  cntj (57)
  `)

  t.is(run(sample).root, 'tknk')
  t.is(run(sample).fix, 60)
})

test('Day 07 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input).root, 'vtzay')
  t.is(run(input).fix, 910)
})
