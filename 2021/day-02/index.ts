export const proceed = (
  instructions: Array<string>
): { position: number; depth: number } =>
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

export const proceedWithAim = (
  instructions: Array<string>
): { position: number; depth: number; aim: number } =>
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
