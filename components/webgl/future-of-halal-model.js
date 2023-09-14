import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function FutureOfHalal(props) {
  const { nodes, materials } = useGLTF('/models/future-of-halal.glb')

  return (
    <group {...props} dispose={null}>
      <group scale={[1, 0.665, 1]}>
        <mesh geometry={nodes.Plane.geometry} material={materials.Cover} />
        <mesh geometry={nodes.Plane_1.geometry} material={materials.Pages} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/future-of-halal.glb')