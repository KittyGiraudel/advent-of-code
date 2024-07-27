const proceed = (instructions: string[]) =>
  instructions
    .map(instruction => instruction.split(' '))
    .reduce(
      (acc, [direction, value]) => {
        if (direction === 'forward') acc.position += +value
        else if (direction === 'down') acc.depth += +value
        else if (direction === 'up') acc.depth -= +value
        return acc
      },
      { position: 0, depth: 0 }
    )

const proceedWithAim = (instructions: string[]) =>
  instructions
    .map(instruction => instruction.split(' '))
    .reduce(
      (acc, [direction, value]) => {
        if (direction === 'forward') {
          acc.position += +value
          acc.depth += acc.aim * +value
        } else if (direction === 'down') acc.aim += +value
        else if (direction === 'up') acc.aim -= +value
        return acc
      },
      { position: 0, depth: 0, aim: 0 }
    )

export const run = (input: string[], part2 = false) => {
  const { depth, position } = part2 ? proceedWithAim(input) : proceed(input)

  return depth * position
}
