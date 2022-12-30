const lookAndSay = (input: string): string => {
  let output = ''
  let count = 1

  for (let i = 0; i < input.length; i++) {
    if (input[i] === input[i + 1]) count++
    else {
      output += count + input[i]
      count = 1
    }
  }

  return output
}

export const run = (input: string, n: number = 1): number => {
  while (n--) {
    // The loop version is unsurprisingly faster than the regular expression
    // version.
    // input = input.replace(/(\d)\1*/g, (match, char) => match.length + char)
    input = lookAndSay(input)
  }

  return input.length
}
