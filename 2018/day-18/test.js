const test = require('ava')
const { run } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`.split('\n')

test('Day 18.1', t => {
  t.is(run(sample, 10), 1147)
})

test.skip('Day 18.2', t => {})

test('Day 18 — Solutions', t => {
  t.is(run(input, 10), 394420)

  // Part 2 — which requires iterating 1 billion times — was initially solved
  // manually, then reverse-engineered to come up with the automated solution.
  //
  // To figure out the solution in the first place, I iterated 1,000 times and
  // logged the amount of each type of items at every cycle. Then, I searched
  // for duplicated lines within the set and noticed that almost half (~450)
  // were duplicated. That means we’re eventually (and quite quickly) hitting a
  // loop. This is the way to stop iterating early.
  //
  // To find that loop, I dumped all 1,000 lines in VSC and looked for a
  // repeated sequence, which I found out start on line 522, and repeats every
  // 27 iterations. I first landed on 174_782 by doing: (1B - 522) % 27 = 19
  // So I thought the 19th item of a cycle is the one that’s hit on iteration
  // 1B, but no. The result was too high. So I took all 27 lines from the loop
  // and computed the score for everyone of them, looking for any that yields
  // less than 174_782. There were just 4 of them. I tried one of at random,
  // and it was that.
  //
  // It turns out that a) the sequence doesn’t start on line 522 but 518 and b)
  // the sequence is not 27 items long but 28, so it’s kind of a miracle I found
  // the solution manually. ^^'
  t.is(run(input, 1_000_000_000), 174420)
})
