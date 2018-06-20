import { offsetTop } from '../../utilities'

class SmoothScroll {
  static duration = 500

  to = (target, cb = () => {}) => {
    this.startY = window.pageYOffset
    this.targetY = offsetTop(target)
    this.deltaY = this.targetY - this.startY

    this.t0 = Date.now()
    this.t1 = this.t0 + SmoothScroll.duration

    this.animation = requestAnimationFrame(() => this.onTick(cb))
  }

  onTick = (cb) => {
    const now = Date.now()
    const t = (now - this.t0) / (this.t1 - this.t0)
    const point = SmoothScroll.easeInOut(t)

    window.scrollTo(0, Math.round(this.startY + (this.deltaY * point)))

    if (now < this.t1) {
      requestAnimationFrame(() => this.onTick(cb))
    } else {
      requestAnimationFrame(cb)
    }
  }

  static easeInOut(t) {
    return t < 0.5 ? 2 * t * t : t * (4 - 2 * t) - 1
  }
}

export default new SmoothScroll()
