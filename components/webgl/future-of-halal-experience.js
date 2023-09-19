import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Stage } from '@react-three/drei'
import { useControls } from 'leva'
import dynamic from 'next/dynamic'
import { BlendFunction } from 'postprocessing'
import { Color } from 'three'

const OrbitControls = dynamic(
  () => import('@react-three/drei').then(({ OrbitControls }) => OrbitControls),
  {
    ssr: false,
  }
)

const Stats = dynamic(
  () => import('@react-three/drei').then(({ Stats }) => Stats),
  {
    ssr: false,
  }
)

const ContactShadows = dynamic(
  () =>
    import('@react-three/drei').then(({ ContactShadows }) => ContactShadows),
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

const FutureOfHalalModel = dynamic(() => import('./future-of-halal-model'), {
  ssr: false,
})

function Box(props) {
  const meshRef = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function CanvasHelper() {
  const { scene } = useThree()
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

  const minDistance = isMobile ? 2.5 : isLargeMobile ? 2.5 : isTablet ? 4 : 4.5
  const maxDistance = 7

  useEffect(() => {
    if (scene.environment) {
      scene.environment.intensity = 0
    }
  }, [scene])

  return (
    <>
      <OrbitControls
        // minPolarAngle={Math.PI / 2}
        // maxPolarAngle={Math.PI / 2}
        enableZoom={true}
        enablePan={true}
        // minZoom={1} // minimum zoom level, for example, 0.5 times the original distance
        // maxZoom={2} // maximum zoom level, for example, 2 times the original distance
        maxDistance={maxDistance}
        minDistance={minDistance}
      />
      {/* <Stats /> */}
      {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']}
          labelColor="white"
        />
      </GizmoHelper> */}
    </>
  )
}

function FutureOfHalalExperience() {
  const [isClient, setIsClient] = useState(false)
  const ref = useRef()

  useEffect(() => {
    setIsClient(true)
  }, [])

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

  return (
    <>
      {isClient && (
        <Canvas
          style={{
            width: '100vw',
            height: '100vh',
          }}
        >
          <ambientLight args={[new Color(ambientColor)]} />

          <group position={light1}>
            <directionalLight
              args={[new Color(lightsColor), light1Intensity]}
            />
          </group>

          <group position={light2}>
            <directionalLight
              args={[new Color(lightsColor), light2Intensity]}
            />
          </group>

          {/* <spotLight
            intensity={0.1}
            angle={0.1}
            penumbra={1}
            position={[10, 15, 10]}
            castShadow
          /> */}
          {/* <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.25}
            scale={10}
            blur={1.5}
            far={0.8}
          /> */}
          <pointLight position={[0, 0, 3]} intensity={1} />
          {/* <Environment preset="night" ground={true} /> */}

          {/* <Stage
            controls={ref}
            preset="rembrandt"  
            intensity={0.2}
            environment="night"
          > */}
          <FutureOfHalalModel />
          {/* </Stage> */}

          <CanvasHelper />
        </Canvas>
      )}
    </>
  )
}

export default FutureOfHalalExperience
