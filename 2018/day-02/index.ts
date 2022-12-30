import $ from '../../helpers'
import levenshtein from 'js-levenshtein'

const findSimilarIds = (ids: string[]): string[] => {
  const candidates = []

  for (let i = 0; i < ids.length; i++) {
    for (let j = 0; j < i; j++) {
      if (levenshtein(ids[i], ids[j]) === 1) candidates.push(ids[i], ids[j])
    }
  }

  return candidates
}

const findCommonalities = (a: string, b: string): string =>
  Array.from(a)
    .filter((char, i) => b[i] === char)
    .join('')

export const checksum = (input: string[]): number => {
  const lines = input.map(line => $.count(Array.from(line)))
  const twos = lines.filter(counts => Object.values(counts).includes(2))
  const threes = lines.filter(counts => Object.values(counts).includes(3))

  return twos.length * threes.length
}

export const findId = input => findCommonalities(...findSimilarIds(input))
