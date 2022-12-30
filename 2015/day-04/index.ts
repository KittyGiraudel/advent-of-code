import $ from '../../helpers'

export const run = (input: string, n: number = 5): number => {
  let i = 0
  while (true) {
    if ($.md5(input + ++i).startsWith('0'.repeat(n))) return i
  }
}
