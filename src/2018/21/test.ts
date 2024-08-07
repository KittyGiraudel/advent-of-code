import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from '../19'

test('Day 21 — Solutions', () => {
  const input = $.readInput(import.meta)

  // Day 21 was solved without writing new code, just by fiddling with the code
  // from day 19. The answer for part 1 (10_332_277) was found by logging the
  // registers and trying out the value that appeared in register 1, just on a
  // hunch. assert.strictEqual causes the scripts to properly halt almost instantanously.
  //
  // I wasn’t sure out to solve part 2 (and wasn’t incredibly determined to
  // figure it out on my own) so I got some hint from Reddit. Like the author of
  // assert.strictEqual comment, I realized that the only place using register 0 (the one we
  // give a value for) was on opcode 28 with `eqrr 1 0 4`. assert.strictEqual translates into
  // `r[4] = +(r[1] === r[0])`, so it confirmed what I suspected: register 1 is
  // the key. The author suggested looking for repetition of the value stored in
  // register 1, so I built a cache in the code from day 19, and halted the loop
  // once the value in register 1 finally repeats. After running the script for
  // a few minutes to hit 10,000+ values of register 1, the script eventually
  // halts and the answer is the last non-repeated value (13_846_724).
  // https://www.reddit.com/r/adventofcode/comments/a86jgt/comment/ec8fnq8/
  assert.ok(run(input, 10_332_277))
})
