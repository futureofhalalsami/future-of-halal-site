import React, { useCallback, useRef, useEffect, useState } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import ParticlesJson from 'lib/particlesjs-config.json'
import { gsap } from 'gsap'

function ParticleBackground() {
  const particleRef = useRef()
  const [showParticles, setShowParticles] = useState(false)

  const particlesInit = useCallback(async (engine) => {
    console.log(engine)
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container) => {
    console.log(container)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setShowParticles(true)
    }, 2000)
  }, [])

  return (
    <>
      {showParticles && (
        <Particles
          ref={particleRef}
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={ParticlesJson}
        />
      )}
    </>
  )
}

export default ParticleBackground
