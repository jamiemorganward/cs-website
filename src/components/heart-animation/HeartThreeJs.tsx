import { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface GridProps {
  width: number
  height: number
  cellSize: number
}

export const HeartThreeJs = (/* { width, height, cellSize }: GridProps */) => {
  const width = 100
  const height = 100
  const cellSize = 10
  const sceneRef = useRef<THREE.Scene>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const rendererRef = useRef<any>()
  const gridRef = useRef<THREE.Mesh>()

  useEffect(() => {
    // Set up Three.js scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0)

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)

    const gridGeometry = new THREE.PlaneGeometry(
      width,
      height,
      cellSize,
      cellSize
    )
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true
    })
    const grid = new THREE.Mesh(gridGeometry, gridMaterial)
    grid.rotation.x = Math.PI / 2 // Rotate to be parallel with the XZ plane
    grid.position.set(width / 2, 0, height / 2) // Center the grid
    gridRef.current = grid

    scene.add(grid)

    // Render circle in each cell
    const cellRadius = cellSize / 2
    const circleGeometry = new THREE.CircleGeometry(cellRadius, 32)
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    for (let x = 0; x < width; x += cellSize) {
      for (let z = 0; z < height; z += cellSize) {
        const circle = new THREE.Mesh(circleGeometry, circleMaterial)
        circle.position.set(x + cellRadius, 0.1, z + cellRadius) // Place the circle slightly above the grid
        scene.add(circle)
      }
    }

    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer

    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      // Clean up Three.js scene
      if (
        sceneRef.current &&
        gridRef.current &&
        cameraRef.current &&
        rendererRef.current
      ) {
        sceneRef.current.remove(gridRef.current)
        cameraRef.current = undefined
        rendererRef.current.dispose()
      }
    }
  }, [width, height, cellSize])

  return (
    <div
      // ref={(ref) => ref && ref.appendChild(rendererRef.current?.domElement)}
      style={{ width, height }}
    >
      <canvas ref={rendererRef.current?.domElement}></canvas>
    </div>
  )
}
