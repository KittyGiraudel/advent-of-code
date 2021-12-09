const parseInput = line =>
  line
    .split(' | ')
    .map(value =>
      value.split(' ').map(pattern => pattern.split('').sort().join(''))
    )

const count = lines =>
  lines
    .map(parseInput)
    .map(line => line[1])
    .concat()
    .reduce(
      (acc, values) =>
        acc +
        values.filter(value => [2, 3, 4, 7].includes(value.length)).length,
      0
    )

const lettersFrom = value => new RegExp('[' + value + ']', 'g')

const decode = line => {
  let [patterns, encodedDigits] = parseInput(line)

  // Store the 10 patterns in the right order in this array.
  const values = []

  // Start by storing patterns that can be deduced because they have a unique
  // number of segments.
  values[1] = patterns.find(pattern => pattern.length === 2)
  values[4] = patterns.find(pattern => pattern.length === 4)
  values[7] = patterns.find(pattern => pattern.length === 3)
  values[8] = patterns.find(pattern => pattern.length === 7)

  // The remaining 6 patterns are divided into 2 groups:
  // - Those with 5 segments (2, 3 and 5)
  // - Those with 6 segments (0, 6 and 9)
  let with5Segments = patterns.filter(pattern => pattern.length === 5)
  let with6Segments = patterns.filter(pattern => pattern.length === 6)

  // The right-side segments can be determined by looking at the overlap between
  // pattern 4 and pattern 7. Segments that are present in both patterns are the
  // one sitting on the right side.
  const rightSideSegments = values[4]
    .split('')
    .filter(segment => values[7].includes(segment))

  // Amongst the patterns with 5 segments, the only one using both ride-side
  // segments is pattern 3. We then remove it from the array as it has been
  // figured out.
  values[3] = with5Segments.find(pattern =>
    rightSideSegments.every(segment => pattern.includes(segment))
  )
  with5Segments = with5Segments.filter(pattern => pattern !== values[3])

  // There are 2 remaining patterns with 5 segments (2 and 5). To figure out
  // which is which, they can be compared to pattern 4. Pattern 2 will have 2
  // segments in common, while pattern 5 will have 3 segments in common. By
  // sorting these 2 based on the number of common segments with pattern 4, we
  // can determine which are patterns 2 and 5.
  const lettersFrom4 = lettersFrom(values[4])
  with5Segments.sort(
    (a, b) => a.match(lettersFrom4).length - b.match(lettersFrom4).length
  )
  values[2] = with5Segments[0]
  values[5] = with5Segments[1]

  // Amongst the 3 patterns with 6 segments (0, 6 and 9), pattern 0 is the only
  // only with 4 overlapping segments with pattern 5 (both pattern 6 and pattern
  // 9 have 5  segments in common with pattern 5) so it can be guessed this way.
  // We then remove it from the array as it has been figured out.
  const lettersFrom5 = lettersFrom(values[5])
  values[0] = with6Segments.find(
    pattern => pattern.match(lettersFrom5).length === 4
  )
  with6Segments = with6Segments.filter(pattern => pattern !== values[0])

  // There are 2 remaining patterns with 6 segments (6 and 9). To figure out
  // which is which, they can be compared to pattern 3. Pattern 6 will have 4
  // segments in common, while pattern 9 will have 5 segments in common. By
  // sorting these 2 based on the number of common segments with pattern 3, we
  // can determine which are patterns 6 and 9.
  const lettersFrom3 = lettersFrom(values[3])
  with6Segments.sort(
    (a, b) => a.match(lettersFrom3).length - b.match(lettersFrom3).length
  )
  values[6] = with6Segments[0]
  values[9] = with6Segments[1]

  // Finally, we can map each digit to a pattern, and figure out the resulting
  // number (provided as a string in case it starts with a 0).
  return encodedDigits
    .map(encodedDigit => values.findIndex(value => value === encodedDigit))
    .join('')
}

const total = lines => lines.map(decode).reduce((a, b) => a + Number(b), 0)

module.exports = { count, decode, total }
