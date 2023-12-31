import { Float, useGLTF, Stage } from '@react-three/drei'
import { useDebug } from '@studio-freight/hamo'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useFrame as useRaf } from '@studio-freight/hamo'
import { useMediaQuery } from 'react-responsive'
import { useScroll } from 'hooks/use-scroll'
import { button, useControls } from 'leva'
import { gsap, Power4 } from 'gsap'
import dynamic from 'next/dynamic'
import { mapRange } from 'lib/maths'
import { useStore } from 'lib/store'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import {
  Color,
  DoubleSide,
  Euler,
  MathUtils,
  MeshPhysicalMaterial,
  Vector2,
  Vector3,
  MeshStandardMaterial,
} from 'three'
import fragmentShader from './particles/fragment.glsl'
import vertexShader from './particles/vertex.glsl'
import {
  mobileSteps,
  largeMobileSteps,
  tabletSteps,
  desktopSteps,
} from './steps-config'

const GizmoHelper = dynamic(
  () => import('@react-three/drei').then(({ GizmoHelper }) => GizmoHelper),
  {
    ssr: false,
  }
)

const GizmoViewport = dynamic(
  () => import('@react-three/drei').then(({ GizmoViewport }) => GizmoViewport),
  {
    ssr: false,
  }
)

const Environment = dynamic(
  () => import('@react-three/drei').then(({ Environment }) => Environment),
  {
    ssr: false,
  }
)

function Raf({ render = true }) {
  const { advance } = useThree()

  useRaf((time) => {
    if (render) {
      advance(time / 1000)
    }
  })
}

function Particles({
  width = 250,
  height = 250,
  depth = 250,
  count = 1000,
  scale = 100,
  size = 100,
}) {
  const positions = useMemo(() => {
    const array = new Array(count * 3)

    for (let i = 0; i < array.length; i += 3) {
      array[i] = MathUtils.randFloatSpread(width)
      array[i + 1] = MathUtils.randFloatSpread(height)
      array[i + 2] = MathUtils.randFloatSpread(depth)
    }

    return Float32Array.from(array)
  }, [count, scale, width, height, depth])

  const noise = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count * 3 }, () => Math.random() * 100)
      ),
    [count]
  )

  const sizes = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count }, () => Math.random() * size)
      ),
    [count, size]
  )

  const speeds = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count }, () => Math.random() * 0.2)
      ),
    [count]
  )

  const scales = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count }, () => Math.random() * 100)
      ),
    [count]
  )

  const material = useRef()
  const points = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0,
      },
      uColor: {
        // value: new Color('rgb(255, 152, 162)'),
        value: new Color('rgb(255, 207, 206)'),
        // value: new Color('rgb(255, 236, 234)'),
      },
      uScroll: {
        value: 0,
      },
      uResolution: {
        value: new Vector2(width, height),
      },
    }),
    []
  )

  useEffect(() => {
    uniforms.uResolution.value.set(width, height)
  }, [width, height])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime
  })

  useScroll(({ scroll }) => {
    uniforms.uScroll.value = scroll
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-noise" args={[noise, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-speed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-scale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={uniforms}
      />
    </points>
  )
}

// const thresholds = [0, 1000, 2000, 3000, 4000, 5000]

const material = new MeshPhysicalMaterial({
  color: new Color('#FF98A2'),
  metalness: 1,
  roughness: 0.4,
  wireframe: true,
  side: DoubleSide,
})

export function Arm() {
  const { scene: arm1 } = useGLTF('/models/future-of-halal.glb')
  const [type, setType] = useState(1)
  const isMobile = useMediaQuery({
    query: '(max-width: 375px)',
  })
  const isLargeMobile = useMediaQuery({
    query: '(min-width: 376px) and (max-width: 576px)',
  })

  const isTablet = useMediaQuery({
    query: '(min-width: 577px) and (max-width: 992px)',
  })

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 993px)',
  })

  const steps = isMobile
    ? mobileSteps
    : isLargeMobile
    ? largeMobileSteps
    : isTablet
    ? tabletSteps
    : desktopSteps

  const [{ color, roughness, metalness, wireframe }, setMaterial] = useControls(
    () => ({
      color: '#b0b0b0',
      roughness: {
        min: 0,
        value: 0.4,
        max: 1,
      },
      metalness: {
        min: 0,
        value: 1,
        max: 1,
      },
      wireframe: false,
    }),
    []
  )

  const [
    {
      lightsColor,
      light1,
      light2,
      light1Intensity,
      light2Intensity,
      ambientColor,
    },
    setLights,
  ] = useControls(
    'lights',
    () => ({
      light1: {
        step: 1,
        value: [-159, 150, 50],
      },
      light2: {
        step: 1,
        value: [300, -100, 150],
      },
      // light1Intensity: {
      //   min: 0,
      //   value: 0.4,
      //   max: 1,
      // },
      // light2Intensity: {
      //   min: 0,
      //   value: 0.69,
      //   max: 1,
      // },
      light1Intensity: {
        min: 0,
        value: 1,
        max: 1,
      },
      light2Intensity: {
        min: 0,
        value: 1,
        max: 1,
      },
      lightsColor: '#000000',
      ambientColor: '#ebebeb',
    }),
    []
  )

  const [{ custom, scale, position, rotation }] = useControls('model', () => ({
    custom: false,
    scale: {
      min: 0,
      value: 0.05,
      max: 0.06,
      step: 0.001,
    },
    position: { value: [0, 0, 0] },
    rotation: { step: 1, min: -360, value: [0, 0, 0], max: 360 },
  }))

  useControls(
    'model',
    () => ({
      export: button(() => {
        alert(
          JSON.stringify({
            scale: scale.toFixed(3),
            position,
            rotation,
            type,
          })
        )
      }),
    }),
    [scale, position, rotation, type]
  )

  useEffect(() => {
    material.color = new Color(color)
    material.roughness = roughness
    material.metalness = metalness
    material.wireframe = wireframe
  }, [color, roughness, metalness, wireframe, material])

  // useEffect(() => {
  //   if (arm1) {
  //     arm1.traverse((node) => {
  //       if (node.material) node.material = material
  //     })
  //   }
  // }, [arm1, material])

  // useEffect(() => {
  //   if (arm2) {
  //     arm2.traverse((node) => {
  //       if (node.material) node.material = material
  //     })
  //   }
  // }, [arm2, material])

  const parent = useRef()
  const modelRef = useRef()

  const { viewport } = useThree()

  const _thresholds = useStore(({ thresholds }) => thresholds)
  const thresholds = useMemo(() => {
    return Object.values(_thresholds).sort((a, b) => a - b)
  }, [_thresholds])

  const [step, setStep] = useState(0)

  useScroll(
    ({ scroll }) => {
      setStep(scroll < _thresholds['light-start'] ? 0 : 1)
    },
    [_thresholds]
  )

  useScroll(({ scroll }) => {
    if (!parent.current) return
    if (custom) {
      parent.current.scale.setScalar(viewport.height * scale)
      parent.current.position.set(
        viewport.width * position[0],
        viewport.height * position[1],
        0
      )
      parent.current.rotation.fromArray(
        rotation.map((v) => MathUtils.degToRad(v))
      )
      return
    }

    const current = thresholds.findIndex((v) => scroll < v) - 1

    const start = thresholds[current]
    const end = thresholds[current + 1]
    const progress = mapRange(start, end, scroll, 0, 1)

    const from = steps[current]
    const to = steps[current + 1]

    if (parent.current) {
      parent.current.visible = from?.type === to?.type
    }

    if (!to) return

    const _scale = mapRange(0, 1, progress, from.scale, to.scale)
    const _position = new Vector3(
      viewport.width *
        mapRange(0, 1, progress, from.position[0], to.position[0]),
      viewport.height *
        mapRange(0, 1, progress, from.position[1], to.position[1]),
      0
    )
    const _rotation = new Euler().fromArray(
      new Array(3)
        .fill(0)
        .map((_, i) =>
          mapRange(0, 1, progress, from.rotation[i], to.rotation[i])
        )
    )

    parent.current.scale.setScalar(viewport.height * _scale)
    parent.current.position.copy(_position)
    parent.current.rotation.copy(_rotation)

    setType(to.type)
  })

  const heroSectionRefs = useStore(({ heroSectionRefs }) => heroSectionRefs)

  useEffect(() => {
    if (parent.current) {
      const t1 = gsap.timeline().delay(1)
      t1.to(heroSectionRefs.hexa1Ref.current, {
        delay: 1,
        opacity: 1,
        duration: 1,
        x: -200,
        stagger: 0.4,
        immediateRender: false,
        rotate: 0,
      })
        .to(
          heroSectionRefs.hexa2Ref.current,
          {
            opacity: 1,
            x: 100,
            duration: 1,
            rotate: 0,
          },
          '<'
        )
        // .to(
        //   parent.current.position,
        //   {
        //     y: 0,
        //     duration: 4,
        //     ease: Power4.easeOut,
        //   },
        //   '<'
        // )
        // .to(
        //   parent.current.rotation,
        //   {
        //     z: MathUtils.degToRad(30),
        //     y: 0,
        //     // duration: 2,
        //     ease: Power4.easeOut,
        //   },
        //   '<'
        // )
        .to(
          heroSectionRefs.scrollingTextRef.current,
          {
            opacity: 1,
          },
          '<'
        )
    }
  }, [parent.current])

  const calculateScale = () => {
    let scale = null
    if (window.innerWidth < 460) {
      scale = 15
    } else if (window.innerWidth < 960) {
      scale = 20
    } else if (window.innerWidth < 1280) {
      scale = 30
    } else {
      scale = 40
    }
    return [scale, scale, scale]
  }

  return (
    <>
      <ambientLight args={[new Color(ambientColor)]} />

      <group position={light1}>
        <directionalLight args={[new Color(lightsColor), light1Intensity]} />
      </group>

      <group position={light2}>
        <directionalLight args={[new Color(lightsColor), light2Intensity]} />
      </group>

      <Float floatIntensity={custom ? 0 : 1}>
        <group ref={parent}>
          <primitive
            ref={modelRef}
            // position={[-120, -250, 0]}
            // rotation={[0, 0.5, 0]}
            object={arm1}
            scale={calculateScale()}
            material={new MeshStandardMaterial({ metalness: 40, roughness: 0 })}
          />
        </group>
      </Float>
    </>
  )
}

function Content() {
  const { viewport } = useThree()
  const debug = useDebug()

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      {/* <Particles
        width={viewport.width}
        height={viewport.height}
        depth={500}
        count={100}
        scale={500}
        size={150}
      /> */}

      {/* {debug && (
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']}
            labelColor="white"
          />
        </GizmoHelper>
      )} */}

      <Arm />
    </>
  )
}

export function WebGL({ render = true }) {
  return (
    <Canvas
      gl={{
        powerPreference: 'high-performance',
        antialias: true,
        // stencil: false,
        // depth: false,
        alpha: true,
      }}
      dpr={[1, 2]}
      frameloop="never"
      orthographic
      camera={{ near: 0.01, far: 10000, position: [0, 0, 1000] }}
    >
      <Raf render={render} />
      <Suspense>
        <Content />
      </Suspense>
    </Canvas>
  )
}
