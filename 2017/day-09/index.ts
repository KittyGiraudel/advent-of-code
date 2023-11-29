export const run = (string: string) => {
  let trash = false
  let depth = 0
  let score = 0
  let chars = 0

  for (let i = 0; i < string.length; i++) {
    const char = string[i]

    // If in the middle of a piece of trash, skip any character that lives
    // behind a `!`, close the trash when reaching `>`, otherwise count the
    // character.
    if (trash) {
      if (char === '!') i++
      else if (char === '>') trash = false
      else chars++
    } else {
      // If not in the middle of a piece of trash and reaching `<`, turn on trash
      // mode. When reaching `{`, increase the depth. When reaching `}`, decrease
      // the depth and increase the score.
      if (char === '<') trash = true
      if (char === '{') depth++
      if (char === '}') score += depth--
    }
  }

  return { score, chars }
}
