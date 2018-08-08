import Victor from 'victor'

export function cos(time, loopTime, offset = 0) {
  return Math.cos((time + offset) / loopTime * Math.PI * 2)
}

export function range(a, b, value) {
  const halfDistance = (b - a) * 0.5
  return value * halfDistance + halfDistance + a
}

export function cosRange(time, a = -1, b = 1, loopTime = 1, offset = 0) {
  return range(a, b, cos(time, loopTime, offset))
}

export function random(a, b) {
  return Math.random() * (b - a) + a
}

export function spread(value, min, max) {
  const scale = max - min
  return min + value * scale
}

export function interpolate(a, b, strength) {
  return a * (1 - strength) + b * strength
}

export function set(victor, x, y) {
  victor.x = x || 0
  victor.y = y || 0
  return victor
}

export function sliceBezier(points, t) {
  const [x1, y1, x2, y2, x3, y3, x4, y4] = points
  const x12 = (x2 - x1) * t + x1
  const y12 = (y2 - y1) * t + y1
  const x23 = (x3 - x2) * t + x2
  const y23 = (y3 - y2) * t + y2
  const x34 = (x4 - x3) * t + x3
  const y34 = (y4 - y3) * t + y3
  const x123 = (x23 - x12) * t + x12
  const y123 = (y23 - y12) * t + y12
  const x234 = (x34 - x23) * t + x23
  const y234 = (y34 - y23) * t + y23
  const x = (x234 - x123) * t + x123
  const y = (y234 - y123) * t + y123

  return { x, y }
}

export class Line {
  constructor(p1, p1c, p2, p2c) {
    this.p1 = p1 || new Victor()
    this.p1c = p1c || new Victor()
    this.p2 = p2 || new Victor()
    this.p2c = p2c || new Victor()
  }

  interpolate(line1, line2, factor) {
    this.p1.copy(line1.p1).mix(line2.p1, factor)
    this.p1c.copy(line1.p1c).mix(line2.p1c, factor)
    this.p2.copy(line1.p2).mix(line2.p2, factor)
    this.p2c.copy(line1.p2c).mix(line2.p2c, factor)
    return this
  }

  multiply(scale) {
    this.p1.multiply(scale)
    this.p1c.multiply(scale)
    this.p2.multiply(scale)
    this.p2c.multiply(scale)
    return this
  }
}
