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
          50,
          window.innerWidth / window.innerHeight,
          0.1,
          10000
        )
        const renderer = new THREE.WebGLRenderer({ antialias: true })

        renderer.setSize(window.innerWidth, window.innerHeight)
        containerRef.current?.appendChild(renderer.domElement)
        camera.position.z = 0
        camera.rotation.order = 'YXZ'

        // scene.background = new THREE.Color(0xcccccc)
        scene.fog = new THREE.FogExp2(0xcccccc, 0.002)

        const geometry = new THREE.BoxGeometry(12, 8)
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        new THREE.ImageBitmapLoader().load('/louie.jpg', (data) => {
          const texture = new THREE.CanvasTexture(data)
          const row1 = [
            { z: -25, x: 0 },
            { z: -24.1481, x: 6.47048 },
            { z: -21.65064, x: 12.5 },
            { z: -17.6776, x: 17.6776 },
            { z: -12.5, x: 21.65064 },
            { z: -6.47048, x: 24.1481 },
            { z: 0, x: 25 },
            { z: 6.47048, x: 24.1481 },
            { z: 12.5, x: 21.65064 },
            { z: 17.6776, x: 17.6776 },
            { z: 21.65064, x: 12.5 },
            { z: 24.1481, x: 6.47048 },
            { z: 25, x: 0 },
            { z: 24.1481, x: -6.47048 },
            { z: 21.65064, x: -12.5 },
            { z: 17.6776, x: -17.6776 },
            { z: 12.5, x: -21.65064 },
            { z: 6.47048, x: -24.1481 },
            { z: 0, x: -25 },
            { z: -6.47048, x: -24.1481 },
            { z: -12.5, x: -21.65064 },
            { z: -17.6776, x: -17.6776 },
            { z: -21.65064, x: -12.5 },
            { z: -24.1481, x: -6.47048 }
            // { z: 12.5, x: 21.65064 },
            // { z: 21.65064, x: 12.5 },
            // { z: 25, x: 0 },
            // { z: 21.65064, x: -12.5 },
            // { z: 12.5, x: -21.65064 },
            // { z: 0, x: -25 },
            // { z: -12.5, x: -21.65064 },
            // { z: -21.65064, x: -12.5 }
          ]
          const material = new THREE.MeshBasicMaterial({
            color: 0xffffff
            // flatShading: true
            // map: texture
          })
          const cubes = row1.map((coord) => {
            const it = new THREE.Mesh(geometry, material)
            it.position.z = coord.z * 2
            it.position.x = coord.x * 2
            it.position.y = 4.5
            return it
          })
          const cubes2 = row1.map((coord) => {
            const it = new THREE.Mesh(geometry, material)
            it.position.z = coord.z * 2
            it.position.x = coord.x * 2
            it.position.y = -4.5
            return it
          })

          cubes.forEach((cube) => {
            scene.add(cube)
          })
          cubes2.forEach((cube) => {
            scene.add(cube)
          })

          const dirLight1 = new THREE.DirectionalLight(0xffffff, 3)
          dirLight1.position.set(1, 1, 1)
          scene.add(dirLight1)

          const dirLight2 = new THREE.DirectionalLight(0xffffff, 1)
          dirLight2.position.set(-1, -1, 1)
          scene.add(dirLight2)

          const ambientLight = new THREE.AmbientLight(0x555555)
          scene.add(ambientLight)

          const axesHelper = new THREE.AxesHelper(50)
          scene.add(axesHelper)

          // Render the scene and camera
          renderer.render(scene, camera)

          // const controls = new OrbitControls(camera, containerRef.current!)
          // controls.target.set(0, 0, 0)
          camera.rotation.z = 0.5
          cubes.forEach((cube, i) => {
            // cube.lookAt(new THREE.Vector3(0, 0, 0))
            // cube.rotation.z = 0
            // cube.rotation.x = 0
            // cube.rotation.y = 0
            cube.rotation.y = i * -0.261799
          })
          cubes2.forEach((cube, i) => {
            // cube.lookAt(new THREE.Vector3(0, 0, 0))
            // cube.rotation.z = 0
            // cube.rotation.x = 0
            cube.rotation.y = i * -0.261799
          })

          const renderScene = () => {
            // cubes.forEach((cube) => {
            //   cube.lookAt(camera.position)
            //   // cube.rotation.z = 0
            //   // cube.rotation.x = 0
            //   // cube.rotation.y = 0
            // })
            // cubes2.forEach((cube) => {
            //   cube.lookAt(camera.position)
            //   // cube.rotation.z = 0
            //   // cube.rotation.x = 0
            // })
            // controls.update()
            camera.rotation.z = 0.05
            camera.rotation.x = 0
            camera.rotation.y += 0.005
            renderer.render(scene, camera)
            requestAnimationFrame(renderScene)
          }

          // Call the renderScene function to start the animation loop
          renderScene()
        })

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
