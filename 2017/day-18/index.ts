import $ from '../../helpers'

class Network {
  instructions: string[]
  nodes: Computer[]

  constructor(instructions: string[]) {
    this.nodes = []
    this.instructions = instructions
  }

  addNode(node: Computer) {
    node
      .boot(this.instructions)
      .on('send', (value: number) => this.dispatch(node, value))

    this.nodes.push(node)
  }

  dispatch(node: Computer, value: number) {
    this.nodes
      .filter(n => node.id !== n.id)
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

class Computer {
  id: number
  registers: { p: number }
  queue: number[]
  pointer: number
  counters: Record<string, number>
  listeners: Record<string, Function[]>
  instructions: string[]
  waiting: boolean

  constructor(id: number) {
    this.id = id
    this.registers = { p: id }
    this.queue = []
    this.pointer = 0
    this.counters = {}
    this.listeners = {}
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

  on(eventName: string, listener: Function) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(listener)
    return this
  }

  fire(eventName: string, value: number) {
    this.counters[eventName] = this.counters[eventName] || 0
    this.counters[eventName]++

    const listeners = this.listeners[eventName] || []
    listeners.forEach((listener: Function) => listener(value))

    return this
  }

  get(key: string | number): number {
    return this.registers[key] ?? +key
  }

  set(key: string, value: number) {
    if (!(key in this.registers)) this.registers[key] = 0
    this.registers[key] = value
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
      if (this.queue.length) this.set(a, this.queue.pop())
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

  return network.nodes.at(-1).counters.send
}
