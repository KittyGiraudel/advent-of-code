import $ from '../../helpers'
import { Intcode } from '../day-05'

class Network {
  constructor(input, size, withLogs) {
    this.outputs = []
    this.NAT = null
    this.nodes = $.array(size).map((_, i) => this.createNode(i, input))
    this.withLogs = withLogs
  }

  log(...args) {
    if (this.withLogs) console.log(...args)
  }

  createNode(index, input) {
    this.log('Booting up computer', index)

    return {
      computer: new Intcode(input).setInput(index),
      queue: [],
    }
  }

  runNode(node) {
    const { computer, queue } = node
    const packet = queue.pop() || -1
    const output = computer.setInput(packet).run().getOutput()
    const isIdle = packet === -1 && !output.length

    if (output.length) {
      $.chunk(output, 3).forEach(([address, ...coords]) => {
        if (address === 255) this.updateNAT(coords)
        else {
          this.nodes[address].queue.push(coords)
          // This next line is important: the only way to get the correct result
          // is to let the receiver process the new packet immediately. Waiting
          // for the next loop run causes the result to be incorrect.
          this.runNode(this.nodes[address])
        }
      })
    }

    return isIdle
  }

  run() {
    const isIdle = this.nodes.reduce(
      (idle, node) => idle && this.runNode(node),
      true
    )

    if (isIdle) this.wakeUp()

    return this
  }

  updateNAT(coords) {
    this.log('Updating NAT with', coords[1])
    this.NAT = coords
  }

  wakeUp() {
    this.log('Reviving idle network with', this.NAT[1])
    this.nodes[0].queue.push(this.NAT)
    this.outputs.unshift(this.NAT[1])

    return this
  }

  isDone() {
    return this.outputs.length >= 2 && this.outputs[0] === this.outputs[1]
  }

  getOutput() {
    return this.outputs
  }
}

export const boot = (input, size = 50) => {
  const network = new Network(input, size)

  while (!network.isDone()) network.run()

  return network.getOutput()
}
