import React, { useEffect } from 'react'
import Button from 'components/controls/button'
import { gsap, Power4 } from 'gsap'

function Section2() {
  return (
    <>
      <span className="block lg:hidden w-full">
        <MobileView />
      </span>

      <span className="hidden lg:block w-full">
        <DesktopView />
      </span>
    </>
  )
}

export default Section2

function MobileView() {
  useEffect(() => {
    const t1 = gsap.timeline()
    t1.to('.section3-heading-mobile', {
      x: 50,
      stagger: 0.1,
      ease: 'back',
      scrollTrigger: {
        trigger: '.section3',
        start: 'top center',
        end: 'bottom top',
        scrub: 2,
        // markers: true,
      },
    })
  }, [])

  return (
    <div className="overflow-hidden whitespace-nowrap h-auto w-full">
      <p className="section3-heading-mobile text-[4rem] text-teal-300 font-extrabold uppercase">
        About Future
      </p>
      <p className="section3-heading-mobile text-[4rem] text-teal-300 font-extrabold uppercase">
        of Halal
      </p>
      <p className="section3-heading-mobile text-[4rem] text-teal-300 font-extrabold uppercase">
        & CEO SAMI
      </p>
    </div>
  )
}

function DesktopView() {
  useEffect(() => {
    const t1 = gsap.timeline()
    t1.to('.section3-heading', {
      xPercent: -40,
      duration: 2,
      scrollTrigger: {
        trigger: '.section2',
        start: 'bottom center',
        end: 'bottom top',
        scrub: 2,
        // markers: true,
      },
    })
  }, [])

  return (
    <div className="overflow-hidden whitespace-nowrap gap-12 h-full">
      <p className="section3-heading text-[12rem] text-teal-300 font-extrabold uppercase mx-[100px]">
        Future of Halal & CEO SAMI
      </p>
    </div>
  )
}
