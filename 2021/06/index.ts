import $ from '../../helpers/'

export const run = (input: string, days: number = 80) => {
  let curr = $.array(9).map((_, i) => $.countInString(input, String(i)))
  input
  while (days--) {
    let next: number[] = []

    for (let a = 7; a >= 0; a--) next[a] = curr[a + 1]
    next[8] = curr[0]
    next[6] = next[6] + curr[0]

    curr = next
  }

  return $.sum(curr)
}
