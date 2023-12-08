import gcd from './gcd'

/**
 * Find the least common multiple for the two given numbers.
 */
const lcm = (a: number, b: number) => (a * b) / gcd(a, b)

export default lcm
