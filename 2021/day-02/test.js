const test = require('ava')
const { proceed, proceedWithAim } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `forward 5
down 5
forward 8
up 3
down 8
forward 2`.split('\n')

test('Day 02 — Sample', t => {
  const example = proceed(sample)
  t.is(example.depth * example.position, 150)

  const example2 = proceedWithAim(sample)
  t.is(example2.depth * example2.position, 900)
})

test('Day 02 — Solutions', t => {
  const data = proceed(input)
  t.is(data.depth * data.position, 1488669)
  const dataWithAim = proceedWithAim(input)
  t.is(dataWithAim.depth * dataWithAim.position, 1176514794)
})
