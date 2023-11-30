import $ from '../../helpers'
import levenshtein from 'js-levenshtein'

export const validate = (passphrase: string) =>
  passphrase
    .split(' ')
    .every((word, index, array) => array.indexOf(word) === index)

// To figure out whether two words are anagrams of one another, I decided to
// sort their individual letters, and compute the Levenshtein distance on the
// output. If the Levenshtein is 0, they are anagrams. Otherwise, they’re not.
export const validateStrict = (passphrase: string) =>
  $.combinations(
    passphrase.split(' ').map(word => Array.from(word).sort().join('')),
    2
  ).every(pair => levenshtein(pair[0], pair[1]))
