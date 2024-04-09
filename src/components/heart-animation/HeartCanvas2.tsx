import { useEffect, useRef } from 'react'
import Heart from '../../assets/svgs/heart.svg'

export const HeartCanvas2 = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvas = canvasRef.current
  const ctx = canvas?.getContext('2d')

  // config
  const heartsCount = 200
  const heartWidth = 10
  const gap = 5
  const rows = 25
  const cols = canvas && canvas?.width / (heartWidth + gap)
  const maxScale = 0.5
  const interactiveRadius = 100 // Adjust as needed

  if (canvas) {
    canvas.width = window.innerWidth
    // canvas.height = window.innerHeight

    window.addEventListener('resize', function () {
      canvas.width = window.innerWidth
      // canvas.height = window.innerHeight
    })
  }

  // Handle mouse position

  let mouse: { x: number | undefined; y: number | undefined } = {
    x: undefined,
    y: undefined
  }
  // make sure we're in the canvas
  const getMousePosition = (el: any) => {
    let xPosition = 0
    let yPosition = 0

    while (el) {
      xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft
      yPosition += el.offsetTop - el.scrollTop + el.clientTop
      el = el.offsetParent
    }
    return {
      x: xPosition,
      y: yPosition
    }
  }
  let canvasPos = getMousePosition(canvas)

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX - canvasPos.x
    mouse.y = e.clientY - canvasPos.y
  })

  interface Heart {
    x: number
    y: number
    // dx: number
    // dy: number
    width: number
    minWidth: number
    maxWidth: number
    color: string
  }

  class Heart {
    constructor(
      x: number,
      y: number,
      // dx: number,
      // dy: number,
      width: number,
      minWidth?: number,
      maxWidth?: number,
      color?: string
    ) {
      this.x = x
      this.y = y
      // this.dx = dx
      // this.dy = dy
      this.width = width
      this.minWidth = width
      this.maxWidth = width * 3

      let colorArray = ['#de3d3d', '#090c0b', '#0d2527', '#267368', '#00b1a0']

      this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    }

    // define single heart
    drawHeart = () => {
      if (ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI)

        ctx.fillStyle = this.color
        ctx.fill()
      }
      // update when mouse is close
      this.update()
    }

    // define change on hover
    update = () => {
      if (
        typeof mouse.x !== 'undefined' &&
        typeof mouse.y !== 'undefined' &&
        ctx &&
        canvas
      ) {
        const distance = Math.sqrt(
          (this.x - mouse.x) ** 2 + (this.y - mouse.y) ** 2
        )
        if (
          mouse.x - this.x < 80 &&
          mouse.x - this.x > -80 &&
          mouse.y - this.y < 80 &&
          mouse.y - this.y > -80 &&
          this.width < this.maxWidth
        ) {
          this.width += 1
          this.x -= 1
          this.y -= 1
        } else if (this.width > this.minWidth) {
          this.width -= 1
          this.x += 1
          this.y += 1
        }
      }
    }
  }

  // define and render grid of hearts
  let heartArray: Heart[] = []
  if (cols) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // let width = heartWidth
        let x = col * heartWidth
        // let dx = 0 // not needed
        let y = row * heartWidth
        // let dy = 0 // not needed
        heartArray.push(new Heart(x, y, heartWidth))
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate)
    if (ctx) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      heartArray.forEach((heart) => {
        heart.drawHeart()
      })
    }
  }

  animate()

  return (
    <canvas
      ref={canvasRef}
      height={350}
      style={{ backgroundColor: 'lightgray' }}
    ></canvas>
  )
}
