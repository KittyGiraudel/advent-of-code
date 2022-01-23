const $ = require('../../helpers')

class Network {
  constructor(instructions) {
    this.nodes = []
    this.instructions = instructions
  }

  addNode(node) {
    node.boot(this.instructions).on('send', value => this.dispatch(node, value))

    this.nodes.push(node)
  }

  dispatch(node, value) {
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
  constructor(id) {
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

  boot(instructions) {
    this.instructions = instructions
    return this
  }

  on(eventName, listener) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(listener)
    return this
  }

  fire(eventName, value) {
    this.counters[eventName] = this.counters[eventName] || 0
    this.counters[eventName]++

    const listeners = this.listeners[eventName] || []
    listeners.forEach(listener => listener(value))

    return this
  }

  get(key) {
    return this.registers[key] ?? +key
  }

  set(key, value) {
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

  register(value) {
    this.queue.unshift(value)
    this.waiting = false
  }
}

const run = instructions => {
  const network = new Network(instructions)

  network.addNode(new Computer(0))
  network.addNode(new Computer(1))

  while (!network.halted) network.run()

  return $.peek(network.nodes).counters.send
}

module.exports = { run }
