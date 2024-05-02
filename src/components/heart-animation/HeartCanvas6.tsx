import { resolve } from 'path'
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'

export const HeartCanvas6 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [heartWidth, setHeartWidth] = useState<number>(10)
  const [heartScale, setHeartScale] = useState<number>(100)
  const [gap, setGap] = useState<number>(5)
  const [rows, setRows] = useState<number>(5)
  // const [heartImg, setHeartImg] = useState<HTMLImageElement>(new Image())
  const [heartUrl, setHeartUrl] = useState<string>('/heart.svg')
  const interactiveRadius = 100
  const [consoleCheck, setConsoleCheck] = useState(true)

  useLayoutEffect(() => {
    // wait for canvas to load
    // initCanvas().then(() => {
    // if (canvas) {
    if (!canvasRef.current) {
      return
    }
    // function easeOutExpo(x: number): number {
    //   return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
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
      heartImg: HTMLImageElement
      heartUrl: string
    }

    class Heart {
      constructor(
        x: number,
        y: number,
        // width?: number,
        scale: number
        // maxScale?: number,
        // minScale?: number,
        // color?: string,
        // colorArray?: string[],
        // heartUrl: string
      ) {
        this.x = x
        this.y = y
        this.center = { x, y }
        this.scale = scale
        this.maxScale = scale * 3
        this.minScale = scale
        // this.width = width
        // this.maxWidth = width * 3
        // this.minWidth = width

        this.color = '#dcdcdc'
        this.colorArray = ['#FFC10C', '#F60', '#9190FF']
        this.heartImg = new Image()
        this.heartImg.src = '/heart.svg'
      }

      // draw single heart
      drawHeart = (i: number) => {
        if (ctx) {
          this.heartImg.onload = () => {
            ctx.drawImage(this.heartImg, this.x, this.y, 100, 100)
          }
        }
        // this.update(i)
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
            // this.scale = Math.max(
            //   ((interactiveRadius - distance) / interactiveRadius) *
            //     this.maxScale,
            //   10
            // )
            // this.scale = 2
            // this.width = Math.max(
            //   ((interactiveRadius - distance) / interactiveRadius) *
            //     this.maxWidth,
            //   10
            // )
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
          if (i === 250) {
            if (distance < interactiveRadius) {
              // console.log(this.width, distance)
            }
            this.color = '#f60'
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

    console.log(heartArray[0])

    animate()
    // }
    // })
  }, [heartUrl])

  return (
    <>
      <img src="heart.svg" />
      <canvas ref={canvasRef} height={500}></canvas>
    </>
  )
}
