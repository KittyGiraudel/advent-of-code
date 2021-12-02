const proceed = instructions =>
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

const proceedWithAim = instructions =>
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

module.exports = { proceed, proceedWithAim }
