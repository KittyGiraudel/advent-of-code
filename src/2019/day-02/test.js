const test = require('ava')
const { Intcode, findInitParams } = require('./')
const sum = require('../../helpers/sum')
const [numbers] = require('../../helpers/readInput')(__dirname)

test.skip('Day 2.1', t => {
  t.is(new Intcode('1,0,0,0,99').run().print(), '2,0,0,0,99')
  t.is(new Intcode('2,3,0,3,99').run().print(), '2,3,0,6,99')
  t.is(new Intcode('2,4,4,5,99,0').run().print(), '2,4,4,5,99,9801')
  t.is(new Intcode('1,1,1,4,99,5,6,0,99').run().print(), '30,1,1,4,2,5,6,0,99')
})

test.skip('Day 2.2', t => {})

test('Day 2 — Solutions', t => {
  t.is(new Intcode(numbers).prepare({ 1: 12, 2: 2 }).run(), 3790689)
  t.is(findInitParams(numbers), 6533)
})
