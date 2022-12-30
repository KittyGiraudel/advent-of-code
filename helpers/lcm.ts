import gcd from './gcd'

// Find the lowest common denominator for the two given numbers.
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b)

export default lcm
