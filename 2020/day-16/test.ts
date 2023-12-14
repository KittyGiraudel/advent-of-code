import test from 'ava'
import $ from '../../helpers'
import { parseInput, getScanningErrorRate, getTicketValue } from '.'

test('Day 16 — Sample', t => {
  const example = $.sample(
    `
  class: 1-3 or 5-7
  row: 6-11 or 33-44
  seat: 13-40 or 45-50

  your ticket:
  7,1,14

  nearby tickets:
  7,3,47
  40,4,50
  55,2,20
  38,6,12
  `,
    { delimiter: '\n\n' }
  )
  const data = parseInput(example)

  t.deepEqual(data.rules[0], ['class', [1, 3], [5, 7]])
  t.deepEqual(data.rules[1], ['row', [6, 11], [33, 44]])
  t.deepEqual(data.rules[2], ['seat', [13, 40], [45, 50]])
  t.is(data.ticket.join(','), '7,1,14')
  t.is(data.nearbyTickets[0].join(','), '7,3,47')
  t.is(data.nearbyTickets[1].join(','), '40,4,50')
  t.is(data.nearbyTickets[2].join(','), '55,2,20')
  t.is(data.nearbyTickets[3].join(','), '38,6,12')
  t.is(getScanningErrorRate(data.nearbyTickets, data.rules), 71)
})

test('Day 16 — Solutions', t => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })
  const data = parseInput(input)

  t.is(getScanningErrorRate(data.nearbyTickets, data.rules), 25_788)
  t.is(getTicketValue(input), 3_902_565_915_559)
})
