import $ from '../../helpers'

export const run = (input: string, n = 5) => {
  const expected = '0'.repeat(n)
  let i = 0

  while (true) {
    if ($.md5(input + ++i).startsWith(expected)) return i
  }
}
