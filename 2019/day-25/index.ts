import $ from '../../helpers'
import { Intcode } from '../day-05'

export const inspect = (input: string) => {
  const computer = new Intcode(input).run()

  // Played manually because a) nothing beats the excitment of old school text-
  // based RPG games and b) I am not smart enough to come up with a programmatic
  // solver. Below is the series of moves, starting in Hull Breach, that got me
  // to pass the security checkpoint.
  // SC — HC — NA                 SC = Security Checkpoint NA = Navigation
  //           |                  HC = Hot Chocolate Fountain
  //           AR — OB — HW       AR = Arcade              OB = Observatory
  //           |    |             HW = Hallway
  //           |    |    SB       SB = Sick Bay
  //           |    |    |
  //           SL   ST — GW       SL = Science Lab         ST = Stables
  //                |    |        GW = Gift Wrapping Station
  //           CQ — HB   EN — PA  CQ = Crew Quartes        HB = Hull Breach
  //           |    |             EN = Engineering         PA = Passages
  //           CO — HD            CO = Corrider            HD = Holodec
  const moves = [
    'north', // Go north to Stables
    'east', // Go east to Gift Wrapping Station
    'south', // Go south to Engineering
    'take hypercube', // Take in Engineering
    'north', // Go north to Goft Wrapping Station
    'west', // Go west to Stables
    'north', // Go north to Observatory
    'east', // Go east to Hallways
    'take tambourine', // Take in Hallways
    'west', // Go west to Observatory
    'west', // Go west to Arcade
    'take spool of cat6', // Take in Arcade
    'north', // Go north to Navigation
    'take weather machine', // Take in Navigation
    'west', // Go west to Chocolate Foutain
    'west', // Go west to Security Checkpoint
    'west', // Pass the Security Checkpoint
  ]
    .map(instruction => $.toAscii(instruction))
    .map(code => computer.setInput(code).run().getOutput() as number[])
    .map(output => $.fromAscii(output))

  return +moves.pop().match(/\d+/)[0]
}
