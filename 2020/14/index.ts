import $ from '../../helpers'

// This is a complete rewrite done years later, which is significantly faster
// and easier to understand, not to mention doesn’t require some `@ts-ignore`
// comments. Glad I managed to clean it up because I remember it giving me
// troubles back then.
export const run = (input: string[], part2 = false) => {
  const memory = new Map<number, number>()
  const toBinary = (value: number) => String($.toBin(value)).padStart(36, '0')
  let mask = ''

  input.forEach(line => {
    if (line.startsWith('mask = ')) mask = line.split(' = ')[1]
    else {
      const [index, value] = $.numbers(line)
      const binary = part2 ? toBinary(index) : toBinary(value)

      if (!part2) {
        const masked = $.toDec(
          $.stringMap(mask, (char, i) => (char === 'X' ? binary[i] : char))
        )
        memory.set(index, masked)
      } else {
        Array.from(mask)
          .reduce(
            (addresses, char, index) => {
              if (char === '0') {
                return addresses.map(address => address + binary[index])
              } else if (char === '1') {
                return addresses.map(address => address + '1')
              } else {
                return addresses.flatMap(address => [
                  address + '1',
                  address + '0',
                ])
              }
            },
            ['']
          )
          .map($.toDec)
          .forEach(index => memory.set(index, value))
      }
    }
  })

  return $.sum(Array.from(memory.values()))
}
