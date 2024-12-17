import $ from '../../helpers'

export const run = (input: string[], part2 = false) => {
  const [rawA, rawB, rawC, , rawIns] = input
  const [A] = $.numbers(rawA).map(BigInt)
  const [B] = $.numbers(rawB).map(BigInt)
  const [C] = $.numbers(rawC).map(BigInt)
  const instructions = $.numbers(rawIns).map(BigInt)

  function execute(A: bigint) {
    const registers = { A, B, C }
    const output: bigint[] = []
    let pointer = 0

    const combo = (value: bigint) => {
      if (value <= 3n) return value
      if (value === 4n) return registers.A
      if (value === 5n) return registers.B
      if (value === 6n) return registers.C
      throw new Error('Invalid combo operand 7')
    }

    while (true) {
      const instruction = instructions[pointer]
      const operand = instructions[pointer + 1]

      if (instruction === undefined) break
      pointer += 2

      if (instruction === 0n) registers.A >>= combo(operand)
      if (instruction === 1n) registers.B ^= operand
      if (instruction === 2n) registers.B = combo(operand) % 8n
      if (instruction === 3n && registers.A) pointer = Number(operand)
      if (instruction === 4n) registers.B ^= registers.C
      if (instruction === 5n) output.push(combo(operand) % 8n)
      if (instruction === 6n) registers.B = registers.A >> combo(operand)
      if (instruction === 7n) registers.C = registers.A >> combo(operand)
    }

    return output
  }

  // These problems are not my forte. First of all, this one required to use
  // BigInt for the XOR operations to work as expected, which is not something
  // I would have done from the get go as I’ve never worked with BigInt before.
  // Besides that, I have tried a few approaches and I _feel_ like I could have
  // potentially gotten to the right value, but it would have taken me a long
  // time and I can’t say I find these reverse-engineering problems very fun.
  // See: https://www.reddit.com/r/adventofcode/comments/1hg38ah/comment/m2gfnfj
  function patchA() {
    let min = 8n ** 17n // large enough constant

    const check = (depth: number, score: bigint) => {
      if (depth === instructions.length) {
        if (score < min) min = score
        return
      }

      for (let i = 0n; i < 8n; i++) {
        if (
          execute(i + 8n * score)[0] ===
          instructions[instructions.length - 1 - depth]
        )
          check(depth + 1, i + 8n * score)
      }
    }

    check(0, 0n)

    return min
  }

  return part2 ? patchA() : execute(A).join(',')
}
