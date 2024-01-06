import $ from '../../helpers'

type Packetish = {
  id: number
  value: number | undefined | null
  version: number
  packets: Packetish[]
}

type Packt = {
  version: number
  id: number
  packets: Packt[]
  rest: string
  value: number | null
}

const parseHex = (hex: string) => Array.from(hex, $.hexToBin).join('')

const decode = (string: string) => {
  // For a given packet, the version is expressed over the first 3 bits, and the
  // ID over the 3 next ones. Anything after that is unclear, and will depend on
  // whether or not the packet is a value (ID=4) or an operator.
  const packet: Packt = {
    version: parseInt(string.slice(0, 3), 2),
    id: parseInt(string.slice(3, 6), 2),
    packets: [],
    rest: string.slice(6),
    value: null,
  }

  // If the packet holds the value, we need to parse the following bits in the
  // string in chunks of 5 bits (the first bit of each chunk being an indicator
  // that can be removed and not part of the encoded digit), until we get a
  // chunk starting with a 0. This is always the last chunk, which indicates the
  // end of the packet. Anything after that chunk is the beginning of a new
  // packet.
  if (packet.id === 4) {
    let binary = ''

    const captureNextChunk = () => {
      binary += packet.rest.slice(1, 5)
      packet.rest = packet.rest.slice(5)
    }

    while (packet.rest.startsWith('1')) captureNextChunk()
    captureNextChunk()

    // Decode the encoded binary value in decimal.
    packet.value = parseInt(binary, 2)

    return packet
  }

  // If the packet holds an operator, the next bit in line is the “length type
  // ID”, so remove it from the rest and check whether it’s a 0 or 1, which
  // determines what is left to do.
  const lengthTypeId = +packet.rest[0]
  packet.rest = packet.rest.slice(1)

  // If the length type ID is a 0, the next 15 bits holds a number in binary
  // that dictates how many more bits after that are dedicated to this packet.
  if (lengthTypeId === 0) {
    const subPacketsLength = parseInt(packet.rest.slice(0, 15), 2)

    // This slice of the string holds one or more packets, so parse it and push
    // packets as children of the current one, until it’s empty or made only of
    // padding zeroes.
    let rest = packet.rest.slice(15, 15 + subPacketsLength)

    while (rest) {
      const subPacket = decode(rest)
      packet.packets.push(subPacket)
      rest = subPacket.rest
    }

    // Once the process is over, move the cursor after the processed part for
    // the next packet to take over.
    packet.rest = packet.rest.slice(15 + subPacketsLength)
  }

  // If the length type ID is a 1, the next 11 bits hold a number in binary that
  // dictates how many sub-packets are comprised within this one.
  else if (lengthTypeId === 1) {
    const amountOfSubPackets = parseInt(packet.rest.slice(0, 11), 2)
    packet.rest = packet.rest.slice(11)

    // Iterate once per expected packet, decode it, store it, and move the
    // cursor to decode the next packet.
    while (packet.packets.length < amountOfSubPackets) {
      const subPacket = decode(packet.rest)
      packet.packets.push(subPacket)
      packet.rest = subPacket.rest
    }
  }

  return packet
}

const sumVersions = ({ version, packets }: Packetish): number =>
  packets.reduce((total, packet) => total + sumVersions(packet), version)

const getPacketValue = (packet: Packetish): number => {
  const { id, packets, value } = packet

  switch (id) {
    case 0:
      return $.sum(packets.map(getPacketValue))
    case 1:
      return $.product(packets.map(getPacketValue))
    case 2:
      return Math.min(...packets.map(getPacketValue))
    case 3:
      return Math.max(...packets.map(getPacketValue))
    case 5:
      return +(getPacketValue(packets[0]) > getPacketValue(packets[1]))
    case 6:
      return +(getPacketValue(packets[0]) < getPacketValue(packets[1]))
    case 7:
      return +(getPacketValue(packets[0]) === getPacketValue(packets[1]))
    default:
      return value as number
  }
}

const render = (packet: Packetish, depth: number = 1): string => {
  const SYMBOLS = ['+', '*', '↓', '↑', ' ', '>', '<', '=']
  const symbol = SYMBOLS[packet.id]
  const value = getPacketValue(packet)

  return packet.packets.reduce<string>(
    (acc, packet, index, packets) =>
      acc +
      '\n' +
      '│   '.repeat(depth) +
      (index < packets.length - 1 ? '├──' : '└──') +
      ' ' +
      render(packet, depth + 1),
    String(packet.value) || `${symbol}  [{${value}}]`
  )
}

export const getVersionSums = (input: string) =>
  sumVersions(decode(parseHex(input)))
export const evaluate = (input: string) =>
  getPacketValue(decode(parseHex(input)))
export const visualize = (input: string) => render(decode(parseHex(input)))

// Class-oriented approach authored once finished based on that elegant version
// found on GitHub: https://github.com/Awjin/advent-of-code/blob/main/2021/16/utils.ts
class Packet {
  version: number
  id: number
  value: number | undefined
  packets: Packet[]

  constructor(version: number, id: number, value?: number) {
    this.version = version
    this.id = id
    this.value = value
    this.packets = []
  }

  sumVersions(): number {
    return this.packets.reduce(
      (total, packet) => total + packet.sumVersions(),
      this.version
    )
  }

  getValue() {
    const { id, packets, value } = this

    switch (id) {
      case 0:
        return $.sum(packets.map(getPacketValue))
      case 1:
        return $.product(packets.map(getPacketValue))
      case 2:
        return Math.min(...packets.map(getPacketValue))
      case 3:
        return Math.max(...packets.map(getPacketValue))
      case 5:
        return +(getPacketValue(packets[0]) > getPacketValue(packets[1]))
      case 6:
        return +(getPacketValue(packets[0]) < getPacketValue(packets[1]))
      case 7:
        return +(getPacketValue(packets[0]) === getPacketValue(packets[1]))
      default:
        return value
    }
  }
}

export class Decoder {
  bits: string
  packet: Packet

  constructor(hex: string) {
    this.bits = parseHex(hex)
    this.packet = this.decode()
  }

  decode() {
    const version = this.consumeNum(3)
    const id = this.consumeNum(3)

    if (id === 4) return new Packet(version, id, this.consumeLiteral())

    const packet = new Packet(version, id)
    const lengthType = this.consumeNum(1)

    if (lengthType === 0) {
      const subPacketLength = this.consumeNum(15)
      const start = this.bits.length
      while (start - this.bits.length < subPacketLength)
        packet.packets.push(this.decode())
    } else {
      const subPacketCount = this.consumeNum(11)
      while (packet.packets.length < subPacketCount)
        packet.packets.push(this.decode())
    }

    return packet
  }

  consume(length: number) {
    const string = this.bits.slice(0, length)
    this.bits = this.bits.slice(length)
    return string
  }

  consumeNum(length: number) {
    return parseInt(this.consume(length), 2)
  }

  consumeLiteral() {
    let bits = ''
    let incomplete = true

    while (incomplete) {
      incomplete = this.consumeNum(1) === 1
      bits += this.consume(4)
    }

    return parseInt(bits, 2)
  }
}
