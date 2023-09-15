import React, { useState, useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const calculatePosition = () => {
  if (window.innerWidth < 520) {
    return [-0.75, 0, 0]
  } else if (window.innerWidth < 960) {
    return [-1.5, 0, 0]
  } else if (window.innerWidth < 1280) {
    return [-2, 0, 0]
  } else if (window.innerWidth < 1460) {
    return [-1.5, 0, 0]
  } else {
    return [-2, 0, 0]
  }
}

const calculateScale = () => {
  if (window.innerWidth < 460) {
    return 2
  } else if (window.innerWidth < 960) {
    return 4
  } else if (window.innerWidth < 1280) {
    return 5
  } else {
    return 6
  }
}

export default function FutureOfHalal(props) {
  const { nodes, materials } = useGLTF('/models/future-of-halal.glb')
  const ref = useRef()
  const [scale, setScale] = useState(calculateScale(window.innerWidth))

  useEffect(() => {
    function handleResize() {
      setScale(calculateScale(window.innerWidth))
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.1
  })

  return (
    <group {...props} dispose={null} ref={ref}>
      <group
        position={calculatePosition()}
        scale={[scale, scale, scale]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <mesh geometry={nodes.Plane.geometry} material={materials.Cover} />
        <mesh geometry={nodes.Plane_1.geometry} material={materials.Pages} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/future-of-halal.glb')
