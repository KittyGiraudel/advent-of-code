const hexToBin = (hex: string): string =>
  ('00000000' + parseInt(hex, 16).toString(2)).substr(-4)

export default hexToBin