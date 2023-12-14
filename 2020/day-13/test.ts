import test from 'ava'
import $ from '../../helpers'
import { getNextDeparture, getEarliestTimestamp } from '.'

test('Day 13 — Sample', t => {
  t.is(
    $.product(
      getNextDeparture(
        '939\n7,13,x,x,59,x,31,19'.split('\n') as [string, string]
      )
    ),
    295
  )
  t.is(getEarliestTimestamp('\n7,13'.split('\n')), 77)
  t.is(getEarliestTimestamp('\n7,13,x'.split('\n')), 77)
  t.is(getEarliestTimestamp('\n7,13,x,x,59'.split('\n')), 350)
  t.is(getEarliestTimestamp('\n7,13,x,x,59,x,31,19'.split('\n')), 1_068_781)
  t.is(getEarliestTimestamp('\n17,x,13,19'.split('\n')), 3417)
  t.is(getEarliestTimestamp('\n67,7,59,61'.split('\n')), 754_018)
  t.is(getEarliestTimestamp('\n67,x,7,59,61'.split('\n')), 779_210)
  t.is(getEarliestTimestamp('\n67,7,x,59,61'.split('\n')), 1_261_476)
  t.is(getEarliestTimestamp('\n1789,37,47,1889'.split('\n')), 1_202_161_486)
})

test('Day 13 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is($.product(getNextDeparture(input as [string, string])), 5257)
  t.is(getEarliestTimestamp(input), 538_703_333_547_789)
})
