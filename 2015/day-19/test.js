const test = require('ava')
const { calibrate, recompose } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `H => HO
H => OH
O => HH

HOH`.split('\n')

const sampleB = `H => HO
H => OH
O => HH

HOHOHO`.split('\n')

const sampleC = `e => H
e => O
H => HO
H => OH
O => HH

HOH`.split('\n')

const sampleD = `e => H
e => O
H => HO
H => OH
O => HH

HOHOHO`.split('\n')

test('Day 19 — Sample', t => {
  t.is(calibrate(sampleA), 4)
  t.is(calibrate(sampleB), 7)
})

test('Day 19 — Solutions', t => {
  t.is(calibrate(input), 509)
  t.is(recompose(input), 195)
})
