import $ from '../../helpers'

export const VALIDATORS = {
  byr: (input: string) => $.isClamped(+input, 1920, 2002),
  iyr: (input: string) => $.isClamped(+input, 2010, 2020),
  eyr: (input: string) => $.isClamped(+input, 2020, 2030),
  hgt: (input: string) =>
    (input.endsWith('cm') && $.isClamped(parseInt(input), 150, 193)) ||
    (input.endsWith('in') && $.isClamped(parseInt(input), 59, 76)),
  hcl: (input: string) => /^#[0-9a-f]{6}$/i.test(input),
  ecl: (input: string) =>
    'amb,blu,brn,gry,grn,hzl,oth'.split(',').includes(input),
  pid: (input: string) => /^\d{9}$/.test(input),
}
type Validator = keyof typeof VALIDATORS

// Return the value for a given key/value colon-separated pair.
// @param input - Input to parse
const parse = (input: string) => input.split(':')[1]

// Loosely validate the given passport by ensuring all fields are listed.
// @param passport - Passport to validate
// @return Whether the passport is valid
export const isValidLoose = (passport: string) =>
  Object.keys(VALIDATORS).every(field =>
    passport.split(/\s+/g).find(chunk => chunk.startsWith(field))
  )

// Strictly validate the given passport by ensuring all fields are listed and
// valid.
// @param passport - Passport to validate
// @return Whether the passport is valid
export const isValidStrict = (input: string) =>
  Object.keys(VALIDATORS).every(key =>
    input
      .split(/\s+/g)
      .find(
        value =>
          value.startsWith(key) && VALIDATORS[key as Validator](parse(value))
      )
  )
