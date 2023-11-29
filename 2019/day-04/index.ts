export const isValidPassword = (
  str: string,
  secure: boolean = false
): boolean =>
  str.length === 6 &&
  (secure
    ? // Check for all sequences of repeated numbers and make sure one at least
      // one of them is strictly 2 items long.
      Array.from(str.matchAll(/(\d)\1+/g)).some(([match]) => match.length === 2)
    : // Check for a sequence of at least 2 repeated numbers.
      str.match(/(\d)\1/) !== null) &&
  Array.from(str).every((char, i, str) => i === 0 || +char >= +str[i - 1])

export const findPasswords = (
  input: string,
  secure: boolean = false
): Array<string> => {
  const [min, max] = input.split('-').map(Number)
  const passwords = []

  for (let i = min; i <= max; i++) {
    const string = String(i)
    if (isValidPassword(string, secure)) passwords.push(string)
  }

  return passwords
}
