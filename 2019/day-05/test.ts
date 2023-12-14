import test from 'ava'
import $ from '../../helpers'
import { Intcode } from './'

test('Day 05 — Sample', t => {
  const computer = new Intcode('1002,4,3,4,33').setInput(1).run()

  t.is(computer.print(), '1002,4,3,4,99')
  t.is(computer.parseOpcode(1002).value, 2)
  t.is(computer.parseOpcode(1002).modes.join(','), '0,1,0')

  t.is(new Intcode('3,9,8,9,10,9,4,9,99,-1,8').setInput(8).run().getOutput(), 1)
  t.is(new Intcode('3,9,7,9,10,9,4,9,99,-1,8').setInput(7).run().getOutput(), 1)
  t.is(new Intcode('3,3,1108,-1,8,3,4,3,99').setInput(8).run().getOutput(), 1)
  t.is(new Intcode('3,3,1107,-1,8,3,4,3,99').setInput(7).run().getOutput(), 1)
})

test('Day 05 — Solutions', t => {
  const [numbers] = $.readInput(import.meta)

  t.is(
    (new Intcode(numbers).setInput(1).run().getOutput() as number[]).pop(),
    13_933_662
  )
  t.is(new Intcode(numbers).setInput(5).run().getOutput(), 2_369_720)
})
