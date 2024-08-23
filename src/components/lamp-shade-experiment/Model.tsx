import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { useRef } from 'react'
import { Mesh, ShaderMaterial } from 'three'

const glsl = (x: any) => x[0]

interface ModelProps {
  children?: React.ReactNode
}

const vertexShader = glsl`
  uniform float uAmplitude;
  uniform float uWavelength;
  uniform float uOffset;
  varying vec2 vUv;

  float mapRange(float value, float min1, float max1, float min2, float max2) {
    // return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    return clamp( min2 + (value - min1) * (max2 - min2) / (max1 - min1), min2, max2 );
  }

  void main() {
    vUv = uv;
    float theta = position.x * 0.8;
    vec3 circlePoint = vec3(sin(theta), cos(theta),0.);
    vec3 newPosition = position;
    float wave = uAmplitude * sin(position.x * uWavelength + uOffset);
    newPosition.z += wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

const fragmentShader = glsl`
  uniform sampler2D uTexture;
  varying vec2 vUv;
  void main() {
    vec4 color = texture2D(uTexture, vUv);
    gl_FragColor = color;
  }
`

export const Model = ({ children }: ModelProps) => {
  const { amplitude, wavelength } = useControls({
    amplitude: { value: 0.3, min: 0, max: 1, step: 0.01 },
    wavelength: { value: 2, min: 0, max: 20, step: 1 }
  })
  const texture = useTexture('/Junior.jpg')
  const uniforms = useRef({
    uAmplitude: { value: amplitude },
    uWavelength: { value: wavelength },
    uOffset: { value: 0 },
    uTexture: { value: texture }
  })

  const plane = useRef<Mesh>(null)

  useFrame(() => {
    if (!plane.current) {
      return
    }
    const material = plane.current.material as ShaderMaterial
    material.uniforms.uWavelength.value = wavelength
    material.uniforms.uAmplitude.value = amplitude
    // material.uniforms.uOffset.value += 0.04
  })

  return (
    <mesh ref={plane} position={[0, 0, -4]}>
      <planeGeometry args={[3, 3, 45, 45]} />
      {/* <meshBasicMaterial color={'red'} wireframe={true} /> */}
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        wireframe={true}
      />
    </mesh>
  )
}
