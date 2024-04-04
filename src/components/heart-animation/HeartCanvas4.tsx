import { resolve } from 'path'
import React, { useRef, useEffect, useState } from 'react'

export const HeartCanvas4 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvas = canvasRef.current
  const ctx = canvas?.getContext('2d')
  const [heartWidth, setHeartWidth] = useState<number>(10)
  const [gap, setGap] = useState<number>(5)
  const [rows, setRows] = useState<number>(25)
  const [cols, setCols] = useState<number>(0)
  const interactiveRadius = 100

  const initCanvas = async () => {
    while (canvas === null) {
      await new Promise((resolve) => console.log('waiting'))
    }
    console.log('resolved')
    return canvas
  }

  useEffect(() => {
    // wait for canvas to load
    initCanvas().then(() => {
      if (canvas) {
        canvas.width = window.innerWidth
        window.addEventListener('resize', function () {
          canvas.width = window.innerWidth
        })

        setCols(canvas.width / (heartWidth + gap))

        // detect mouse position
        let mouseX = 0
        let mouseY = 0

        const handleMouseMove = (event: MouseEvent) => {
          if (canvas) {
            const rect = canvas.getBoundingClientRect()
            const scaleX = canvas.width / rect.width
            const scaleY = canvas.height / rect.height
            mouseX = (event.clientX - rect.left) * scaleX
            mouseY = (event.clientY - rect.top) * scaleY
          }
        }

        canvas.addEventListener('mousemove', handleMouseMove)

        // define single heart shape
        interface Heart {
          x: number
          y: number
          width: number
          color: string
        }

        class Heart {
          constructor(x: number, y: number, width: number, color?: string) {
            this.x = x
            this.y = y
            this.width = width
            let colorArray = [
              '#de3d3d',
              '#090c0b',
              '#0d2527',
              '#267368',
              '#00b1a0'
            ]

            this.color =
              colorArray[Math.floor(Math.random() * colorArray.length)]
          }

          // draw single heart
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
            const distance = Math.sqrt(
              (this.x - mouseX) ** 2 + (this.y - mouseY) ** 2
            )
            if (ctx && canvas) {
              if (distance < interactiveRadius) {
                this.width += 1
                this.x -= 1
                this.y -= 1
              } else if (distance >= interactiveRadius) {
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

            heartArray.forEach((heart) => {
              heart.drawHeart()
            })
          }
        }

        animate()
      }
    })
  }, [canvas, cols])

  return <canvas ref={canvasRef} height={500}></canvas>
}
