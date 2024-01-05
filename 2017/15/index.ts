import $ from '../../helpers'

const gen = function* (init: number, factor: number, modulo: number = 1) {
  let curr = init

  while (true) {
    curr *= factor
    curr %= 2_147_483_647
    if (curr % modulo === 0) yield curr
  }
}

const tick = (generator: ReturnType<typeof gen>) =>
  $.toBin(generator.next().value).slice(-16)

export const run = (
  a: number,
  b: number,
  iterations: number,
  modA?: number,
  modB?: number
) => {
  const genA = gen(a, 16_807, modA)
  const genB = gen(b, 48_271, modB)

  let count = 0

  // I did it by comparing the last 16 characters of each binary strings, but
  // it’s of course pretty slow. The following implementation is explained in
  // the following Reddit comment. Basically, `0xffff` is 65535 in decimal, and
  // 16 `1` in binary, which means it’s used as a mask. Instead of comparing
  // both binary strings together, we compare each of them with the bitmask and
  // expect the same result.
  // https://www.reddit.com/r/adventofcode/comments/7jxkiw/comment/dramv1d
  // while (iterations--) count += +(tick(genA) === tick(genB))
  while (iterations--)
    count += +((genA.next().value & 0xffff) === (genB.next().value & 0xffff))

  return count
}
