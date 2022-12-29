import $ from '../../helpers'

// Loosely validate a password by making sure the amount of occurrences of
// `letter` in `password` is comprised between `i` and `j`.
// @param {Number} i - Minimum amount of occurrences
// @param {Number} j - Maximum amount of occurrences
// @param {String} letter - Letter to find
// @param {String} password - Password to validate
// @return {Boolean}
const validateLoose = ([i, j, letter, password]) =>
  $.isClamped($.countInString(password, letter), i, j)

// Strictly validate a password by making sure the character at index `i` or the
// character at index `j` in `password` is `letter` (but not both).
// @param {Number} i - First index
// @param {Number} j - Second index
// @param {String} letter - Letter to assert
// @param {String} password - Password to validate
// @return {Boolean}
const validateStrict = ([i, j, letter, password]) =>
  Boolean((password[i - 1] === letter) ^ (password[j - 1] === letter))

// Split the password on sequences of non-word characters, which are the hyphen,
// the colon and the spaces; purposedly terse because it works on this input.
// @param {String} policy - Policy to parse
// @return {String[]} Relevant policy chunks
const parsePolicy = policy => policy.split(/\W+/)

// Return whether a raw password policy is loosely valid.
// @param {String} policy - Policy to validate
// @return {Boolean} Whether the policy is valid
export const isValidLoose = policy => validateLoose(parsePolicy(policy))

// Return whether a raw password policy is strictly valid.
// @param {String} policy - Policy to validate
// @return {Boolean} Whether the policy is valid
export const isValidStrict = policy => validateStrict(parsePolicy(policy))
