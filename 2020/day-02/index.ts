import $ from '../../helpers'

// Loosely validate a password by making sure the amount of occurrences of
// `letter` in `password` is comprised between `i` and `j`.
// @param i - Minimum amount of occurrences
// @param j - Maximum amount of occurrences
// @param letter - Letter to find
// @param password - Password to validate
const validateLoose = ([i, j, letter, password]: string[]): boolean =>
  $.isClamped($.countInString(password, letter), +i, +j)

// Strictly validate a password by making sure the character at index `i` or the
// character at index `j` in `password` is `letter` (but not both).
// @param i - First index
// @param j - Second index
// @param letter - Letter to assert
// @param password - Password to validate
const validateStrict = ([i, j, letter, password]: string[]): boolean =>
  // @ts-ignore
  Boolean((password[i - 1] === letter) ^ (password[j - 1] === letter))

// Split the password on sequences of non-word characters, which are the hyphen,
// the colon and the spaces; purposedly terse because it works on this input.
// @param policy - Policy to parse
// @return Relevant policy chunks
const parsePolicy = (policy: string): string[] => policy.split(/\W+/)

// Return whether a raw password policy is loosely valid.
// @param policy - Policy to validate
// @return Whether the policy is valid
export const isValidLoose = (policy: string): boolean =>
  validateLoose(parsePolicy(policy))

// Return whether a raw password policy is strictly valid.
// @param policy - Policy to validate
// @return Whether the policy is valid
export const isValidStrict = (policy: string): boolean =>
  validateStrict(parsePolicy(policy))
