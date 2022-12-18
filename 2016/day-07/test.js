const test = require('ava')
const { run, run2 } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn`.split('\n')

const sampleB = `aba[bab]xyz
xyx[xyx]xyx
aaa[kek]eke
zazbz[bzb]cdb`.split('\n')

test('Day 07 — Sample', t => {
  t.is(run(sampleA, 'TLS'), 2)
  t.is(run(sampleB, 'SSL'), 3)
})

test('Day 07 — Solutions', t => {
  t.is(run(input, 'TLS'), 118)
  t.is(run(input, 'SSL'), 260)
})
