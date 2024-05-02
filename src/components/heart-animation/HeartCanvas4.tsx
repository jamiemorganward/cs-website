import { resolve } from 'path'
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'

export const HeartCanvas4 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [heartWidth, setHeartWidth] = useState<number>(10)
  const [heartScale, setHeartScale] = useState<number>(2)
  const [gap, setGap] = useState<number>(5)
  const [rows, setRows] = useState<number>(25)
  const interactiveRadius = 100

  useLayoutEffect(() => {
    if (!canvasRef.current) {
      return
    }
    // function easeOutExpo(x: number): number {
    //   return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)a
    // }
    // function getBaseLog(x: number, y: number) {
    //   return Math.log(y) / Math.log(x)
    // }
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    canvas.width = window.innerWidth - 64 // subtract padding
    window.addEventListener('resize', function () {
      canvas.width = window.innerWidth
    })

    const cols = Math.floor(canvas.width / (heartWidth * 2 + gap))

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
      scale: number
      maxScale: number
      minScale: number
      color: string
      maxWidth: number
      minWidth: number
      center: { x: number; y: number }
      colorArray: string[]
    }

    class Heart {
      constructor(
        x: number,
        y: number,
        scale: number,
        color?: string,
        colorArray?: string[]
      ) {
        this.x = x
        this.y = y
        this.center = { x, y }
        this.scale = scale
        this.maxScale = scale * 3
        this.minScale = scale
        this.color = '#dcdcdc'
        this.colorArray = ['#FFC10C', '#F60', '#9190FF']
      }

      // draw single heart
      drawHeart = (i: number) => {
        if (ctx) {
          // heart
          const hWidth = 11
          const hHeight = 9.24
          // const centerX = this.x + hWidth / 2
          // const centerY = this.y + hHeight / 2
          const startX = this.x
          const startY = this.y
          ctx.fillStyle = this.color

          ctx.clearRect(0, 0, hWidth, hHeight)

          // move to center bottom of heart
          ctx.beginPath()
          ctx.moveTo(startX, startY) // 15 / 15 for 1st heart

          ctx.lineTo(startX + 0.0429 * this.scale, startY + 4.6234 * this.scale)

          // c1 (right bottom quarter 1)
          ctx.bezierCurveTo(
            startX + 0.6171 * this.scale,
            startY + 3.6039 * this.scale,
            startX + 1.57 * this.scale,
            startY + 2.8837 * this.scale,
            startX + 2.7081 * this.scale,
            startY + 2.0917 * this.scale
          )
          // c2 - (right quarter 2)
          ctx.bezierCurveTo(
            startX + 4.3355 * this.scale,
            startY + 0.9612 * this.scale,
            startX + 5.5049 * this.scale,
            startY - 0.1961 * this.scale,
            startX + 5.5 * this.scale,
            startY - 1.8209 * this.scale
          )
          // c3 (right quarter 3)
          ctx.bezierCurveTo(
            startX + 5.5049 * this.scale,
            startY - 3.5966 * this.scale,
            startX + 4.4405 * this.scale,
            startY - 4.6193 * this.scale,
            startX + 2.8071 * this.scale,
            startY - 4.6234 * this.scale
          )
          // c4 (right top quarter 4)
          ctx.bezierCurveTo(
            startX + 1.2794 * this.scale,
            startY - 4.6193 * this.scale,
            startX + 0.4558 * this.scale,
            startY - 3.9465 * this.scale,
            startX + 0.0284 * this.scale,
            startY - 2.5385 * this.scale
          )
          // center top
          ctx.lineTo(startX - 0.0284 * this.scale, startY - 2.5385 * this.scale)
          // c5 (left top quarter 1)
          ctx.bezierCurveTo(
            startX - 0.4676 * this.scale,
            startY - 3.9465 * this.scale,
            startX - 1.2776 * this.scale,
            startY - 4.6193 * this.scale,
            startX - 2.7926 * this.scale,
            startY - 4.6234 * this.scale
          )
          // c6 (left quarter 2)
          ctx.bezierCurveTo(
            startX - 4.4557 * this.scale,
            startY - 4.6193 * this.scale,
            startX - 5.5 * this.scale,
            startY - 3.6012 * this.scale,
            startX - 5.5 * this.scale,
            startY - 1.8209 * this.scale
          )
          // c7 (left quarter 3)
          ctx.bezierCurveTo(
            startX - 5.5 * this.scale,
            startY - 0.2016 * this.scale,
            startX - 4.3261 * this.scale,
            startY + 0.968 * this.scale,
            startX - 2.6936 * this.scale,
            startY + 2.0917 * this.scale
          )
          // c8 (left bottom quarter 4)
          ctx.bezierCurveTo(
            startX - 1.5643 * this.scale,
            startY + 2.8907 * this.scale,
            startX - 0.615 * this.scale,
            startY + 3.6013 * this.scale,
            startX - 0.0139 * this.scale,
            startY + 4.6234 * this.scale
          )
          ctx.lineTo(startX + 0.0429 * this.scale, startY + 4.6234 * this.scale)
          ctx.closePath()
          ctx.fill()
        }
        this.update(i)
      }

      // define change on hover
      update = (i: number) => {
        const distance = Math.sqrt(
          (this.x - mouseX) ** 2 + (this.y - mouseY) ** 2
        )
        if (ctx && canvas) {
          // if within interactive radius and not bigger than max width
          if (distance <= interactiveRadius && this.scale < this.maxScale) {
            // set width relative to distance but not smaller than 10
            this.scale = Math.max(
              ((interactiveRadius - distance) / interactiveRadius) *
                this.maxScale,
              1
            )
            // console.log(getBaseLog(100, Math.abs(10)))
            // this.x =
            //   this.center.x +
            //   (this.center.x - mouseX) *
            //     getBaseLog(500, Math.abs(this.center.x - mouseX))
            // this.y =
            //   this.center.y +
            //   (this.center.y - mouseY) *
            //     getBaseLog(500, Math.abs(this.center.y - mouseY))

            this.color =
              this.scale <= this.maxScale && this.scale > this.maxScale / 1.5
                ? this.colorArray[0]
                : this.scale <= this.maxScale / 1.2 &&
                  this.scale >= this.maxScale / 2.2
                ? this.colorArray[1]
                : this.colorArray[2]
          } else if (this.scale > this.minScale) {
            // this.scale -= 1
          } else if (distance > interactiveRadius) {
            this.color = '#dcdcdc'
            this.scale = 1
          }
          // console.log(this.x - mouseX, easeOutExpo(this.x - mouseX))
        }
      }
    }

    // define and render grid of hearts
    let heartArray: Heart[] = []
    if (cols) {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let x = col * (heartWidth * 2 + gap) + 15
          let y = row * (heartWidth * 2 + gap) + 15
          heartArray.push(new Heart(x, y, heartScale))
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

    return () => {
      window.removeEventListener('resize', function () {
        canvas.width = window.innerWidth
      })
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} height={500}></canvas>
}
