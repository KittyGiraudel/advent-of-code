import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { Intcode } from './'

test('Day 05 — Sample', () => {
  const computer = new Intcode('1002,4,3,4,33').setInput(1).run()

  assert.strictEqual(computer.print(), '1002,4,3,4,99')
  assert.strictEqual(computer.parseOpcode(1002).value, 2)
  assert.strictEqual(computer.parseOpcode(1002).modes.join(','), '0,1,0')

  assert.strictEqual(
    new Intcode('3,9,8,9,10,9,4,9,99,-1,8')
      .setInput(8)
      .run()
      .getOutput<number>(),
    1
  )
  assert.strictEqual(
    new Intcode('3,9,7,9,10,9,4,9,99,-1,8')
      .setInput(7)
      .run()
      .getOutput<number>(),
    1
  )
  assert.strictEqual(
    new Intcode('3,3,1108,-1,8,3,4,3,99').setInput(8).run().getOutput<number>(),
    1
  )
  assert.strictEqual(
    new Intcode('3,3,1107,-1,8,3,4,3,99').setInput(7).run().getOutput<number>(),
    1
  )
})

test('Day 05 — Solutions', () => {
  const [numbers] = $.readInput(import.meta)

  assert.strictEqual(
    new Intcode(numbers).setInput(1).run().getOutput().pop(),
    13_933_662
  )
  assert.strictEqual(
    new Intcode(numbers).setInput(5).run().getOutput<number>(),
    2_369_720
  )
})
