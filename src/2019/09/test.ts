import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { Intcode } from '../05'

test('Day 09 — Sample', () => {
  const sample = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'

  assert.strictEqual(new Intcode(sample).run().getOutput().join(','), sample)
  assert.strictEqual(
    (
      new Intcode('1102,34915192,34915192,7,4,7,99,0')
        .run()
        .getOutput<number>() + ''
    ).length,
    16
  )
  assert.strictEqual(
    new Intcode('104,1125899906842624,99').run().getOutput<number>(),
    1_125_899_906_842_624
  )
})

test('Day 09 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(new Intcode('109,-1,4,1,99').run().getOutput<number>(), -1)
  assert.strictEqual(
    new Intcode('109,-1,104,1,99').run().getOutput<number>(),
    1
  )
  assert.strictEqual(
    new Intcode('109,-1,204,1,99').run().getOutput<number>(),
    109
  )
  assert.strictEqual(
    new Intcode('109,1,9,2,204,-6,99').run().getOutput<number>(),
    204
  )
  assert.strictEqual(
    new Intcode('109,1,109,9,204,-6,99').run().getOutput<number>(),
    204
  )
  assert.strictEqual(
    new Intcode('109,1,209,-1,204,-106,99').run().getOutput<number>(),
    204
  )
  assert.strictEqual(
    new Intcode('109,1,3,3,204,2,99').setInput(1337).run().getOutput<number>(),
    1337
  )
  assert.strictEqual(
    new Intcode('109,1,203,2,204,2,99')
      .setInput(1337)
      .run()
      .getOutput<number>(),
    1337
  )
  assert.strictEqual(
    new Intcode(input).setInput(1).run().getOutput<number>(),
    2_171_728_567
  )
  assert.strictEqual(
    new Intcode(input).setInput(2).run().getOutput<number>(),
    49_815
  )
})
