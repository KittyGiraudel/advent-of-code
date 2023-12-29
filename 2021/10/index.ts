const OPENERS_FROM_CLOSERS = { ')': '(', ']': '[', '}': '{', '>': '<' }
const CORRUPTION_SCORE_MAP = { ')': 3, ']': 57, '}': 1197, '>': 25_137 }
const COMPLETION_SCORE_MAP = { '(': 1, '[': 2, '{': 3, '<': 4 }

type OpenersKey = keyof typeof OPENERS_FROM_CLOSERS
type CorruptionKey = keyof typeof CORRUPTION_SCORE_MAP
type CompletionKey = keyof typeof COMPLETION_SCORE_MAP

type ValidLine = { type: 'VALID' }
type IncompleteLine = { type: 'INCOMPLETE'; opened: string[] }
type CorruptedLine = { type: 'CORRUPTED'; character: string }

export const processLine = (line: string) => {
  const opened = []
  const characters = line.split('')

  for (let i = 0; i < characters.length; i++) {
    const character = characters[i]

    if (Object.values(OPENERS_FROM_CLOSERS).includes(character)) {
      opened.push(character)
    } else {
      const lastOpened = opened.pop()

      if (lastOpened !== OPENERS_FROM_CLOSERS[character as OpenersKey]) {
        return { type: 'CORRUPTED', character } as CorruptedLine
      }
    }
  }

  if (opened.length > 0) {
    return { type: 'INCOMPLETE', opened } as IncompleteLine
  }

  return { type: 'VALID' } as ValidLine
}

const getLinesFromType = (lines: string[], type: string) =>
  lines.map(processLine).filter(line => line.type === type)

const getCorruptionScore = (lines: string[]) =>
  (getLinesFromType(lines, 'CORRUPTED') as CorruptedLine[]).reduce(
    (score, { character }) =>
      score + CORRUPTION_SCORE_MAP[character as CorruptionKey],
    0
  )

const getCompletionScore = (lines: string[]) => {
  const scores = (getLinesFromType(lines, 'INCOMPLETE') as IncompleteLine[])
    .map(line =>
      line.opened.reduceRight(
        (score, character) =>
          score * 5 + COMPLETION_SCORE_MAP[character as CompletionKey],
        0
      )
    )
    .sort((a, b) => b - a)

  return scores[Math.floor(scores.length / 2)]
}

export const run = (input: string[], part2: boolean = false) => {
  return part2 ? getCompletionScore(input) : getCorruptionScore(input)
}
