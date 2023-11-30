const safeMatch = (string: string, re: RegExp) =>
  Array.from(string.match(re) ?? [])

export default safeMatch
