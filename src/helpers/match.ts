const match = (string: string, re: RegExp) => Array.from(string.match(re) ?? [])

export default match
