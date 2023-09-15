import React from 'react'
import dynamic from 'next/dynamic'

const FutureOfHalalExperience = dynamic(
  () => import('components/webgl/future-of-halal-experience'),
  { ssr: false }
)

export default function Experience() {
  return (
    <div>
      <FutureOfHalalExperience />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      id: 'experience',
    },
  }
}
