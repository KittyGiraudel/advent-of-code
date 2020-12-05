const validateLoose = ([, i, j, letter, password]) => {
  const occurrences = (password.match(new RegExp(letter, 'g')) || []).length
  return occurrences >= Number(i) && occurrences <= Number(j)
}
const validateStrict = ([, i, j, letter, password]) =>
  [i, j]
    .map(index => password[Number(index) - 1])
    .filter(char => char === letter).length === 1
const parsePolicy = policy => policy.match(/(\d+)-(\d+) (\w): ([^$]+)/)
const isValidLoose = policy => validateLoose(parsePolicy(policy))
const isValidStrict = policy => validateStrict(parsePolicy(policy))

module.exports = { isValidLoose, isValidStrict }
