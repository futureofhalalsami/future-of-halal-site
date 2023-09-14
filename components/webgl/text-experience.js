/* eslint-disable @next/next/no-sync-scripts */
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Button from 'components/controls/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'

export default function TextExperience() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <div className='absolute top-4 right-8'>
        <Button
          classNameCustom=""
          icon={
            <FontAwesomeIcon
              style={{ width: '22px', height: '22px' }}
              icon={faShoppingBag}
            />
          }
          text="Pre-Order Now"
          theme="dark"
        />
      </div>

      {isClient && (
        <>
          <div id="magic"></div>
          <Head>
            <script type="module" src="/js/3d-text.js"></script>
          </Head>
        </>
      )}
    </>
  )
}
