'use client'

import React, { useEffect, useRef } from 'react'
import s from './ThreeScene.module.scss'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

interface ThreeSceneProps {
  children?: React.ReactNode
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const load = async () => {
      if (!containerRef.current) {
        return
      }
      if (typeof window !== 'undefined') {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
        const renderer = new THREE.WebGLRenderer({ antialias: true })

        renderer.setSize(window.innerWidth, window.innerHeight)
        containerRef.current?.appendChild(renderer.domElement)
        camera.position.z = 5
        camera.rotation.order = 'YXZ'

        // scene.background = new THREE.Color(0xcccccc)
        scene.fog = new THREE.FogExp2(0xcccccc, 0.002)

        const geometry = new THREE.BoxGeometry(8, 8)
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        new THREE.ImageBitmapLoader().load('/louie.jpg', (data) => {
          const texture = new THREE.CanvasTexture(data)
          const material = new THREE.MeshBasicMaterial({
            // color: 0xffffff,
            // flatShading: true,
            map: texture
          })
          // const cube = new THREE.Mesh(geometry, material)
          const cubeFar = new THREE.Mesh(geometry, material)
          const cubeFarLeft = new THREE.Mesh(geometry, material)
          const cubeFarRight = new THREE.Mesh(geometry, material)
          cubeFar.position.z = -10
          cubeFarLeft.position.z = -9
          cubeFarLeft.position.x = 5
          cubeFarRight.position.z = -9
          cubeFarRight.position.x = -5
          const cubeNear = new THREE.Mesh(geometry, material)
          cubeNear.position.z = 10
          // scene.add(cube)
          scene.add(cubeFar)
          scene.add(cubeNear)
          scene.add(cubeFarLeft)
          scene.add(cubeFarRight)

          const dirLight1 = new THREE.DirectionalLight(0xffffff, 3)
          dirLight1.position.set(1, 1, 1)
          scene.add(dirLight1)

          const dirLight2 = new THREE.DirectionalLight(0xffffff, 1)
          dirLight2.position.set(-1, -1, 1)
          scene.add(dirLight2)

          const ambientLight = new THREE.AmbientLight(0x555555)
          scene.add(ambientLight)
        })

        // Render the scene and camera
        renderer.render(scene, camera)

        const controls = new OrbitControls(camera, containerRef.current)
        controls.target.set(0, 0, 0)

        const renderScene = () => {
          // cube.rotation.x += 0.01
          // cube.rotation.y += 0.01
          controls.update()
          renderer.render(scene, camera)
          requestAnimationFrame(renderScene)
        }

        // Call the renderScene function to start the animation loop
        renderScene()

        const handleResize = () => {
          const width = window.innerWidth
          const height = window.innerHeight

          camera.aspect = width / height
          camera.updateProjectionMatrix()

          renderer.setSize(width, height)
        }

        window.addEventListener('resize', handleResize)

        // Clean up the event listener when the component is unmounted
        return () => {
          window.removeEventListener('resize', handleResize)
        }
      }
    }
    load()
  }, [])

  return <div ref={containerRef} />
}
