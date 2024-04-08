import { resolve } from 'path'
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'

export const HeartCanvas4 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [heartWidth, setHeartWidth] = useState<number>(10)
  const [gap, setGap] = useState<number>(5)
  const [rows, setRows] = useState<number>(25)
  const interactiveRadius = 200

  // const initCanvas = async () => {
  //   while (canvas === null) {
  //     await new Promise((resolve) => console.log('waiting'))
  //   }
  //   console.log('resolved')
  //   return canvas
  // }

  useLayoutEffect(() => {
    // wait for canvas to load
    // initCanvas().then(() => {
    // if (canvas) {
    if (!canvasRef.current) {
      return
    }
    function easeOutExpo(x: number): number {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
    }
    function getBaseLog(x: number, y: number) {
      return Math.log(y) / Math.log(x)
    }
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    canvas.width = window.innerWidth
    window.addEventListener('resize', function () {
      canvas.width = window.innerWidth
    })

    const cols = canvas.width / (heartWidth + gap)

    // detect mouse position
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      if (canvas) {
        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height
        mouseX = Math.max((event.clientX - rect.left) * scaleX, 0)
        mouseY = Math.max((event.clientY - rect.top) * scaleY, 0)
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    // define single heart shape
    interface Heart {
      x: number
      y: number
      width: number
      color: string
      maxWidth: number
      minWidth: number
      center: { x: number; y: number }
    }

    class Heart {
      constructor(x: number, y: number, width: number, color?: string) {
        this.x = x
        this.y = y
        this.center = { x, y }
        this.width = width
        this.maxWidth = width * 3
        this.minWidth = width

        this.color = '#000000'
      }

      // draw single heart
      drawHeart = (i: number) => {
        if (ctx) {
          ctx.beginPath()
          // console.log(this.x, this.y, this.width, 0, 2 * Math.PI)
          ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI)

          ctx.fillStyle = i === 850 ? '#ff0000' : this.color
          ctx.fill()
        }
        this.update(i)
      }

      // define change on hover
      update = (i: index) => {
        // console.log(this.width, this.maxWidth)
        // if (
        //   mouseX - this.x < 80 &&
        //   mouseX - this.x > -80 &&
        //   mouseY - this.y < 80 &&
        //   mouseY - this.y > -80 &&
        //   this.width < this.maxWidth
        // ) {
        //   this.width += 1
        //   this.x -= 1
        //   this.y -= 1
        // } else if (this.width > this.minWidth) {
        //   this.width -= 1
        //   this.x += 1
        //   this.y += 1
        // }
        const distance = Math.sqrt(
          (this.x - mouseX) ** 2 + (this.y - mouseY) ** 2
        )
        if (ctx && canvas) {
          if (distance < interactiveRadius && this.width < this.maxWidth) {
            this.width = Math.max(
              ((interactiveRadius - distance) / interactiveRadius) *
                this.maxWidth,
              10
            )
          } else if (this.width > this.minWidth) {
            this.width -= 1
            // this.x += 1
            // this.y += 1
          }
          if (i === 850) {
            console.log(getBaseLog(100, this.center.y - mouseY))
          }
          // console.log(this.x - mouseX, easeOutExpo(this.x - mouseX))
          this.x =
            this.center.x +
            (this.center.x - mouseX) *
              getBaseLog(10, Math.abs(this.center.x - mouseX))
          this.y =
            this.center.y +
            (this.center.y - mouseY) *
              getBaseLog(10, Math.abs(this.center.y - mouseY))
        }
      }
    }

    // define and render grid of hearts
    let heartArray: Heart[] = []
    if (cols) {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let x = col * (heartWidth * 2 + gap)
          let y = row * (heartWidth * 2 + gap)
          heartArray.push(new Heart(x, y, heartWidth))
        }
      }
    }

    // heck knows what this does...
    const animate = () => {
      requestAnimationFrame(animate)
      if (ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

        heartArray.forEach((heart, i) => {
          heart.drawHeart(i)
        })
      }
    }

    animate()
    // }
    // })
  }, [])

  return <canvas ref={canvasRef} height={500}></canvas>
}
