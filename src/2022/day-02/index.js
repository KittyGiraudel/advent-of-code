const $ = require('../../helpers')

const isRock = value => value === 'A' || value === 'X'
const isPaper = value => value === 'B' || value === 'Y'
const isScissors = value => value === 'C' || value === 'Z'

const DRAW = 3
const WIN = 6
const LOSS = 0

const ROCK = 1
const PAPER = 2
const SCISSORS = 3

const battleA = instructions => {
  return instructions.reduce((acc, instruction) => {
    const [opponent, self] = instruction.split(' ')

    if (isRock(opponent)) {
      if (isRock(self)) return acc + ROCK + DRAW
      if (isPaper(self)) return acc + PAPER + WIN
      if (isScissors(self)) return acc + SCISSORS + LOSS
    } else if (isPaper(opponent)) {
      if (isRock(self)) return acc + ROCK + LOSS
      if (isPaper(self)) return acc + PAPER + DRAW
      if (isScissors(self)) return acc + SCISSORS + WIN
    } else if (isScissors(opponent)) {
      if (isRock(self)) return acc + ROCK + WIN
      if (isPaper(self)) return acc + PAPER + LOSS
      if (isScissors(self)) return acc + SCISSORS + DRAW
    }
  }, 0)
}

const battleB = instructions => {
  return instructions.reduce((acc, instruction) => {
    const [opponent, expectation] = instruction.split(' ')

    if (expectation === 'X') {
      if (isRock(opponent)) return acc + SCISSORS + LOSS
      if (isPaper(opponent)) return acc + ROCK + LOSS
      if (isScissors(opponent)) return acc + PAPER + LOSS
    } else if (expectation === 'Y') {
      if (isRock(opponent)) return acc + ROCK + DRAW
      if (isPaper(opponent)) return acc + PAPER + DRAW
      if (isScissors(opponent)) return acc + SCISSORS + DRAW
    } else if (expectation === 'Z') {
      if (isRock(opponent)) return acc + PAPER + WIN
      if (isPaper(opponent)) return acc + SCISSORS + WIN
      if (isScissors(opponent)) return acc + ROCK + WIN
    }
  }, 0)
}

module.exports = { battleA, battleB }
