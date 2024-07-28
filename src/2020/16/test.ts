import assert from 'node:assert'
import test from 'node:test'
import { getScanningErrorRate, getTicketValue, parseInput } from '.'
import $ from '../../helpers'

test('Day 16 — Sample', () => {
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

  assert.deepStrictEqual(data.rules[0], ['class', [1, 3], [5, 7]])
  assert.deepStrictEqual(data.rules[1], ['row', [6, 11], [33, 44]])
  assert.deepStrictEqual(data.rules[2], ['seat', [13, 40], [45, 50]])
  assert.strictEqual(data.ticket.join(','), '7,1,14')
  assert.strictEqual(data.nearbyTickets[0].join(','), '7,3,47')
  assert.strictEqual(data.nearbyTickets[1].join(','), '40,4,50')
  assert.strictEqual(data.nearbyTickets[2].join(','), '55,2,20')
  assert.strictEqual(data.nearbyTickets[3].join(','), '38,6,12')
  assert.strictEqual(getScanningErrorRate(data.nearbyTickets, data.rules), 71)
})

test('Day 16 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })
  const data = parseInput(input)

  assert.strictEqual(
    getScanningErrorRate(data.nearbyTickets, data.rules),
    25_788
  )
  assert.strictEqual(getTicketValue(input), 3_902_565_915_559)
})
