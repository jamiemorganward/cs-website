// components/HeartCanvas.tsx
import React, { useRef, useEffect, useState } from 'react'

export const HeartCanvas3 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvas = canvasRef.current
  const ctx = canvas?.getContext('2d')

  if (canvas) {
    canvas.width = window.innerWidth
  }

  // config
  const heartsCount = 200
  const heartWidth = 25
  const gap = 5
  const rows = 25
  const cols = canvas && canvas?.width / (heartWidth + gap)
  const maxScale = 0.5
  const interactiveRadius = 100 // Adjust as needed

  interface Heart {
    x: number
    y: number
    width: number
    minWidth: number
    maxWidth: number
    color: string
  }

  class Heart {
    constructor(
      x: number,
      y: number,
      width: number,
      minWidth?: number,
      maxWidth?: number,
      color?: string
    ) {
      this.x = x
      this.y = y
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

  // render multiple instances of heart class

  useEffect(() => {
    const heartArray: any = []

    if (canvas && ctx && cols) {
      // for (let i = 0; i < heartsCount; i++) {
      //   heartArray.push({
      //     x: Math.random() * canvas.width,
      //     y: Math.random() * canvas.height
      //   })
      // }

      for (let row = 0; row <= rows; row++) {
        for (let col = 0; col < cols; col++) {
          let width = heartWidth
          let x = col * (heartWidth + gap)
          let dx = 0 // only for animation
          let y = row * heartWidth
          let dy = 0 // only for animation
          heartArray.push(new Heart(x, y, heartWidth))
        }
      }

      const update = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < heartsCount; i++) {
          const heart = heartArray[i]
          const distance = Math.sqrt(
            (heart.x - mouseX) ** 2 + (heart.y - mouseY) ** 2
          )
          const scale = Math.min(
            maxScale,
            Math.max(0, (interactiveRadius - distance) / interactiveRadius)
          )

          ctx.save()
          ctx.translate(heart.x, heart.y)
          ctx.scale(scale, scale)
          drawHeart(ctx)
          ctx.restore()
        }
      }

      // const drawHeart = (ctx: CanvasRenderingContext2D) => {
      //   ctx.strokeStyle = 'rgba(0,0,0,0)'
      //   ctx.miterLimit = 4
      //   ctx.fillStyle = '#9190FF'
      //   ctx.beginPath()
      //   ctx.moveTo(23.4408, 39)
      //   ctx.lineTo(23.6834, 39)
      //   ctx.bezierCurveTo(26.1369, 34.6891, 30.2147, 31.6625, 35.071, 28.322)
      //   ctx.bezierCurveTo(41.9972, 23.554, 47, 18.6435, 47, 11.8199)
      //   ctx.bezierCurveTo(47, 4.31111, 42.4766, 0, 35.494, 0)
      //   ctx.bezierCurveTo(28.9569, 0, 25.4487, 2.85503, 23.6213, 8.79354)
      //   ctx.lineTo(23.3788, 8.79354)
      //   ctx.bezierCurveTo(21.4949, 2.85503, 18.0431, 0, 11.5681, 0)
      //   ctx.bezierCurveTo(4.46703, 0, 0, 4.31111, 0, 11.8199)
      //   ctx.bezierCurveTo(0, 18.6435, 5.00856, 23.5829, 11.9912, 28.322)
      //   ctx.bezierCurveTo(16.8192, 31.6909, 20.8632, 34.6891, 23.4408, 39)
      //   ctx.closePath()
      //   ctx.fill()
      //   ctx.stroke()
      // }

      const updateCanvasSize = () => {
        canvas.width = window.innerWidth
      }

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = event.clientX
        mouseY = event.clientY
        update()
      }

      let mouseX = 0
      let mouseY = 0

      updateCanvasSize()
      window.addEventListener('resize', updateCanvasSize)
      canvas.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('resize', updateCanvasSize)
        canvas.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return <canvas ref={canvasRef} />
}
