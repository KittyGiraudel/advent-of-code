import test from 'ava'
import $ from '../../helpers'
import { Intcode, findInitParams } from './'

test('Day 02 — Sample', t => {
  t.is(new Intcode('1,0,0,0,99').run(), 2)
  t.is(new Intcode('2,3,0,3,99').run(), 2)
  t.is(new Intcode('2,4,4,5,99,0').run(), 2)
  t.is(new Intcode('1,1,1,4,99,5,6,0,99').run(), 30)
})

test('Day 02 — Solutions', t => {
  const [numbers] = $.readInput(import.meta)

  t.is(
    new Intcode(numbers).updateMemory(1, 12).updateMemory(2, 2).run(),
    3_790_689
  )
  t.is(findInitParams(numbers), 6533)
})
