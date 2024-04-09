import { useEffect, useRef } from 'react'
import Heart from '../../assets/svgs/heart.svg'

export const HeartCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    const heart = new Image()
    heart.onload = function () {
      ctx.drawImage(heart, 0, 0)
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
    ctx.fill()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas) {
      canvas.width = parent.innerWidth

      // resize
      window.addEventListener('resize', function () {
        canvas.width = window.innerWidth
      })

      let mouse = {
        x: 0,
        y: 0
      }

      window.addEventListener('mousemove', function (e) {
        mouse.x = e.x
        mouse.y = e.y
      })
    }

    let frameCount = 0
    let animationFrameId: number

    const render = () => {
      frameCount++
      if (ctx) {
        draw(ctx, frameCount)
      }
      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  interface Heart {
    x: number
    y: number
    dx: number
    dy: number
    width: number
    minWidth: number
    maxWidth: number
    color: string
  }
  class Heart {
    constructor({ x, y, dx, dy, width, minWidth, maxWidth, color }: Heart) {
      this.x = x
      this.y = y
      this.dx = dx
      this.dy = dy
      this.width = width
      this.minWidth = width
      this.maxWidth = width * 3

      let colorArray = ['#de3d3d', '#090c0b', '#0d2527', '#267368', '#00b1a0']

      this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    }

    draw2 = (ctx: CanvasRenderingContext2D, frameCount: number) => {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI)

      ctx.fillStyle = this.color
      ctx.fill()

      this.update()
    }

    update = () => {
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

  return (
    <canvas
      ref={canvasRef}
      height={350}
      style={{ backgroundColor: 'lightgray' }}
    ></canvas>
  )
}
