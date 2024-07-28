import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import {
  canContain,
  countBagsWithin,
  countContainers,
  mapRestrictions,
  parseRestriction,
  run,
} from './'

test('Day 07 — Sample', () => {
  const example1 = $.sample(`
  light red bags contain 1 bright white bag, 2 muted yellow bags.
  dark orange bags contain 3 bright white bags, 4 muted yellow bags.
  bright white bags contain 1 shiny gold bag.
  muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
  shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
  dark olive bags contain 3 faded blue bags, 4 dotted black bags.
  vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
  faded blue bags contain no other bags.
  dotted black bags contain no other bags.
  `)
  const map1 = mapRestrictions(example1)

  const example2 = $.sample(`
  shiny gold bags contain 2 dark red bags.
  dark red bags contain 2 dark orange bags.
  dark orange bags contain 2 dark yellow bags.
  dark yellow bags contain 2 dark green bags.
  dark green bags contain 2 dark blue bags.
  dark blue bags contain 2 dark violet bags.
  dark violet bags contain no other bags.
  `)

  assert.deepStrictEqual(
    parseRestriction(
      'light red bags contain 1 bright white bag, 2 muted yellow bags.'
    ),
    {
      type: 'light red',
      contains: [
        { count: 1, type: 'bright white' },
        { count: 2, type: 'muted yellow' },
      ],
    }
  )
  assert.deepStrictEqual(
    parseRestriction('bright white bags contain 1 shiny gold bag.'),
    {
      type: 'bright white',
      contains: [{ count: 1, type: 'shiny gold' }],
    }
  )
  assert.deepStrictEqual(
    parseRestriction('faded blue bags contain no other bags.'),
    {
      type: 'faded blue',
      contains: [],
    }
  )
  assert.strictEqual(canContain(map1, 'faded blue', 'shiny gold'), false)
  assert.strictEqual(canContain(map1, 'bright white', 'shiny gold'), true)
  assert.strictEqual(canContain(map1, 'dark orange', 'shiny gold'), true)
  assert.strictEqual(
    countContainers(mapRestrictions(example1), 'shiny gold'),
    4
  )
  assert.strictEqual(run(example1), 4)
  assert.strictEqual(
    countBagsWithin(mapRestrictions(example1), 'shiny gold'),
    32
  )
  assert.strictEqual(run(example1, true), 32)
  assert.strictEqual(
    countBagsWithin(mapRestrictions(example2), 'shiny gold'),
    126
  )
})

test('Day 07 — Solutions', () => {
  const input = $.readInput(import.meta)
  const map = mapRestrictions(input)
  const type = 'shiny gold'

  assert.strictEqual(countContainers(map, type), 268)
  assert.strictEqual(run(input), 268)
  assert.strictEqual(countBagsWithin(map, type), 7867)
  assert.strictEqual(run(input, true), 7867)
})
