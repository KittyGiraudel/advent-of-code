/**
 * Split the given array into chunks of the given size.
 */
function chunk(input: string, size: number): string[]
function chunk<T>(input: T[], size: number): T[][]
function chunk<T>(input: string | T[], size: number): string[] | T[][] {
  const result: T[][] = []
  const strings: string[] = []

  for (let i = 0; i < input.length; i += size)
    typeof input === 'string'
      ? strings.push(input.slice(i, i + size))
      : result.push(input.slice(i, i + size))

  return typeof input === 'string' ? strings : result
}

export default chunk
