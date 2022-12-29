const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

// Count how many questions match `predicate` in the given `group`.
// @param {Function} predicate - Validator predicate (`.some` or `.every`)
// @param {String} group - Raw group
// @return {Number}
const getCountForGroup = predicate => group => {
  const persons = group.split('\n')
  const hasAnsweredYes = letter => person => person.includes(letter)
  const isMatch = letter => predicate.call(persons, hasAnsweredYes(letter))

  return LETTERS.filter(isMatch).length
}

export const getLooseCountForGroup = getCountForGroup(Array.prototype.some)
export const getStrictCountForGroup = getCountForGroup(Array.prototype.every)
