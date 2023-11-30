import $ from '../../helpers'

const size = (string: string): number => {
  const closing = string.indexOf(')')

  // If the given string doesn’t have any sub-marker, its length can be returned
  // as in. For instance, `ABC` is 3.
  if (closing === -1) {
    return string.length
  }

  // The size of the slice is the marker count times the size of its reach
  // (recursively considering nested markers), plus the size of the rest. This
  // last part is important as we need to consider successive markers just as
  // much as nested markers. For instance, in the following expression, `(25x3)`
  // is the top level marker containing nested markers, but `(3x3)`, `(2x3)` and
  // `(5x2)` are consecutive independant markers within the same expression and
  // all need to be sized.
  // E.g: (25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX
  const marker = string.slice(0, closing + 1)
  const after = string.slice(closing + 1)
  const [length, count] = $.safeMatch(marker, /\d+/g).map(Number)
  const reach = after.slice(0, length)
  const rest = after.slice(length + 1)

  return count * size(reach) + size(rest)
}

export const run = (input: string) => {
  let marker = ''

  for (let i = 0; i < input.length; i++) {
    const char = input[i]

    if (char === ')') {
      const [length, count] = $.safeMatch(marker, /\d+/g).map(Number)
      // Replace the input by taking everything until the beginning of the
      // marker (before the open parens), then insert the replacement string,
      // then the remaining of the string starting *after* the reach.
      const before = input.slice(0, i - marker.length)
      const after = input.slice(i + 1)
      const replacement = after.slice(0, length).repeat(count)

      input = before + replacement + after.slice(length)
      i = (before + replacement).length - 1
      marker = ''
    } else if (char === '(' || marker) marker += char
  }

  return input.length
}

export const run2 = (input: string) => {
  let marker = ''
  let total = 0

  for (let i = 0; i < input.length; i++) {
    const char = input[i]

    // When wrapping up a marker, compute its expected size by recursively
    // walking it for sub-markers. Once done, move the cursor beyond its reach
    // and look for the next marker.
    if (char === ')') {
      const [length] = $.safeMatch(marker, /\d+/g).map(Number)
      // The “reach” is the slice of the string that begins with a marker and
      // ends at the end of its length. For instance, `(3x1)ABC`.
      const reach = marker + char + input.slice(i + 1, i + 1 + length)
      total += size(reach)
      i += length
      marker = ''
    } else if (char === '(' || marker) marker += char
    else total++
  }

  return total
}
