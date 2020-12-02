const readInput = require('../helpers/readInput')

const predicate1 = ([, i, j, letter, password]) => {
  const occurrences = (password.match(new RegExp(letter, 'g')) || []).length
  return occurrences >= Number(i) && occurrences <= Number(j)
}

const predicate2 = ([, i, j, letter, password]) =>
  [i, j]
    .map(index => password[Number(index) - 1])
    .filter(char => char === letter).length === 1

const parsePolicy = policy => policy.match(/(\d+)-(\d+) (\w): ([^$]+)/)

const isValidPassword1 = policy => predicate1(parsePolicy(policy))
const isValidPassword2 = policy => predicate2(parsePolicy(policy))

const getResult = predicate =>
  readInput('./src/day-2/input.txt').filter(predicate).length

module.exports = { isValidPassword1, isValidPassword2, getResult }
