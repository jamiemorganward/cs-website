import { useEffect, useRef, useState } from 'react'

export const HeartCanvas7 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [heartWidth, setHeartWidth] = useState<number>(10)
  const [heartScale, setHeartScale] = useState<number>(10)
  const [gap, setGap] = useState<number>(5)
  const [rows, setRows] = useState<number>(25)
  const interactiveRadius = 100

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    // set up canvas
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

    // set up heart class
    interface Heart {
      x: number
      y: number
      scale: number
      maxScale: number
      minScale: number
      color: string
      center: { x: number; y: number }
      colorArray: string[]
      heartImg: HTMLImageElement
      heartUrl: string
    }
    class Heart {
      constructor(x: number, y: number, scale: number) {
        this.x = x
        this.y = y
        this.center = { x, y }
        this.scale = scale
        this.maxScale = scale * 3
        this.minScale = scale
        this.color = '#dcdcdc'
        this.colorArray = ['#FFC10C', '#F60', '#9190FF']
        this.heartImg = new Image()
        this.heartImg.src = '/heart.svg'
      }

      drawHeart = (i: number) => {
        if (ctx) {
          this.heartImg.onload = () => {
            ctx.drawImage(this.heartImg, this.x, this.y, this.scale, this.scale)
          }
        }

        this.update(i)
      }

      // sets up what to do on hover
      update = (i: number) => {
        const distance = Math.sqrt(
          (this.x - mouseX) ** 2 + (this.y - mouseY) ** 2
        )
        if (i === 5 && ctx && canvas) {
          if (distance <= interactiveRadius && this.scale < this.maxScale) {
            // this.scale = Math.max(
            //   ((interactiveRadius - distance) / interactiveRadius) *
            //     this.maxScale,
            //   10
            // )
            this.scale = 20
          } else if (distance > interactiveRadius) {
            this.scale = 10
          }
        }
      }
    }

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

    // the actual drawing off all the hearts
    const animate = () => {
      requestAnimationFrame(animate)
      if (ctx) {
        // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

        heartArray.forEach((heart, i) => {
          heart.drawHeart(i)
        })
      }
    }

    animate()
  }, [])

  return <canvas ref={canvasRef} height={500}></canvas>
}
