import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Button from 'components/controls/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const FutureOfHalalExperience = dynamic(
  () => import('components/webgl/future-of-halal-experience'),
  { ssr: false }
)

export default function Experience() {
  return (
    <div className='w-full'>
      <div className="flex flex-row justify-between w-full px-8 pt-4 absolute top-0 ultimate-z-index">
        <a href="/">
          <Button
            classNameCustom=""
            icon={
              <FontAwesomeIcon
                style={{ width: '22px', height: '22px', marginRight: '8px' }}
                icon={faArrowLeft}
              />
            }
            text="Back"
            theme="light"
          />
        </a>
      </div>

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
