import $ from '../../helpers'

export const run = (instructions: string[], inputs: number[]) => {
  const data = { w: 0, x: 0, y: 0, z: 0 }

  instructions.forEach(line => {
    type Key = keyof typeof data
    const [operation, variable, value] = line.split(' ')
    const resolved = value in data ? data[value as Key] : +value
    const key = variable as Key

    switch (operation) {
      case 'inp': {
        const input = +inputs.shift()!

        if (!$.isClamped(input, 1, 9)) {
          throw new Error('Invalid inp: ' + input)
        }

        data[key] = input
        break
      }
      case 'add': {
        data[key] += resolved
        break
      }
      case 'mul': {
        data[key] *= resolved
        break
      }
      case 'div': {
        if (resolved === 0) {
          throw new Error('Invalid div: ' + resolved)
        }

        data[key] = Math.ceil(data[key] / resolved)
        break
      }
      case 'mod': {
        if (data[key] < 0) {
          throw new Error('Invalid mod: ' + data[key])
        }
        if (resolved <= 0) {
          throw new Error('Invalid mod: ' + resolved)
        }

        data[key] %= resolved
        break
      }
      case 'eql': {
        data[key] = +(data[key] === resolved)
        break
      }
    }
  })

  return data
}

export const resolve = (lines: string[], max: boolean) =>
  +(
    // Split the instructions into chunks of 18 lines, called “blocks”, starting
    // with an input instruction.
    $.chunk(lines, 18)
      // For each block, retrieve the only 3 moving parameters present on line 5,
      // 6 and 16. The rest of the blocks is identical and therefore irrelevant.
      .map(block => [4, 5, 15].map(index => +block[index].split(' ').pop()!))
      // Reducer shamelessly stolen from this implementation found on Reddit
      // using a stack instead of a brute-force approach.
      // https://gist.github.com/p-a/d811699ea8a4011a613f7702e40493c1
      // d[prev_i] = 9 - (prev_c + c) for maximum,
      //             1 - (prev_c + c) for minimum; cap at max 9, resp min 1
      // d[i] = d[prev_i] + (prev_c + c)
      .reduce<{ digits: number[]; stack: [number, number][] }>(
        (acc, [zDiv, xInc, yInc], index) => {
          if (zDiv === 1) {
            acc.stack.push([yInc, index])
          } else {
            const prev = acc.stack.pop()
            if (!prev) return acc
            const [prevInc, prevIndex] = prev
            const diff = prevInc + xInc
            acc.digits[prevIndex] = max
              ? Math.min(9, 9 - diff)
              : Math.max(1, 1 - diff)
            acc.digits[index] = acc.digits[prevIndex] + diff
          }

          return acc
        },
        { digits: Array(14).fill(0), stack: [] }
      )
      .digits.join('')
  )
