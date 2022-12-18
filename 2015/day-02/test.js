const test = require('ava')
const { getPaperMeasurements, getRibbonMeasurements } = require('./')
const input = require('../../helpers/readInput')(__dirname)

test('Day 02 — Sample', t => {
  t.is(getPaperMeasurements(['2x3x4']), 58)
  t.is(getRibbonMeasurements(['2x3x4']), 34)
})

test('Day 02 — Solutions', t => {
  t.is(getPaperMeasurements(input), 1586300)
  t.is(getRibbonMeasurements(input), 3737498)
})
