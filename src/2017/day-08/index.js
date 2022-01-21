const $ = require('../../helpers')

// This function takes in an array of raw instructions, executes every
// instruction to manipulate the value of registers (starting at 0), and return
// the maximum value reached by a register.
// Write-up: https://kittygiraudel.com/2022/01/21/exploiting-javascript-quirks-for-fun-and-profit/
const run = lines => {
  let absoluteMax = -Infinity
  const registers = {}

  lines.forEach(line => {
    const [action, condition] = line.split(' if ')
    const expression = action.replace('inc', '+=').replace('dec', '-=')

    ;(condition + ' ' + expression).match(/\w+/g).forEach(variable => {
      registers[variable] = registers[variable] || 0
    })

    with (registers) eval(`if (${condition}) ${expression}`)

    absoluteMax = Math.max(absoluteMax, ...Object.values(registers))
  })

  return { currentMax: Math.max(...Object.values(registers)), absoluteMax }
}

module.exports = { run }
