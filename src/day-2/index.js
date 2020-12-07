const validateLoose = ([i, j, letter, password]) => {
  const occurrences = password.match(new RegExp(letter, 'g'))?.length ?? 0
  return occurrences >= i && occurrences <= j
}

const validateStrict = ([i, j, letter, password]) =>
  [i, j].map(index => password[index - 1]).filter(char => char === letter)
    .length === 1

const parsePolicy = policy => policy.split(/\W+/)
const isValidLoose = policy => validateLoose(parsePolicy(policy))
const isValidStrict = policy => validateStrict(parsePolicy(policy))

// (s,[n,x,l,p]=s.split(/\W+/))=>!!((p[n-1]==l)^(p[x-1]==l))

module.exports = { isValidLoose, isValidStrict }
