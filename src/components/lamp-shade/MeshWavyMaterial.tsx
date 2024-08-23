import * as React from 'react'
import {
  IUniform,
  MeshPhysicalMaterial,
  MeshPhysicalMaterialParameters,
  Vector2
} from 'three'
import { useFrame } from '@react-three/fiber'
// eslint-disable-next-line
// @ts-ignore
import distort from '@react-three/drei/helpers/glsl/distort.vert.glsl'
import { ForwardRefComponent } from '@react-three/drei/helpers/ts-utils'

type DistortMaterialType = JSX.IntrinsicElements['meshPhysicalMaterial'] & {
  time?: number
  distort?: number
  radius?: number
}

type Props = DistortMaterialType & {
  speed?: number
  factor?: number
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortMaterialImpl: DistortMaterialType
    }
  }
}

interface Uniform<T> {
  value: T
}

export class DistortMaterialImpl extends MeshPhysicalMaterial {
  _time: Uniform<number>
  _distort: Uniform<number>
  _radius: Uniform<number>
  _uMouse: Uniform<Vector2>

  constructor(parameters: MeshPhysicalMaterialParameters = {}) {
    super(parameters)
    this.setValues(parameters)
    this._time = { value: 0 }
    this._distort = { value: 0.4 }
    this._radius = { value: 1 }
    this._uMouse = { value: new Vector2(0, 0) }
  }

  // FIXME Use `THREE.WebGLProgramParametersWithUniforms` type when able to target @types/three@0.160.0
  onBeforeCompile(shader: {
    vertexShader: string
    fragmentShader: string
    uniforms: { [uniform: string]: IUniform }
  }) {
    shader.uniforms.time = this._time
    shader.uniforms.radius = this._radius
    shader.uniforms.distort = this._distort

    shader.vertexShader = `
      uniform float time;
      uniform vec2 uMouse;

      float circle(vec2 uv, vec2 circlePosition, float radius) {
        float dist = distance(circlePosition, uv);
        return 1. - smoothstep(0.0, radius, dist);
      }

      float elevation(float radius, float intensity) {
        float circleShape = circle(uv, (uMouse * 0.5) + 0.5, radius);
        return circleShape * intensity;
      }
      ${distort}
      ${shader.vertexShader}
    `
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
        vec3 transformed = position;
        transformed.z += elevation(0.2, .7);
        `
    )

    shader.fragmentShader.replace('#include <normal_fragment_begin>', ``)

    console.log(shader.fragmentShader)
  }

  get time() {
    return this._time.value
  }

  set time(v) {
    this._time.value = v
  }

  get distort() {
    return this._distort.value
  }

  set distort(v) {
    this._distort.value = v
  }

  get radius() {
    return this._radius.value
  }

  set radius(v) {
    this._radius.value = v
  }

  get uMouse() {
    return this._uMouse.value
  }

  set uMouse(v) {
    this._uMouse.value = v
  }
}

export const MeshWavyMaterial: ForwardRefComponent<Props, DistortMaterialImpl> =
  /* @__PURE__ */ React.forwardRef(({ speed = 1, ...props }: Props, ref) => {
    const [material] = React.useState(() => new DistortMaterialImpl())
    useFrame(
      (state) =>
        material && (material.time = state.clock.getElapsedTime() * speed)
    )
    return (
      <primitive object={material} ref={ref} attach="material" {...props} />
    )
  })
MeshWavyMaterial.displayName = 'MeshWavyMaterial'
