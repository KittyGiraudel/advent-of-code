const test = require('ava')
const { proceed, proceedWithAim } = require('./')
const instructions = require('../../helpers/readInput')(__dirname)

const sample = `forward 5
down 5
forward 8
up 3
down 8
forward 2`.split('\n')

test('Day 2.1', t => {
  const example = proceed(sample)

  t.is(example.depth * example.position, 150)
})

test('Day 2.2', t => {
  const example = proceedWithAim(sample)
  t.is(example.depth * example.position, 900)
})

test('Day 2 — Solutions', t => {
  const data = proceed(instructions)
  t.is(data.depth * data.position, 1488669)
  const dataWithAim = proceedWithAim(instructions)
  t.is(dataWithAim.depth * dataWithAim.position, 1176514794)
})
