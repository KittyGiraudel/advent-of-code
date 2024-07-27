import combinations from './combinations'

/**
 * Serves as an alias to `$.combinations(array, 2)` with better typing.
 */
const pairs = <T>(input: T[]) => combinations(input, 2) as [T, T][]

export default pairs
