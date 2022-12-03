const test = require('ava')
const { getPaperMeasurements, getRibbonMeasurements } = require('./')
const input = require('../../helpers/readInput')(__dirname)

test('Day 2.1', t => {
  t.is(getPaperMeasurements(['2x3x4']), 58)
})

test('Day 2.2', t => {
  t.is(getRibbonMeasurements(['2x3x4']), 34)
})

test('Day 2 — Solutions', t => {
  t.is(getPaperMeasurements(input), 1586300)
  t.is(getRibbonMeasurements(input), 3737498)
})
