import $ from '../../helpers'

const re = /^001|100|011|110$/

const next = prev => {
  let curr = '.'

  for (let i = 1; i < prev.length - 1; i++) {
    // Interestingly enough, the following Reddit comment highlights the fact
    // that the middle character doesn’t matter. A trap is set if the upper left
    // and right cells are difference.
    // https://www.reddit.com/r/adventofcode/comments/5iyp50/2016_day_18_solutions/dbc0m4u/
    curr += prev[i - 1] !== prev[i + 1] ? '^' : '.'
  }

  return curr + '.'
}

export const run = (input, size = 40) => {
  let row = '.' + input + '.'
  let count = $.countInString(row, '\\.') - 2

  for (let i = 1; i < size; i++) {
    row = next(row)
    count += $.countInString(row, '\\.') - 2
  }

  return count
}
