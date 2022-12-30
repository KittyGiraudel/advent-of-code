const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

// Count how many questions match `predicate` in the given `group`.
// @param predicate - Validator predicate (`.some` or `.every`)
// @param group - Raw group
const getCountForGroup =
  (predicate: (value: any, index: number, array: any[]) => boolean) =>
  (group: string): number => {
    const persons = group.split('\n')
    const hasAnsweredYes = (letter: string) => (person: string[]) =>
      person.includes(letter)
    const isMatch = (letter: string) =>
      predicate.call(persons, hasAnsweredYes(letter))

    return LETTERS.filter(isMatch).length
  }

export const getLooseCountForGroup = getCountForGroup(Array.prototype.some)
export const getStrictCountForGroup = getCountForGroup(Array.prototype.every)