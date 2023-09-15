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

const FutureOfHalalModel = dynamic(
  () => import('./future-of-halal-model'),
  { ssr: false }
)

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
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {/* <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} /> */}

          <FutureOfHalalModel />
          <OrbitControls />
          <Stats />
        </Canvas>
      )}
    </>
  )
}

export default FutureOfHalalExperience