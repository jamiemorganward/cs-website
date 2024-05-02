import React, { useState, useRef, useEffect } from 'react'
import Heart from '../../assets/svgs/heart.svg'
// import { SvgLoader, SvgProxy } from 'react-svgmt'

const HeartCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hovered, setHovered] = useState<boolean>(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawHeart = (x: number, y: number) => {
      const img = new Image()
      img.src = '/heart.svg'
      img.onload = () => {
        ctx.drawImage(img, x, y, 10, 10)
      }
      console.log(img.src)
    }

    // let heartArray = []
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 5; col++) {
        let x = col * (10 * 2 + 5) + 15
        let y = row * (10 * 2 + 5) + 15
        drawHeart(x, y)
        console.log(x, y)
      }
    }

    // const handleMouseMove = (event: MouseEvent) => {
    //   const rect = canvas.getBoundingClientRect()
    //   const x = event.clientX - rect.left
    //   const y = event.clientY - rect.top

    //   if (
    //     x >= canvas.width / 4 &&
    //     x <= (3 * canvas.width) / 4 &&
    //     y >= canvas.height / 4 &&
    //     y <= (3 * canvas.height) / 4
    //   ) {
    //     setHovered(true)
    //   } else {
    //     setHovered(false)
    //   }
    // }

    // canvas.addEventListener('mousemove', handleMouseMove)

    // return () => {
    //   canvas.removeEventListener('mousemove', handleMouseMove)
    // }
  }, [])

  return <canvas ref={canvasRef} width={1000} height={500} />
}

export default HeartCanvas
