const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

const getCountForGroup = predicate => group => {
  const persons = group.split('\n')
  const hasAnsweredYes = letter => person => person.includes(letter)
  const isMatch = letter => predicate.call(persons, hasAnsweredYes(letter))

  return LETTERS.filter(isMatch).length
}

const getLooseCountForGroup = getCountForGroup(Array.prototype.some)
const getStrictCountForGroup = getCountForGroup(Array.prototype.every)

const getTotalCount = (groups, mapper) =>
  groups.map(mapper).reduce((a, b) => a + b, 0)

module.exports = {
  getLooseCountForGroup,
  getStrictCountForGroup,
  getTotalCount,
}
