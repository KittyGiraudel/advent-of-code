const test = require('ava')
const { Intcode } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

const sample = ''

test('Day 9.1', t => {
  const sampleA = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'
  t.is(new Intcode(sampleA).run().outputs.join(','), sampleA)
  t.is(
    (new Intcode('1102,34915192,34915192,7,4,7,99,0').run().getOutput() + '')
      .length,
    16
  )
  t.is(
    new Intcode('104,1125899906842624,99').run().getOutput(),
    1125899906842624
  )
})

test.skip('Day 9.2', t => {})

test('Day 9 — Solutions', t => {
  t.is(new Intcode('109,-1,4,1,99').run().getOutput(), -1)
  t.is(new Intcode('109,-1,104,1,99').run().getOutput(), 1)
  t.is(new Intcode('109,-1,204,1,99').run().getOutput(), 109)
  t.is(new Intcode('109,1,9,2,204,-6,99').run().getOutput(), 204)
  t.is(new Intcode('109,1,109,9,204,-6,99').run().getOutput(), 204)
  t.is(new Intcode('109,1,209,-1,204,-106,99').run().getOutput(), 204)
  t.is(new Intcode('109,1,3,3,204,2,99').setInput(1337).run().getOutput(), 1337)
  t.is(
    new Intcode('109,1,203,2,204,2,99').setInput(1337).run().getOutput(),
    1337
  )
  t.is(new Intcode(input).setInput(1).run().getOutput(), 2171728567)
  t.is(new Intcode(input).setInput(2).run().getOutput(), 49815)
})
