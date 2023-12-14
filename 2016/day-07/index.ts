const BRACKETS_RE = /\[([^\]]+)\]/g
const ABBA_RE = /(\w)(?!\1)(\w)\2\1/g
const ABA_RE = /(\w)(?!\1)(\w)\1/g

const getBracketContent = (line: string) =>
  line.match(BRACKETS_RE)?.join(' ') ?? ''

const getBaseContent = (line: string) => line.replace(BRACKETS_RE, ' ')

const getABBA = (line: string) => line.match(ABBA_RE)

const getABA = (string: string) => {
  const ABA = new RegExp(ABA_RE)
  const result: string[] = []
  let match = null

  while ((match = ABA.exec(string))) {
    result.push(match[0] as string)
    ABA.lastIndex = match.index + 1
  }

  return result
}

const reverse = ([a, b]: string) => `${b}${a}${b}`

// TLS is supported if there are ABBAs in the base content, but not in the
// bracket content.
const supportsTLS = (line: string) =>
  getABBA(getBaseContent(line)) && !getABBA(getBracketContent(line))

// SSL is supported if there are ABAs in the base content, and at least one of
// them is present as BAB in the bracket content.
const supportsSSL = (line: string) => {
  const withinBrackets = getBracketContent(line)
  const ABAs = getABA(getBaseContent(line))

  return (
    ABAs.length && ABAs.map(reverse).some(bab => withinBrackets.includes(bab))
  )
}

const TYPES = {
  TLS: supportsTLS,
  SSL: supportsSSL,
}
type Type = keyof typeof TYPES

export const run = (lines: string[], type: string) =>
  lines.filter(TYPES[type as Type]).length
