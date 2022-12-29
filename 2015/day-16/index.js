import $ from '../../helpers'

const SAMPLE = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
}

const parseProperties = properties =>
  properties
    .map(prop => prop.split(': '))
    .reduce((acc, [name, count]) => ({ ...acc, [name]: +count }), {})

export const run = (input, advanced) => {
  const aunts = input.map((line, index) => ({
    id: index + 1,
    properties: parseProperties(line.match(/\w+: \d+/g)),
  }))

  return aunts
    .filter(aunt =>
      Object.entries(aunt.properties).every(([property, actual]) => {
        const expected = SAMPLE[property]

        if (advanced && ['cats', 'trees'].includes(property))
          return actual > expected

        if (advanced && ['pomeranians', 'goldfish'].includes(property))
          return actual < expected

        return actual === expected
      })
    )
    .pop().id
}
