import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import dynamic from 'next/dynamic'

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

function FutureOfHalalExperience() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient && (
        <Canvas
          style={{
            width: '100vw',
            height: '100vh',
          }}
        >
          <FutureOfHalalModel />

          <ambientLight intensity={0.7} />
          <spotLight
            intensity={0.5}
            angle={0.1}
            penumbra={1}
            position={[10, 15, 10]}
            castShadow
          />
          <pointLight position={[0, 4, 0]} />
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.25}
            scale={10}
            blur={1.5}
            far={0.8}
          />
          {/* <Environment preset="studio" /> */}

          <OrbitControls />
          <Stats />
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport
              axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']}
              labelColor="white"
            />
          </GizmoHelper>
        </Canvas>
      )}
    </>
  )
}

export default FutureOfHalalExperience
