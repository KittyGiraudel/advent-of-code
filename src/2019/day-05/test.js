const test = require('ava')
const { Intcode } = require('./')
const sum = require('../../helpers/sum')
const [numbers] = require('../../helpers/readInput')(__dirname)

test('Day 5.1', t => {
  const computer = new Intcode('1002,4,3,4,33').setInput(1).run()

  t.is(computer.print(), '1002,4,3,4,99')
  t.is(computer.parseOpcode('1002').value, 2)
  t.is(computer.parseOpcode('1002').modes.join(','), '0,1,0')
})

test('Day 5.2', t => {
  t.is(new Intcode('3,9,8,9,10,9,4,9,99,-1,8').setInput(8).run().getOutput(), 1)
  t.is(new Intcode('3,9,7,9,10,9,4,9,99,-1,8').setInput(7).run().getOutput(), 1)
  t.is(new Intcode('3,3,1108,-1,8,3,4,3,99').setInput(8).run().getOutput(), 1)
  t.is(new Intcode('3,3,1107,-1,8,3,4,3,99').setInput(7).run().getOutput(), 1)
})

test('Day 5 — Solutions', t => {
  t.is(new Intcode(numbers).setInput(1).run().getOutput(), 13933662)
  t.is(new Intcode(numbers).setInput(5).run().getOutput(), 2369720)
})