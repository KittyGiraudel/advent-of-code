import $ from '../../helpers'
import { Coords } from '../../types'
import { Intcode } from '../05'

type Node = {
  computer: Intcode
  queue: Coords[]
}

class Network {
  outputs: number[]
  NAT: Coords
  nodes: Node[]
  withLogs: boolean

  constructor(input: string, size: number, withLogs: boolean = false) {
    this.outputs = []
    this.NAT = [0, 0]
    this.nodes = $.array(size).map((_, i) => this.createNode(i, input))
    this.withLogs = withLogs
  }

  log(...args: unknown[]) {
    if (this.withLogs) console.log(...args)
  }

  createNode(index: number, input: string) {
    this.log('Booting up computer', index)

    return {
      computer: new Intcode(input).setInput(index),
      queue: [],
    } as Node
  }

  runNode(node: Node) {
    const { computer, queue } = node
    const packet = queue.pop() || -1
    const output = computer.setInput(packet).run().getOutput()
    const isIdle = packet === -1 && !output.length

    if (output.length) {
      $.chunk(output, 3).forEach(([address, ri, ci]) => {
        if (address === 255) this.updateNAT([ri, ci] as Coords)
        else {
          this.nodes[address].queue.push([ri, ci])
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

  updateNAT(coords: Coords) {
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

export const boot = (input: string, size: number = 50) => {
  const network = new Network(input, size)

  while (!network.isDone()) network.run()

  return network.getOutput()
}
