// I also tried a version using a string as the board, but it turns out that
// manipulating long strings is way slower than manipulating large arrays in V8
// for some reason.
const play = (board: number[], players: number[]) => {
  const recipes = players.map(index => board[index])
  const sum = recipes[0] + recipes[1]
  // Interesting piece of trivia: this version which I originally started with
  // is orders of magnitude slower than the math-oriented one. Which makes sense
  // since it does multiple type casting (number to string, then array from
  // string, then string to number on the 1,2 items).
  // const sum = Array.from(String($.sum(recipes))).map(Number)
  if (sum >= 10) board.push(Math.floor(sum / 10))
  board.push(sum % 10)
  // Storing the length of the array to avoid a second peek per play, which
  // might maybe matter at extreme lengths?
  const length = board.length
  players[0] = (players[0] + 1 + recipes[0]) % length
  players[1] = (players[1] + 1 + recipes[1]) % length
}

export const cook1 = (count: number) => {
  const board = [3, 7]
  const players = [0, 1]

  while (board.length < count + 10) play(board, players)

  return board.slice(count, count + 10).join('')
}

export const cook2 = (needle: string, upper?: number) => {
  const board = [3, 7]
  const players = [0, 1]

  // Interestingly, it’s the check that’s costly, and not the moves per se,
  // which is why iterating an arbitrary high number of times is significantly
  // faster than iterating only the right number of times, as reported by this
  // Reddit comment:
  // https://www.reddit.com/r/adventofcode/comments/a61ojp/comment/ebsidve/
  // I tried playing with various conditions to see if one of them would yield
  // fast results, but no dice:
  //    !board.join('').endsWith(needle)
  //    board.join('').indexOf(needle) !== -1
  //    board.join('').search(needle) !== -1
  //    !board.slice(-1 * needle.length).every((s, i) => s === needle[i])
  while (typeof upper === 'number' ? upper-- : !board.join('').endsWith(needle))
    play(board, players)

  return upper ? board.join('').search(needle) : board.length - needle.length
}
