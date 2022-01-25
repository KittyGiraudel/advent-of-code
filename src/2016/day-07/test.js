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

test('Day 7.1', t => {
  t.is(run(sampleA, 'TLS'), 2)
})

test('Day 7.2', t => {
  t.is(run(sampleB, 'SSL'), 3)
})

test('Day 7 — Solutions', t => {
  t.is(run(input, 'TLS'), 118)
  t.is(run(input, 'SSL'), 260)
})
