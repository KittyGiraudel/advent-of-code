// Transform the given value with the subject.
// @param {Number} subject - Subject
// @param {Number} value - value
// @return {Number}
const transform = (subject, value = 1) => (value * subject) % 20201227

// Brute-force the loop size for the given subject until it reaches guess.
// @param {Number} subject - Subject
// @param {Number} guess - guess
// @return {Number}
const guessLoopSize = (subject, expected) => {
  let loopSize = 1
  let actual = transform(subject, 1)

  while (actual !== expected) {
    actual = transform(subject, actual)
    loopSize++
  }

  return loopSize
}

// Iterate the amount of times of the loop size on the subject to find the key.
// @param {Number} subject - Subject
// @param {Number} loopSize - loopSize
// @return {Number}
const getKey = (subject, loopSize) => {
  let key = undefined

  for (let i = 0; i < loopSize; i++) key = transform(subject, key)

  return key
}

// Get the encryption key.
// @param {Number} door - Door value
// @param {Number} card - Card value
// @return {Number}
const getEncryptionKey = (door, card) => {
  const doorLoopSize = guessLoopSize(7, door)
  const cardLoopSize = guessLoopSize(7, card)
  const doorKey = getKey(door, cardLoopSize)
  const cardKey = getKey(card, doorLoopSize)

  if (doorKey === cardKey) return doorKey
}

module.exports = { getEncryptionKey }
