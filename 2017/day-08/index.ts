// This function takes in an array of raw instructions, executes every
// instruction to manipulate the value of registers (starting at 0), and return
// the maximum value reached by a register.
// Write-up: https://kittygiraudel.com/2022/01/21/exploiting-javascript-quirks-for-fun-and-profit/
export const run = (lines: Array<string>) => {
  let absoluteMax = -Infinity
  const registers: Record<string, number> = {}

  lines.forEach(line => {
    let [expression, condition] = line.split(' if ')

    expression = expression.replace('inc', '+=').replace('dec', '-=')

    // The original version of this function used to rely on the `with`
    // statement as explained in the write-up above. Unfortunately this no
    // longer works after having moved the project to ES Modules since they
    // imply strict mode, which forbids the `with` statement. TypeScript follows
    // suite and fails at compile time. So we have to prefix every variable name
    // with `registers.` to make use of our object.
    expression = expression.replace(/([a-z]+)/, 'registers.$1')
    condition = condition.replace(/([a-z]+)/, 'registers.$1')

    const code = condition + ' ' + expression
    code.match(/\w+/g)?.forEach(variable => {
      registers[variable] = registers[variable] || 0
    })

    /* with (registers) */ eval(`if (${condition}) ${expression}`)

    absoluteMax = Math.max(absoluteMax, ...Object.values(registers))
  })

  return { currentMax: Math.max(...Object.values(registers)), absoluteMax }
}
