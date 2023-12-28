import test from 'ava'
import $ from '../../helpers'
import { count } from '.'

const PATCH = {
  '8: 42': '8: 42 | 42 8',
  '11: 42 31': '11: 42 31 | 42 11 31',
}

test('Day 19 — Sample', t => {
  const sample = $.sample(
    `
  0: 4 1 5
  1: 2 3 | 3 2
  2: 4 4 | 5 5
  3: 4 5 | 5 4
  4: "a"
  5: "b"

  ababbb
  bababa
  abbbab
  aaabbb
  aaaabbb
  `,
    { delimiter: '\n\n' }
  )
  t.is(count(sample[0], sample[1]), 2)

  const sample2 = $.sample(
    `
  42: 9 14 | 10 1
  9: 14 27 | 1 26
  10: 23 14 | 28 1
  1: "a"
  11: 42 31
  5: 1 14 | 15 1
  19: 14 1 | 14 14
  12: 24 14 | 19 1
  16: 15 1 | 14 14
  31: 14 17 | 1 13
  6: 14 14 | 1 14
  2: 1 24 | 14 4
  0: 8 11
  13: 14 3 | 1 12
  15: 1 | 14
  17: 14 2 | 1 7
  23: 25 1 | 22 14
  28: 16 1
  4: 1 1
  20: 14 14 | 1 15
  3: 5 14 | 16 1
  27: 1 6 | 14 18
  14: "b"
  21: 14 1 | 1 14
  25: 1 1 | 1 14
  22: 14 14
  8: 42
  26: 14 22 | 1 20
  18: 15 15
  7: 14 5 | 1 21
  24: 14 1

  abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa
  bbabbbbaabaabba
  babbbbaabbbbbabbbbbbaabaaabaaa
  aaabbbbbbaaaabaababaabababbabaaabbababababaaa
  bbbbbbbaaaabbbbaaabbabaaa
  bbbababbbbaaaaaaaabbababaaababaabab
  ababaaaaaabaaab
  ababaaaaabbbaba
  baabbaaaabbaaaababbaababb
  abbbbabbbbaaaababbbbbbaaaababb
  aaaaabbaabaaaaababaa
  aaaabbaaaabbaaa
  aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
  babaaabbbaaabaababbaabababaaab
  aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba
  `,
    { delimiter: '\n\n' }
  )

  const sample3 = $.sample(
    `
  0: 8 11
  8: 42
  42: "a"
  11: 42 31
  31: "b"

  ab
  aabb
  aaa
  b
  aaab
  `,
    { delimiter: '\n\n' }
  )
  t.is(count(sample2[0], sample2[1], PATCH), 12)
  t.is(count(sample3[0], sample3[1], PATCH), 1)
})

test('Day 19 — Solutions', t => {
  const [rules, messages] = $.readInput(import.meta, { delimiter: '\n\n' })

  t.is(count(rules, messages), 241)
  t.is(count(rules, messages, PATCH), 424)
})
