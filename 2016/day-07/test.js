const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 07 — Sample', t => {
  const sampleA = $.sample(`
  abba[mnop]qrst
  abcd[bddb]xyyx
  aaaa[qwer]tyui
  ioxxoj[asdfgh]zxcvbn
  `)

  const sampleB = $.sample(`
  aba[bab]xyz
  xyx[xyx]xyx
  aaa[kek]eke
  zazbz[bzb]cdb
  `)

  t.is(run(sampleA, 'TLS'), 2)
  t.is(run(sampleB, 'SSL'), 3)
})

test('Day 07 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input, 'TLS'), 118)
  t.is(run(input, 'SSL'), 260)
})
