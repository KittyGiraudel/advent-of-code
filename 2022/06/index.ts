import $ from '../../helpers'

export const findMarker = (input: string, length = 4) => {
  for (let i = length; i < input.length; i++) {
    const slice = input.slice(i - length, i)
    const unique = $.unique(Array.from(slice))

    if (unique.length === length) return i
  }

  return null
}
