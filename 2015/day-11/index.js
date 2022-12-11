const $ = require('../../helpers')

const SEQUENCES = $.array(24).map((_, i) =>
  [i + 97, i + 98, i + 99].map(c => String.fromCharCode(c)).join('')
)

const SEQUENCES_RE = new RegExp('(' + SEQUENCES.join('|') + ')')
const IOL_RE = /[iol]/
const PAIRS_RE = /(\w)\1/g

const isValid = curr =>
  !IOL_RE.test(curr) &&
  SEQUENCES_RE.test(curr) &&
  (curr.match(PAIRS_RE) ?? []).length >= 2

const next = curr => {
  const array = Array.from(curr)
  const last = array.pop()

  // If the last letter is a ‘z’, move to the previous character and reset the
  // last one to a ‘a’. Otherwise, increment the last character.
  return last === 'z'
    ? next(array.join('')) + 'a'
    : array.join('') + String.fromCharCode(last.charCodeAt() + 1)
}

const run = curr => {
  do {
    curr = next(curr)
  } while (!isValid(curr))

  return curr
}

module.exports = { run, isValid }