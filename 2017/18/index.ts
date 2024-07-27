class Network {
  instructions: string[]
  nodes: Computer[]

  constructor(instructions: string[]) {
    this.nodes = []
    this.instructions = instructions
  }

  addNode(node: Computer) {
    node.boot(this.instructions)
    node.on('send', value => this.dispatch(node, value))

    this.nodes.push(node)
  }

  dispatch(node: Computer, value: number) {
    this.nodes
      .filter(({ id }) => node.id !== id)
      .forEach(node => node.register(value))
  }

  run() {
    this.nodes.forEach(node => node.next())
  }

  get halted() {
    return (
      this.nodes.every(node => node.halted) ||
      this.nodes.every(node => node.idle)
    )
  }
}

type Listener = (value: number) => void

class Computer {
  id: number
  registers: { p: number }
  queue: number[]
  pointer: number
  counters: Record<string, number>
  listeners: Record<string, Listener[]>
  instructions: string[]
  waiting: boolean

  constructor(id: number) {
    this.id = id
    this.registers = { p: id }
    this.queue = []
    this.pointer = 0
    this.counters = {}
    this.listeners = {}
    this.instructions = []
    this.waiting = false
  }

  get halted() {
    return this.pointer >= this.instructions.length
  }

  get idle() {
    return (
      this.queue.length === 0 &&
      this.instructions[this.pointer].startsWith('rcv')
    )
  }

  boot(instructions: string[]) {
    this.instructions = instructions
    return this
  }

  on(eventName: string, listener: (value: number) => void) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(listener)
    return this
  }

  fire(eventName: string, value: number) {
    this.counters[eventName] = this.counters[eventName] || 0
    this.counters[eventName]++

    const listeners = this.listeners[eventName] || []
    listeners.forEach((listener: Listener) => listener(value))

    return this
  }

  get(key: string | number) {
    type Key = keyof typeof this.registers
    return this.registers[key as Key] ?? +key
  }

  set(key: string, value: number) {
    type Key = keyof typeof this.registers
    if (!(key in this.registers)) this.registers[key as Key] = 0
    this.registers[key as Key] = value
  }

  next() {
    const instruction = this.instructions[this.pointer]
    const [op, a, b] = instruction.split(' ')

    if (op === 'set') this.set(a, this.get(b))
    else if (op === 'add') this.set(a, this.get(a) + this.get(b))
    else if (op === 'mul') this.set(a, this.get(a) * this.get(b))
    else if (op === 'mod') this.set(a, this.get(a) % this.get(b))
    else if (op === 'jgz') this.pointer += this.get(a) > 0 ? this.get(b) - 1 : 0
    else if (op === 'snd') this.fire('send', this.get(a))
    else if (op === 'rcv') {
      if (this.queue.length) this.set(a, this.queue.pop()!)
      else return
    }

    this.pointer++
  }

  register(value: number) {
    this.queue.unshift(value)
    this.waiting = false
  }
}

export const run = (instructions: string[]) => {
  const network = new Network(instructions)

  network.addNode(new Computer(0))
  network.addNode(new Computer(1))

  while (!network.halted) network.run()

  return network.nodes[network.nodes.length - 1].counters.send
}
