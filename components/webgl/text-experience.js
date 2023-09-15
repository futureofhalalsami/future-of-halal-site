/* eslint-disable @next/next/no-sync-scripts */
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Button from 'components/controls/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVrCardboard, faShoppingBag } from '@fortawesome/free-solid-svg-icons'

export default function TextExperience() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <div className="flex flex-row justify-between w-full px-8 pt-4 absolute top-0 ultimate-z-index">
        <Link href='/experience'>
          {/* <Button
            classNameCustom=""
            icon={
              <FontAwesomeIcon
                style={{ width: '22px', height: '22px', marginRight: '8px' }}
                icon={faVrCardboard}
              />
            }
            text="View in 360°"
            theme="light"
          /> */}
        </Link>

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
