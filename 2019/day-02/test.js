const test = require('ava')
const { Intcode, findInitParams } = require('./')
const [numbers] = require('../../helpers/readInput')(__dirname)

test('Day 2.1', t => {
  t.is(new Intcode('1,0,0,0,99').run(), 2)
  t.is(new Intcode('2,3,0,3,99').run(), 2)
  t.is(new Intcode('2,4,4,5,99,0').run(), 2)
  t.is(new Intcode('1,1,1,4,99,5,6,0,99').run(), 30)
})

test.skip('Day 2.2', t => {})

test('Day 2 — Solutions', t => {
  t.is(
    new Intcode(numbers).updateMemory(1, 12).updateMemory(2, 2).run(),
    3790689
  )
  t.is(findInitParams(numbers), 6533)
})
