import cn from 'clsx'
import { Link } from 'components/link'
import { useStore } from 'lib/store'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import s from './navigation.module.scss'
import { Button } from 'components/button'

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
      <Image src="/images/logo.png" alt="site-logo" width={120} height={120} />
      <hr className="h-[0.5px] w-full md:w-9/12 mx-2 my-8 bg-white border" />
      <Button className={s.cta} arrow href="https://ceosami.com">
        Contact ME
      </Button>
    </div>
  )
}

export default Navigation
