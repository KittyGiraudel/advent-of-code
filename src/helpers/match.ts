/**
 * Match the given string with the given regular expression in a safe way,
 * always returning an array of values (or empty one).
 * @param string - String to match
 * @param re - Regular express to user
 */
const match = (string: string, regex: RegExp) =>
  Array.from(string.match(regex) ?? [])

export default match
