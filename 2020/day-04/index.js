import $ from '../../helpers'

export const VALIDATORS = {
  byr: input => $.isClamped(+input, 1920, 2002),
  iyr: input => $.isClamped(+input, 2010, 2020),
  eyr: input => $.isClamped(+input, 2020, 2030),
  hgt: input =>
    (input.endsWith('cm') && $.isClamped(parseInt(input), 150, 193)) ||
    (input.endsWith('in') && $.isClamped(parseInt(input), 59, 76)),
  hcl: input => /^#[0-9a-f]{6}$/i.test(input),
  ecl: input => 'amb,blu,brn,gry,grn,hzl,oth'.split(',').includes(input),
  pid: input => /^\d{9}$/.test(input),
}

// Return the value for a given key/value colon-separated pair.
// @param {String} input - Input to parse
// @return {String}
const parse = input => input.split(':')[1]

// Loosely validate the given passport by ensuring all fields are listed.
// @param {String} passport - Passport to validate
// @return {Boolean} Whether the passport is valid
export const isValidLoose = passport =>
  Object.keys(VALIDATORS).every(field =>
    passport.split(/\s+/g).find(chunk => chunk.startsWith(field))
  )

// Strictly validate the given passport by ensuring all fields are listed and
// valid.
// @param {String} passport - Passport to validate
// @return {Boolean} Whether the passport is valid
export const isValidStrict = input =>
  Object.keys(VALIDATORS).every(key =>
    input
      .split(/\s+/g)
      .find(value => value.startsWith(key) && VALIDATORS[key](parse(value)))
  )
