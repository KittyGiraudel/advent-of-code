const getBracketContent = (line: string) =>
  line.match(/\[([^\]]+)\]/g)?.join(' ')

const getBaseContent = (line: string) => line.replace(/\[[^\]]+\]/g, ' ')

const getABBA = (line: string) => line.match(/(\w)(?!\1)(\w)\2\1/g)

const getABA = (string: string): Array<RegExpExecArray> => {
  const ABA = /(\w)(?!\1)(\w)\1/g
  const result: Array<RegExpExecArray> = []
  let match = null

  while ((match = ABA.exec(string))) {
    result.push(match[0])
    ABA.lastIndex = match.index + 1
  }

  return result
}

const reverse = ([a, b]: RegExpExecArray) => `${b}${a}${b}`

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

export const run = (lines: Array<string>, type: string) =>
  lines.filter(TYPES[type]).length
