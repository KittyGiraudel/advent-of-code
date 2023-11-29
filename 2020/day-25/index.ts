// Transform the given value with the subject.
// @param subject - Subject
// @param value - value
const transform = (subject: number, value: number = 1) =>
  (value * subject) % 20201227

// Brute-force the loop size for the given subject until it reaches guess.
// @param subject - Subject
// @param guess - guess
const guessLoopSize = (subject: number, expected: number) => {
  let loopSize = 1
  let actual = transform(subject, 1)

  while (actual !== expected) {
    actual = transform(subject, actual)
    loopSize++
  }

  return loopSize
}

// Iterate the amount of times of the loop size on the subject to find the key.
// @param subject - Subject
// @param loopSize - loopSize
const getKey = (subject: number, loopSize: number) => {
  let key = undefined

  for (let i = 0; i < loopSize; i++) key = transform(subject, key)

  return key
}

// Get the encryption key.
// @param door - Door value
// @param card - Card value
export const getEncryptionKey = (door: number, card: number) => {
  const doorLoopSize = guessLoopSize(7, door)
  const cardLoopSize = guessLoopSize(7, card)
  const doorKey = getKey(door, cardLoopSize)
  const cardKey = getKey(card, doorLoopSize)

  if (doorKey === cardKey) return doorKey
}
