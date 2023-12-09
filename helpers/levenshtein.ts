import grid from './grid'

/**
 * Compute the levenshtein distance between strings a and b. It’s not the
 * fastest implementation, but it’s dependency-free so that’s something. It’s
 * fast enough for the couple puzzles requiring it anyway.
 */
const levenshtein = (a: string, b: string) => {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  const matrix = grid.init<number>(a.length + 1, b.length + 1)

  for (let i = 0; i <= b.length; i++) matrix[i][0] = i
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] =
        b.charAt(i - 1) === a.charAt(j - 1)
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j - 1] + 1, // substitution
              Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1) // insertion
            ) // deletion
    }
  }

  return matrix[b.length][a.length]
}

export default levenshtein
