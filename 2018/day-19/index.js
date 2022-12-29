import $ from '../../helpers'

// Mutative version of day 16’s opcodes for efficiency.
const OPCODES = {
  addr: (regs, [A, B, C]) => (regs[C] = regs[A] + regs[B]),
  addi: (regs, [A, B, C]) => (regs[C] = regs[A] + B),
  mulr: (regs, [A, B, C]) => (regs[C] = regs[A] * regs[B]),
  muli: (regs, [A, B, C]) => (regs[C] = regs[A] * B),
  banr: (regs, [A, B, C]) => (regs[C] = regs[A] & regs[B]),
  bani: (regs, [A, B, C]) => (regs[C] = regs[A] & B),
  borr: (regs, [A, B, C]) => (regs[C] = regs[A] | regs[B]),
  bori: (regs, [A, B, C]) => (regs[C] = regs[A] | B),
  setr: (regs, [A, B, C]) => (regs[C] = regs[A]),
  seti: (regs, [A, B, C]) => (regs[C] = A),
  gtir: (regs, [A, B, C]) => (regs[C] = +(A > regs[B])),
  gtri: (regs, [A, B, C]) => (regs[C] = +(regs[A] > B)),
  gtrr: (regs, [A, B, C]) => (regs[C] = +(regs[A] > regs[B])),
  eqir: (regs, [A, B, C]) => (regs[C] = +(A === regs[B])),
  eqri: (regs, [A, B, C]) => (regs[C] = +(regs[A] === B)),
  eqrr: (regs, [A, B, C]) => (regs[C] = +(regs[A] === regs[B])),
}

// I unfortunately couldn’t reverse-engineer the VM code to find out the
// solution. Ultimately, I followed this explanation and adapted the final
// Python code to get the result. It goes above my head to be honest.
// https://nbviewer.org/github/mjpieters/adventofcode/blob/master/2018/Day%2019.ipynb
// console.log(sumFactors(10551387))
const sumFactors = n => {
  const result = []

  for (let i = 1; i < n ** 0.5 + 1; i++)
    n % i || result.push(i, Math.ceil(n / i))

  return $.sum(result)
}

export const run = (input, init = 0) => {
  const registers = new Int32Array(6)
  registers[0] = init

  const [pointer, ...lines] = input
  const ipr = +pointer.replace('#ip ', '')
  const bound = lines.length
  const instructions = lines.map(a =>
    a.split(' ').map(a => (isNaN(+a) ? a : +a))
  )
  let ip = 0

  while (ip < bound) {
    const [opcode, ...args] = instructions[ip]
    registers[ipr] = ip
    OPCODES[opcode](registers, args)
    ip = registers[ipr] + 1
  }

  return registers[0]
}
