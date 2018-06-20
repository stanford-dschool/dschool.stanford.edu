import Victor from 'victor'
import { Line, set, cosRange } from './helpers'

const designSize = new Victor(1440, 720)

function designPattern({ a1, a1c, a2, a2c, b1, b1c, b2, b2c }) {
  const line1 = new Line()
  const line2 = new Line()
  const scale = new Victor()

  return ({ width, height }) => {
    scale.x = width / designSize.x
    scale.y = Math.min(height / designSize.y, width / designSize.y, 1)
    line1.p1.copy(a1)
    set(line1.p1c, a1c[0]).rotateDeg(-a1c[1]).add(line1.p1)
    line1.p2.copy(a2)
    set(line1.p2c, a2c[0]).rotateDeg(-a2c[1]).add(line1.p2)
    line2.p1.copy(b1)
    set(line2.p1c, b1c[0]).rotateDeg(-b1c[1]).add(line2.p1)
    line2.p2.copy(b2)
    set(line2.p2c, b2c[0]).rotateDeg(-b2c[1]).add(line2.p2)
    return {
      line1: line1.multiply(scale),
      line2: line2.multiply(scale),
    }
  }
}

function interpolatePatterns(pattern1, pattern2) {
  const interpolated1 = new Line()
  const interpolated2 = new Line()

  return (context) => {
    const lines1 = pattern1(context)
    const lines2 = pattern2(context)
    const factor = cosRange(context.time, -0.2, 1.2, 18)

    return {
      line1: interpolated1.interpolate(lines1.line1, lines2.line1, factor),
      line2: interpolated2.interpolate(lines1.line2, lines2.line2, factor),
    }
  }
}

export const designPatterns = [
  designPattern({
    a1: new Victor(0, 54),
    a1c: [241, 43],
    a2: new Victor(1440, 432),
    a2c: [1290, -144],
    b1: new Victor(0, 445),
    b1c: [1600, 23.5],
    b2: new Victor(1440, 670),
    b2c: [950, 174],
  }),
  designPattern({
    a1: new Victor(0, 54),
    a1c: [241, 43],
    a2: new Victor(1440, 108),
    a2c: [1290, -135],
    b1: new Victor(0, 647),
    b1c: [940, 37],
    b2: new Victor(1440, 659),
    b2c: [651, 94],
  }),
  designPattern({
    a1: new Victor(0, 570),
    a1c: [643, 134],
    a2: new Victor(1457, 588),
    a2c: [1607, 157],
    b1: new Victor(-50, 600),
    b1c: [1290, -36],
    b2: new Victor(1457, 54),
    b2c: [377, -123],
  }),
  designPattern({
    a1: new Victor(0, 400),
    a1c: [640, 116],
    a2: new Victor(1440, 2),
    a2c: [432, -163],
    b1: new Victor(-40, 463),
    b1c: [820, -59],
    b2: new Victor(1440, 262),
    b2c: [316, -166],
  }),
  designPattern({
    a1: new Victor(0, 302),
    a1c: [995, 46],
    a2: new Victor(1440, 67),
    a2c: [1320, -157],
    b1: new Victor(0, 772),
    b1c: [1897, 5.5],
    b2: new Victor(1440, 316),
    b2c: [521, -154],
  }),
  designPattern({
    a1: new Victor(0, 96),
    a1c: [847, 1],
    a2: new Victor(1440, 314),
    a2c: [866, -167],
    b1: new Victor(0, 666),
    b1c: [970, -3.5],
    b2: new Victor(1440, 719),
    b2c: [526, -162],
  }),
]

export const interpolatedPatterns = [
  interpolatePatterns(designPatterns[0], designPatterns[1]),
  interpolatePatterns(designPatterns[2], designPatterns[3]),
  interpolatePatterns(designPatterns[4], designPatterns[5]),
]

export default interpolatedPatterns
