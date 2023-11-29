const OPENERS_FROM_CLOSERS = { ')': '(', ']': '[', '}': '{', '>': '<' }
const CORRUPTION_SCORE_MAP = { ')': 3, ']': 57, '}': 1197, '>': 25137 }
const COMPLETION_SCORE_MAP = { '(': 1, '[': 2, '{': 3, '<': 4 }

type Line = { type: string; character?: string; opened?: string[] }

export const processLine = (line: string) => {
  const opened = []
  const characters = line.split('')

  for (let i = 0; i < characters.length; i++) {
    const character = characters[i]

    if (Object.values(OPENERS_FROM_CLOSERS).includes(character)) {
      opened.push(character)
    } else {
      const lastOpened = opened.pop()

      if (lastOpened !== OPENERS_FROM_CLOSERS[character]) {
        return { type: 'CORRUPTED', character } as Line
      }
    }
  }

  if (opened.length > 0) {
    return { type: 'INCOMPLETE', opened } as Line
  }

  return { type: 'VALID' } as Line
}

const getLinesFromType = (lines: string[], type: string) =>
  lines.map(processLine).filter(line => line.type === type)

export const getCorruptionScore = (lines: string[]) =>
  getLinesFromType(lines, 'CORRUPTED').reduce(
    (score, { character }) => score + CORRUPTION_SCORE_MAP[character],
    0
  )

export const getCompletionScore = (lines: string[]) => {
  const scores = getLinesFromType(lines, 'INCOMPLETE')
    .map(line =>
      line.opened.reduceRight(
        (score, character) => score * 5 + COMPLETION_SCORE_MAP[character],
        0
      )
    )
    .sort((a, b) => b - a)

  return scores[Math.floor(scores.length / 2)]
}
