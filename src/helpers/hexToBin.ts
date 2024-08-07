/**
 * Convert the given hex value into binary.
 * @param hex - The input value expressed in hexadecimal
 */
const hexToBin = (hex: string) =>
  ('00000000' + Number.parseInt(hex, 16).toString(2)).substr(-4)

export default hexToBin
