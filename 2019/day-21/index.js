import $ from '../../helpers'
import { Intcode } from '../day-05'

export const run = (input, mode = 'WALK') => {
  const computer = new Intcode(input)
  const instructions = [
    // Figured out the commands based on this comment found on Reddit giving
    // some handy notes:
    // https://www.reddit.com/r/adventofcode/comments/edll5a/comment/fc9y38n
    // 1. The droid always jumps 4 steps at a time.
    // 2. Therefore, always make sure that D (n+4) is solid for landing.
    // 3. If you want to be able to land on islands (e.g. ###.##..####), jump 2
    //    tiles before the first hole. Thus, jump whenever C (n+3) is a hole.
    // 4. Otherwise jump if there’s a hole on A (n+1).
    'NOT C J',
    'AND D J',
    'NOT A T',
    'OR T J',
    mode,
  ]

  const output = computer
    .run()
    .setInput(instructions.flatMap(i => $.toAscii(i)))
    .run()
    .getOutput()

  // Print debug information
  // console.log($.fromAscii(output))

  return output.pop()
}
