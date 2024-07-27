import test from 'ava'
import $ from '../../helpers'
import {
  canContain,
  countBagsWithin,
  countContainers,
  mapRestrictions,
  parseRestriction,
  run,
} from './'

test('Day 07 — Sample', t => {
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

  t.deepEqual(
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
  t.deepEqual(parseRestriction('bright white bags contain 1 shiny gold bag.'), {
    type: 'bright white',
    contains: [{ count: 1, type: 'shiny gold' }],
  })
  t.deepEqual(parseRestriction('faded blue bags contain no other bags.'), {
    type: 'faded blue',
    contains: [],
  })
  t.is(canContain(map1, 'faded blue', 'shiny gold'), false)
  t.is(canContain(map1, 'bright white', 'shiny gold'), true)
  t.is(canContain(map1, 'dark orange', 'shiny gold'), true)
  t.is(countContainers(mapRestrictions(example1), 'shiny gold'), 4)
  t.is(run(example1), 4)
  t.is(countBagsWithin(mapRestrictions(example1), 'shiny gold'), 32)
  t.is(run(example1, true), 32)
  t.is(countBagsWithin(mapRestrictions(example2), 'shiny gold'), 126)
})

test('Day 07 — Solutions', t => {
  const input = $.readInput(import.meta)
  const map = mapRestrictions(input)
  const type = 'shiny gold'

  t.is(countContainers(map, type), 268)
  t.is(run(input), 268)
  t.is(countBagsWithin(map, type), 7867)
  t.is(run(input, true), 7867)
})
