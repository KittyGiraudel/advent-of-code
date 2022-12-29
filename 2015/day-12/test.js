import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 12 — Sample', t => {
  t.is(run('[1,2,3]'), 6)
  t.is(run('{"a":2,"b":4}'), 6)
  t.is(run('[-1,{"a":1}]'), 0)
  t.is(run('[1,2,3]', true), 6)
  t.is(run('[1,{"c":"red","b":2},3]', true), 4)
  t.is(run('{"d":"red","e":[1,2,3,4],"f":5}', true), 0)
  t.is(run('[1,"red",5]', true), 6)
})

test('Day 12 — Solutions', t => {
  const [input] = $.readInput(import.meta)

  t.is(run(input), 156366)
  t.is(run(input, true), 96852)
})
