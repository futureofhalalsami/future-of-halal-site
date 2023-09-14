import cn from 'clsx'
import { Link } from 'components/link'
import { useStore } from 'lib/store'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import s from './navigation.module.scss'
import Button from 'components/controls/button'

const Navigation = () => {
  const [navIsOpen, setNavIsOpen] = useStore(
    (state) => [state.navIsOpen, state.setNavIsOpen],
    shallow
  )

  const router = useRouter()

  useEffect(() => {
    const onRouteChange = () => {
      setNavIsOpen(false)
    }

    router.events.on('routeChangeStart', onRouteChange)

    return () => {
      router.events.off('routeChangeStart', onRouteChange)
    }
  }, [])

  return (
    <div className="absolute w-full flex justify-between md:justify-evenly items-center p-2 z-[999]">
      <Image
        src="/images/logo.png"
        className="w-[80px] h-[80px] mb:w-[120px] mb:h-[120px]"
        alt="site-logo"
        width={120}
        height={120}
      />
      <hr className="h-[0.5px] w-full md:w-9/12 mx-2 my-8 bg-white border" />

      <a href="https://ceosami.com" target="_blank" rel="noreferrer">
        <button
          className={`
          px-2
          lg:px-6
          py-2
          min-w-[120px]
          flex
          jusitfy-center
          items-center
          gap-1
          text-center
          font-extrabold
          text-md
          md:text-lg
          lg:text-2xl
          rounded-tl-xl
          rounded-br-xl h-fit uppercase
          bg-white text-blue-900
          hover:bg-opacity-90 
          transition-all
       `}
        >
          <span className="m-auto flex justify-center items-center gap-1">
            Contact ME
          </span>
        </button>
      </a>
    </div>
  )
}

export default Navigation
