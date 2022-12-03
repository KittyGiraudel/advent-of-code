const fs = require('fs')
const test = require('ava')
const { decode, encode } = require('./')
const input = require('../../helpers/readInput')(__dirname)
const sample = fs
  .readFileSync(__dirname + '/sample.txt', 'utf8')
  .trim()
  .split('\n')

test('Day 8.1', t => {
  t.is(decode(sample), 12)
})

test('Day 8.2', t => {
  t.is(encode(sample), 19)
})

test('Day 8 — Solutions', t => {
  t.is(decode(input), 1350)
  t.is(encode(input), 2085)
})
