const $ = require('../../helpers')
const levenshtein = require('js-levenshtein')

const validate = passphrase =>
  passphrase
    .split(' ')
    .every((word, index, array) => array.indexOf(word) === index)

// To figure out whether two words are anagrams of one another, I decided to
// sort their individual letters, and compute the Levenshtein distance on the
// output. If the Levenshtein is 0, they are anagrams. Otherwise, they’re not.
const validateStrict = passphrase =>
  $.combinations(
    passphrase.split(' ').map(word => Array.from(word).sort().join('')),
    2
  ).every(pair => levenshtein(...pair))

module.exports = { validate, validateStrict }
