// Return the next bus departing line and the amount of minutes to wait before
// departure.
// @param {Number} timestamp - Initial timestamp
// @param {(Number|x)[]} sequence - Bus lines
// @return {Number[]}
const getNextDeparture = ([timestamp, sequence]) => {
  const line = sequence
    .split(',')
    .filter(a => a !== 'x')
    .map(Number)
    .reduce(
      (acc, id) => ((+timestamp / id) % 1 > (+timestamp / acc) % 1 ? id : acc),
      Infinity
    )
  const wait = Math.round(line - line * ((timestamp / line) % 1))

  return [line, wait]
}

// Group numbers in sequence with their position in the sequence in tuples.
// @param {(Number|x)[]} sequence - Bus lines
// @return {Number[][]}
const makeTuples = sequence =>
  sequence
    .map((value, index) => (value === 'x' ? null : [value, index]))
    .filter(Boolean)

// @param {(Number|x)[]} sequence - Bus lines
// @param {Number} timestamp - Start timestamp
// @param {Number} increment - Incrementing value
// @return {Number}
const findTimestamp = (sequence, { timestamp, increment }) => {
  const tuples = makeTuples(sequence)

  while (true) {
    if (tuples.every(([value, index]) => (timestamp + index) % value === 0))
      return timestamp
    timestamp += increment || tuples[0][0]
  }
}

// Get the earliest timestamp that matches the given input bus lines. Honestly,
// I’m still not entirely sure how it works. The main idea is that we keep
// speeding up computation by solving the problem incrementally. First, find the
// timestamp that works for the first 2 values in the sequence, then the first
// 3, then the first 4, and so on and so forth until the entire sequence is
// resolved. After solving each sequence, we increase the incrementing value by
// the current value, to search exponentially faster.
// Given this sequence: 7,13,x,x,59,x,31,19
// 1. findTimestamp([7], 0, 1) => 0
// 2. findTimestamp([7, 13], 0, 7) => 77
// 3. findTimestamp([7, 13, 'x'], 77, 91) => 77
// 4. findTimestamp([7, 13, 'x', 'x'], 77, 91) => 77
// 5. findTimestamp([7, 13, 'x', 'x', 59], 77, 91) => 350
// 6. findTimestamp([7, 13, 'x', 'x', 59], 350, 5369) => 70147
// 7. findTimestamp([7, 13, 'x', 'x', 59, 'x'], 350, 5369) => 70147
// 7. findTimestamp([7, 13, 'x', 'x', 59, 'x', 31], 350, 5369) => 1068781
// @param {(Number|x)[]} input - Bus lines
// @return {Number}
const getEarliestTimestamp = ([, input]) =>
  input
    .split(',')
    .map(value => parseInt(value) || 'x')
    .reduce(
      (acc, value, index, array) => ({
        timestamp: findTimestamp(array.slice(0, index + 1), acc),
        increment: acc.increment * (parseInt(value) || 1),
      }),
      { increment: 1, timestamp: 0 }
    ).timestamp

module.exports = { getNextDeparture, getEarliestTimestamp }
