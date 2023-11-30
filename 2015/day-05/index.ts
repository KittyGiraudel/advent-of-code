const isValidLoose = (line: string) => {
  if (['ab', 'cd', 'pq', 'xy'].some(s => line.includes(s))) return false
  if ((line.match(/[aeiou]/g)?.length ?? 0) < 3) return false
  if (!line.match(/(\w)\1/)) return false
  return true
}

const isValidStrict = (line: string) => {
  if (!line.match(/(\w)\w\1/)) return false

  const pairs: Record<string, number[]> = {}

  for (let i = 1; i < line.length; i++) {
    const pair = line[i - 1] + line[i]
    if (!(pair in pairs)) pairs[pair] = []
    if (pairs[pair].at(-1) !== i - 1) pairs[pair].push(i)
  }

  return Object.values(pairs).some(pair => pair.length > 1)
}

export const run = (input: string[], advanced: boolean = false) =>
  input.filter(advanced ? isValidStrict : isValidLoose).length
