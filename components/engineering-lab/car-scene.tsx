'use client'

import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
import { useGLTF } from '@react-three/drei/core/Gltf'
import { Html } from '@react-three/drei/web/Html'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { Group, Mesh, Vector3, Spherical, MathUtils } from 'three'
import { animate, createTimeline } from 'animejs'
import 'animejs/adapters/three'
import { labConfig, subsystems, type SubsystemId } from '@/data/engineering-lab'
import styles from './engineering-lab.module.css'

export type ViewRequest = { serial: number } & (
  | { type: 'reset' }
  | { type: 'focus'; id: SubsystemId }
  | { type: 'orbit'; x: number; y: number }
  | { type: 'zoom'; delta: number }
)
interface Props {
  selected: SubsystemId
  request: ViewRequest
  reduced: boolean
  onSelect: (id: SubsystemId) => void
  onReady: () => void
  onFailure: () => void
}
const HOME = new Vector3(7.5, 4.7, 6.5)
const TARGET = new Vector3(0, 0.55, 0)

function CameraRig({ request, reduced }: Pick<Props, 'request' | 'reduced'>) {
  const { camera, invalidate } = useThree()
  const controls = useRef<OrbitControlsImpl>(null)
  useEffect(() => {
    const orbit = controls.current
    if (!orbit || request.serial === 0) return
    let target = orbit.target.clone()
    let destination = camera.position.clone()
    const offset = camera.position.clone().sub(target)
    if (request.type === 'reset') {
      target = TARGET.clone()
      destination = HOME.clone()
    }
    if (request.type === 'focus') {
      const system = subsystems.find((item) => item.id === request.id)
      if (!system) return
      target = new Vector3(...system.world)
      destination = offset.normalize().multiplyScalar(4.6).add(target)
    }
    if (request.type === 'orbit') {
      const spherical = new Spherical().setFromVector3(offset)
      spherical.theta += request.x
      spherical.phi = MathUtils.clamp(
        spherical.phi + request.y,
        Math.PI / 8,
        Math.PI * 0.47,
      )
      destination = new Vector3().setFromSpherical(spherical).add(target)
    }
    if (request.type === 'zoom') {
      const radius = MathUtils.clamp(
        offset.length() * Math.exp(request.delta),
        3.4,
        14,
      )
      destination = offset.normalize().multiplyScalar(radius).add(target)
    }
    orbit.enabled = false
    // Anime's Three adapter owns camera transforms. GSAP never touches this scene.
    invalidate()
    const timeline = createTimeline({
      defaults: { duration: reduced ? 0 : 700, ease: 'inOutCubic' },
      onUpdate: () => {
        orbit.update()
        invalidate()
      },
      onComplete: () => {
        orbit.enabled = true
        invalidate()
      },
    })
      .add(camera, { x: destination.x, y: destination.y, z: destination.z }, 0)
      .add(orbit.target, { x: target.x, y: target.y, z: target.z }, 0)
    return () => {
      timeline.cancel()
      orbit.enabled = true
    }
  }, [camera, invalidate, request, reduced])
  return (
    <OrbitControls
      ref={controls}
      makeDefault
      target={[0, 0.55, 0]}
      enablePan={false}
      enableDamping={!reduced}
      dampingFactor={0.1}
      rotateSpeed={0.6}
      minDistance={3.4}
      maxDistance={14}
      minPolarAngle={Math.PI / 8}
      maxPolarAngle={Math.PI * 0.47}
    />
  )
}

function Car({ onReady }: Pick<Props, 'onReady'>) {
  // No Draco or Meshopt decoder download, the complete GLB is only about 59 KB.
  const { scene } = useGLTF(labConfig.model, false, false)
  const model = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
    return clone
  }, [scene])
  const { invalidate } = useThree()
  useEffect(() => {
    invalidate()
    onReady()
  }, [invalidate, onReady])
  return <primitive object={model} dispose={null} />
}

function Hotspots({
  selected,
  onSelect,
  reduced,
}: Pick<Props, 'selected' | 'onSelect' | 'reduced'>) {
  const group = useRef<Group>(null)
  const { invalidate } = useThree()
  useEffect(() => {
    if (!group.current || reduced) return
    const reveal = animate(group.current, {
      scale: [0.85, 1],
      duration: 450,
      ease: 'outCubic',
      onUpdate: () => invalidate(),
    })
    return () => {
      reveal.revert()
    }
  }, [invalidate, reduced])
  return (
    <group ref={group}>
      {subsystems.map((item) => (
        <group key={item.id} position={item.world}>
          <Html center zIndexRange={[30, 10]}>
            <button
              type="button"
              data-lab-hotspot
              className={`${styles.sceneHotspot} ${selected === item.id ? styles.sceneHotspotSelected : ''}`}
              aria-label={`${item.number} ${item.name}`}
              aria-pressed={selected === item.id}
              aria-controls="lab-system-panel"
              onClick={(event) => {
                event.stopPropagation()
                onSelect(item.id)
              }}
            >
              <span>{item.number}</span>
              <span>{item.name}</span>
            </button>
          </Html>
        </group>
      ))}
    </group>
  )
}

function Diagnostics() {
  const samples = useRef<number[]>([])
  const frames = useRef(0)
  useFrame(({ gl, camera }, delta) => {
    if (process.env.NODE_ENV !== 'development') return
    frames.current++
    if (delta > 0 && delta < 0.1) {
      samples.current.push(delta * 1000)
      if (samples.current.length > 120) samples.current.shift()
    }
    const canvas = gl.domElement
    canvas.dataset.labFrames = String(frames.current)
    canvas.dataset.labDrawCalls = String(gl.info.render.calls)
    canvas.dataset.labTriangles = String(gl.info.render.triangles)
    canvas.dataset.labCamera = camera.position
      .toArray()
      .map((v) => v.toFixed(3))
      .join(',')
    if (samples.current.length)
      canvas.dataset.labMeanFrameMs = (
        samples.current.reduce((a, b) => a + b, 0) / samples.current.length
      ).toFixed(2)
  })
  return null
}

export default function CarScene(props: Props) {
  const root = useRef<HTMLDivElement>(null)
  const { onFailure } = props
  useEffect(() => {
    const canvas = root.current?.querySelector('canvas')
    if (!canvas) return
    const lost = (event: Event) => {
      event.preventDefault()
      onFailure()
    }
    canvas.addEventListener('webglcontextlost', lost)
    return () => canvas.removeEventListener('webglcontextlost', lost)
  }, [onFailure])
  return (
    <div className={styles.threeCanvas} ref={root}>
      <Canvas
        camera={{
          position: HOME.toArray() as [number, number, number],
          fov: 38,
          near: 0.1,
          far: 80,
        }}
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{ antialias: true, alpha: false, powerPreference: 'low-power' }}
        fallback={
          <div className={styles.sceneNotice}>
            This browser cannot display 3D. The studio view is available.
          </div>
        }
      >
        <color attach="background" args={['#0b0d11']} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[3, 6, 4]}
          intensity={3}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
          shadow-normalBias={0.04}
        />
        <directionalLight
          position={[-4, 3, -2]}
          intensity={2}
          color="#c4d0dc"
        />
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.015, 0]}
          receiveShadow
        >
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial
            color="#0b0d11"
            roughness={0.9}
            metalness={0.05}
          />
        </mesh>
        <Suspense fallback={null}>
          <Car onReady={props.onReady} />
          <Hotspots
            selected={props.selected}
            onSelect={props.onSelect}
            reduced={props.reduced}
          />
        </Suspense>
        <CameraRig request={props.request} reduced={props.reduced} />
        <Diagnostics />
      </Canvas>
    </div>
  )
}
