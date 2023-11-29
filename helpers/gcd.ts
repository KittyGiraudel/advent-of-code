/**
 * Find the greatest common denominator for the two given numbers.
 */
const gcd = (a: number, b: number) => (b ? gcd(b, a % b) : a)

export default gcd
