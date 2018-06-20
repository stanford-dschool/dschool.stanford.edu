import Physics from 'physics/src'
import DOMComponent from '../dom-component'
import patterns from './patterns'
import { simpleDebounce, Line, sliceBezier } from './helpers'

const LINE_COUNT = 50
const PIVOT_COUNT = 40
const MOVE_SPEED = 0.8
const MODE_ATTRACT = 0
const MODE_AVOID = 1
const MODE_CRAZY = 2
const COLORS = ['rgba(242, 64, 52, 0.3)', 'rgba(246, 101, 51, 0.3)', 'rgba(255, 171, 64, 0.3)', 'rgba(62, 204, 119, 0.3)', 'rgba(108, 190, 227, 0.3)', 'rgba(62, 102, 130, 0.3)']

class HeroLines extends DOMComponent {
  static selector = '[data-hero-lines]'

  init() {
    this.context = this.root.getContext('2d')
    this.time = 0
    this.config = HeroLines.createConfig()
    this.mouseX = null
    this.mouseY = null
    this.mouseMoveRatio = null
    this.isVisible = false
    this.lines = []
    this.pivots = []
    this.pivotsFixed = []
    this.attractions = []
    this.pixelRatio = window.devicePixelRatio
    this.physics = new Physics(0.1, 0.01)
    this.big = this.physics.makeParticle(0.1, 0.0, 0.0, 0.0)
    this.initiated = false
    this.mode = 0
    this.createLines()

    if (this.config.interactive) {
      this.onMouseMove = this.onMouseMove.bind(this)
      this.onMouseClick = this.onMouseClick.bind(this)
      window.addEventListener('mousemove', this.onMouseMove)
      window.addEventListener('click', this.onMouseClick)
    }

    this.onUpdateViewport = this.onUpdateViewport.bind(this)
    window.addEventListener('resize', simpleDebounce(this.onUpdateViewport, 200))
    window.addEventListener('scroll', simpleDebounce(this.onUpdateViewport, 200))
    this.onUpdateViewport()

    this.onTick = this.onTick.bind(this)
    this.scheduleTick()
  }

  createLines() {
    this.big.makeFixed()
    for (let i = 0; i < LINE_COUNT; i++) {
      this.lines.push(new Line())
      this.pivots[i] = []
      this.pivotsFixed[i] = []
      this.attractions[i] = []
      for (let j = 0; j < PIVOT_COUNT; j++) {
        this.pivots[i][j] = this.physics.makeParticle(0.4, 0, 0, 0.0)
        this.pivotsFixed[i][j] = this.physics.makeParticle(0.4, 0, 0, 0.0)
        this.pivotsFixed[i][j].makeFixed()
        this.attractions[i][j] = new Physics.Attraction(this.big, this.pivots[i][j], 150000, 20.0)
        this.physics.addAttraction(this.attractions[i][j])
        // this.physics.makeAttraction(this.big, this.pivots[i][j], 100000, 20.0)
        this.physics.makeSpring(this.pivots[i][j], this.pivotsFixed[i][j], 0.2, 0.3, 5)
        if (j > 0) {
          this.physics.makeSpring(this.pivots[i][j - 1], this.pivots[i][j], 0.5, 0.1, 5)
        }
      }
    }
  }

  onMouseMove(e) {
    if (!this.isVisible) {
      return
    }
    this.big.position.set(
      (e.pageX - this.root.offsetLeft) * this.mouseMoveRatio,
      (e.pageY - this.root.offsetTop) * this.mouseMoveRatio,
      0)
  }

  onMouseClick() {
    this.mode = (this.mode + 1) % 3
    let attraction
    if (MODE_ATTRACT === this.mode) {
      attraction = 150000
    } else if (MODE_AVOID === this.mode) {
      attraction = -5500000
    } else if (MODE_CRAZY === this.mode) {
      attraction = 5500000
    }
    for (let i = 0; i < LINE_COUNT; i++) {
      for (let j = 0; j < PIVOT_COUNT; j++) {
        this.attractions[i][j].constant = attraction
      }
    }
  }

  onUpdateViewport() {
    const rect = this.root.getBoundingClientRect()
    this.isVisible = rect.top < window.innerHeight && rect.bottom > 0
    if (rect.width * this.pixelRatio !== this.root.width ||
      rect.height * this.pixelRatio !== this.root.height) {
      this.width = rect.width
      this.root.width = rect.width * this.pixelRatio
      this.height = rect.height
      this.root.height = rect.height * this.pixelRatio
      this.yMin = (rect.width >= 1200 ? 100 : 0) * this.pixelRatio
      this.yMax = (rect.width >= 1200 ? 900 : 800) * this.pixelRatio
    }
    this.mouseOffset = this.yMin / this.height
    this.mouseScale = (this.yMax - this.yMin) / this.height
    this.mouseMoveRatio = this.width / window.innerWidth
  }

  scheduleTick(lastTime = Date.now() / (1000 / MOVE_SPEED)) {
    this.lastTime = lastTime
    requestAnimationFrame(this.onTick)
  }

  onTick() {
    if (!this.isVisible) {
      this.scheduleTick(this.lastTime)
      return
    }

    const time = Date.now() / (1000 / MOVE_SPEED)
    const delta = time - this.lastTime
    const { mouseX, mouseY, width, height, physics } = this
    const context = {
      time,
      delta,
      width,
      height,
      mouseX,
      mouseY,
    }
    const { pattern } = this.config
    this.update(pattern(context))
    physics.tick()
    this.draw()

    this.scheduleTick(time)
  }

  update({ line1, line2 }) {
    for (let i = 1; i < LINE_COUNT - 1; i++) {
      this.lines[i].interpolate(line1, line2, i / (LINE_COUNT - 1))
    }

    for (let j = 0; j < PIVOT_COUNT; j++) {
      const newPosFirst = sliceBezier([line1.p1.x, line1.p1.y, line1.p1c.x, line1.p1c.y, line1.p2c.x, line1.p2c.y, line1.p2.x, line1.p2.y], j / PIVOT_COUNT)
      const newPosLast = sliceBezier([line2.p1.x, line2.p1.y, line2.p1c.x, line2.p1c.y, line2.p2c.x, line2.p2c.y, line2.p2.x, line2.p2.y], j / PIVOT_COUNT)
      this.pivotsFixed[0][j].position.set(newPosFirst.x, newPosFirst.y, 0)
      this.pivotsFixed[LINE_COUNT - 1][j].position.set(newPosLast.x, newPosLast.y, 0)
      if (!this.initiated) {
        this.pivots[0][j].position.set(newPosFirst.x, newPosFirst.y, 0)
        this.pivots[LINE_COUNT - 1][j].position.set(newPosLast.x, newPosLast.y, 0)
      }
      for (let i = 1; i < LINE_COUNT - 1; i++) {
        const newX = newPosFirst.x + (newPosLast.x - newPosFirst.x) * i / LINE_COUNT
        const newY = newPosFirst.y + (newPosLast.y - newPosFirst.y) * i / LINE_COUNT
        this.pivotsFixed[i][j].position.set(newX, newY, 0)
        if (!this.initiated) {
          this.pivots[i][j].position.set(newX, newY, 0)
        }
      }
    }

    this.initiated = true
  }

  draw() {
    const {
        context, pixelRatio, mode, root: canvas,
    } = this
    const {
        isInverted,
    } = this.config

    context.clearRect(0, 0, canvas.width, canvas.height)
    if (!isInverted) {
      context.strokeStyle = 'rgba(0, 0, 0, 0.2)'
    } else if (MODE_ATTRACT === mode) {
      context.strokeStyle = 'rgba(242, 64, 52, 0.2)'
    } else if (MODE_AVOID === mode) {
      context.strokeStyle = 'rgba(108, 190, 227, 0.3)'
    }

    // lineWidth > 1 kills cpu performance
    // context.scale(pixelRatio, pixelRatio)

    for (let i = 1; i < LINE_COUNT - 1; i++) {
      const line = this.pivots[i]
      if (MODE_CRAZY === mode) {
        context.strokeStyle = COLORS[Math.floor(Math.random() * COLORS.length)]
      }
      context.beginPath()
      context.moveTo(this.lines[i].p1.x * pixelRatio, this.lines[i].p1.y * pixelRatio)
      for (let j = 0, pivot; (pivot = line[j]); j++) {
        context.lineTo(pivot.position.x * pixelRatio, pivot.position.y * pixelRatio)
      }
      context.lineTo(this.lines[i].p2.x * pixelRatio, this.lines[i].p2.y * pixelRatio)
      context.stroke()
    }
  }

  static createConfig() {
    const themeClass = document.body.className.match(/Theme--(\S+)/)
    const theme = themeClass && themeClass[1]

    switch (theme) {
      default: {
        const randomIndex = Math.floor(Math.random() * patterns.length)
        return {
          isInverted: theme === 'home' || theme === '404',
          interactive: true,
          pattern: patterns[randomIndex],
        }
      }
    }
  }
}

export default HeroLines
