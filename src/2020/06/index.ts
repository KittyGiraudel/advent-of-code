const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

// Count how many questions match `predicate` in the given `group`.
// @param predicate - Validator predicate (`.some` or `.every`)
// @param group - Raw group
const getCountForGroup =
  (predicate: typeof Array.prototype.some) => (group: string) => {
    const persons = group.split('\n')
    const hasAnsweredYes = (letter: string) => (person: string[]) =>
      person.includes(letter)
    const isMatch = (letter: string, index: number) =>
      predicate.call(persons, hasAnsweredYes(letter), index)

    return LETTERS.filter(isMatch).length
  }

export const getLooseCountForGroup = getCountForGroup(Array.prototype.some)
export const getStrictCountForGroup = getCountForGroup(Array.prototype.every)
