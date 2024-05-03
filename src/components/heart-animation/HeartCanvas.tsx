import React, { useRef, useEffect, useState } from 'react'

export const HeartCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [heartWidth, setHeartWidth] = useState<number>(10) // width of the box each heart occupies (used to calculate grid)
  const [heartScale, setHeartScale] = useState<number>(1) // initial scale
  const [gap, setGap] = useState<number>(5) // space between hearts (used to calculate grid)
  const [rows, setRows] = useState<number>(25)
  const [cols, setCols] = useState<number>()
  const [initColor, setInitColor] = useState<string>('#dcdcdc')
  const interactiveRadius = 150

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    canvas.width = window.innerWidth - 64 // subtract padding

    const handleResize = () => {
      canvas.width = window.innerWidth - 64
      setCols(Math.floor(canvas.width / (heartWidth * 2 + gap)))
    }

    window.addEventListener('resize', handleResize)

    setCols(Math.floor(canvas.width / (heartWidth * 2 + gap)))

    // detect mouse position
    let mouseX = -1000 // set to be off canvas to disable animation
    let mouseY = -1000

    const handleMouseMove = (event: MouseEvent) => {
      if (canvas) {
        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height
        mouseX = Math.max((event.clientX - rect.left) * scaleX, 0)
        mouseY = Math.max((event.clientY - rect.top) * scaleY, 0)
      }
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('mousemove', handleMouseMove)

    // define single heart shape
    interface Heart {
      x: number
      y: number
      width: number
      scale: number
      maxScale: number
      minScale: number
      color: string | CanvasGradient
      // center: { x: number; y: number }
      colorArray: string[]
      gradient: CanvasGradient
    }

    class Heart {
      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        // this.center = { x, y }
        this.scale = heartScale
        this.maxScale = heartScale * 3
        this.minScale = heartScale
        this.color = initColor
        this.colorArray = ['#FFC10C', '#F60', '#9190FF']
        this.gradient
      }

      // draw single heart
      drawHeart = (i: number) => {
        if (ctx) {
          // heart
          // const hWidth = 11
          // const hHeight = 9.24
          // const centerX = this.x + hWidth / 2
          // const centerY = this.y + hHeight / 2
          const startX = this.x
          const startY = this.y

          this.gradient = ctx.createRadialGradient(
            mouseX,
            mouseY,
            20,
            mouseX,
            mouseY,
            120
          )
          this.gradient.addColorStop(0, this.colorArray[0])
          this.gradient.addColorStop(0.33, this.colorArray[1])
          this.gradient.addColorStop(0.66, this.colorArray[2])
          this.gradient.addColorStop(1, initColor)
          ctx.fillStyle = this.gradient

          // move to center bottom of heart
          ctx.beginPath()
          ctx.moveTo(startX, startY)
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
            // set width relative to distance but not smaller than min scale
            this.scale = Math.max(
              ((interactiveRadius - distance) / interactiveRadius) *
                (this.maxScale - this.minScale) +
                this.minScale,
              heartScale
            )
            // movement tbc?
            // this.x =
            //   this.center.x +
            //   (this.center.x - mouseX) *
            //     getBaseLog(500, Math.abs(this.center.x - mouseX))
            this.color = this.gradient
            // this.color =
            //   this.scale <= this.maxScale &&
            //   this.scale > (this.maxScale - this.minScale) / 1.5 + this.minScale
            //     ? this.colorArray[0]
            //     : this.scale <=
            //         (this.maxScale - this.minScale) / 1.5 + this.minScale &&
            //       this.scale >
            //         (this.maxScale - this.minScale) / 3 + this.minScale
            //     ? this.colorArray[1]
            //     : this.colorArray[2]
          } else {
            this.color = initColor
            this.scale = heartScale
          }
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
          heartArray.push(new Heart(x, y))
        }
      }
    }

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
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cols])

  return <canvas ref={canvasRef} height={350}></canvas>
}
