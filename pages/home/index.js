import { useRect } from '@studio-freight/hamo'
import cn from 'clsx'
import Button from 'components/controls/button'
import { Card } from 'components/card'
import { Title } from 'components/intro'
import { Link } from 'components/link'
import { ListItem } from 'components/list-item'
import { projects } from 'content/projects'
import { useScroll } from 'hooks/use-scroll'
import { Layout } from 'layouts/default'
import { button, useControls } from 'leva'
import { clamp, mapRange } from 'lib/maths'
import { useStore } from 'lib/store'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useIntersection, useWindowSize } from 'react-use'
import ParticleBackground from 'components/particles-background'
import ScrollingText from 'components/scrolling-text'
import Section2Content from 'components/sections/section2'
import Section3Content from 'components/sections/section3'
import TextExperience from 'components/webgl/text-experience'
import s from './home.module.scss'

const SFDR = dynamic(() => import('icons/sfdr.svg'), { ssr: false })
const GitHub = dynamic(() => import('icons/github.svg'), { ssr: false })

const Parallax = dynamic(
  () => import('components/parallax').then((mod) => mod.Parallax),
  { ssr: false }
)

const HorizontalSlides = dynamic(
  () =>
    import('components/horizontal-slides').then((mod) => mod.HorizontalSlides),
  { ssr: false }
)

const FeatureCards = dynamic(
  () => import('components/feature-cards').then((mod) => mod.FeatureCards),
  { ssr: false }
)

const WebGL = dynamic(
  () => import('components/webgl').then(({ WebGL }) => WebGL),
  { ssr: false }
)

const HeroTextIn = ({ children, introOut }) => {
  return (
    <div className={cn(s['hide-text'], introOut && s['show-text'])}>
      {children}
    </div>
  )
}

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState()
  const zoomRef = useRef(null)
  const [zoomWrapperRectRef, zoomWrapperRect] = useRect()
  const { height: windowHeight } = useWindowSize()
  const introOut = useStore(({ introOut }) => introOut)

  const [theme, setTheme] = useState('dark')
  const lenis = useStore(({ lenis }) => lenis)

  useControls(
    'lenis',
    () => ({
      stop: button(() => {
        lenis.stop()
      }),
      start: button(() => {
        lenis.start()
      }),
    }),
    [lenis]
  )

  useControls(
    'scrollTo',
    () => ({
      immediate: button(() => {
        lenis.scrollTo(30000, { immediate: true })
      }),
      smoothDuration: button(() => {
        lenis.scrollTo(30000, { lock: true, duration: 10 })
      }),
      smooth: button(() => {
        lenis.scrollTo(30000)
      }),
      forceScrollTo: button(() => {
        lenis.scrollTo(30000, { force: true })
      }),
    }),
    [lenis]
  )

  useScroll(({ scroll }) => {
    setHasScrolled(scroll > 10)
    if (!zoomWrapperRect.top) return

    const start = zoomWrapperRect.top + windowHeight * 0.5
    const end = zoomWrapperRect.top + zoomWrapperRect.height - windowHeight

    const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1)
    const center = 0.6
    const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1)
    const progress2 = clamp(0, mapRange(center - 0.055, 1, progress, 0, 1), 1)
    setTheme(progress2 === 1 ? 'light' : 'dark')

    zoomRef.current.style.setProperty('--progress1', progress1)
    zoomRef.current.style.setProperty('--progress2', progress2)

    if (progress === 1) {
      zoomRef.current.style.setProperty('background-color', 'currentColor')
    } else {
      zoomRef.current.style.removeProperty('background-color')
    }
  })

  const [whyRectRef, whyRect] = useRect()
  const [powerUpRectRef, powerUpRect] = useRect()
  const [cardsRectRef, cardsRect] = useRect()
  const [whiteRectRef, whiteRect] = useRect()
  const [featuresRectRef, featuresRect] = useRect()
  const [inuseRectRef, inuseRect] = useRect()
  const [threeDTextRef, threeDTextRect] = useRect()

  const addThreshold = useStore(({ addThreshold }) => addThreshold)

  useEffect(() => {
    addThreshold({ id: 'top', value: 0 })
  }, [])

  useEffect(() => {
    const top = powerUpRect.top - windowHeight / 2
    addThreshold({ id: 'power-up-start', value: top })
    addThreshold({
      id: 'power-up-end',
      value: top + powerUpRect.height,
    })
  }, [powerUpRect])

  useEffect(() => {
    const top = whyRect.top - windowHeight / 2
    addThreshold({ id: 'why-start', value: top })
    addThreshold({
      id: 'why-end',
      value: top + whyRect.height,
    })
  }, [whyRect])

  useEffect(() => {
    const top = cardsRect.top - windowHeight / 2
    addThreshold({ id: 'cards-start', value: top })
    addThreshold({ id: 'cards-end', value: top + cardsRect.height })
    addThreshold({
      id: 'red-end',
      value: top + cardsRect.height + windowHeight,
    })
  }, [cardsRect])

  useEffect(() => {
    const top = whiteRect.top - windowHeight
    addThreshold({ id: 'light-start', value: top })
  }, [whiteRect])

  useEffect(() => {
    const top = featuresRect.top
    addThreshold({ id: 'features', value: top })
  }, [featuresRect])

  useEffect(() => {
    const top = inuseRect.top
    addThreshold({ id: 'in-use', value: top })
  }, [inuseRect])

  useEffect(() => {
    const top = lenis?.limit
    addThreshold({ id: 'end', value: top })
  }, [lenis?.limit])

  useEffect(() => {
    const top = threeDTextRect.top
    addThreshold({ id: 'three-d', value: top })
  }, [threeDTextRect])

  useScroll((e) => {
    // console.log(
    //   window.scrollY,
    //   e.scroll,
    //   e.targetScroll,
    //   e.animatedScroll,
    //   e.velocity
    // )
    console.log(e.scroll, e.progress)
  })

  const inUseRef = useRef()

  const [visible, setIsVisible] = useState(false)
  const intersection = useIntersection(inUseRef, {
    threshold: 0.2,
  })
  useEffect(() => {
    if (intersection?.isIntersecting) {
      setIsVisible(true)
    }
  }, [intersection])

  // Hero section
  const scrollingTextRef = useRef()
  const hexa1Ref = useRef()
  const hexa2Ref = useRef()
  const setHeroSectionRefs = useStore(
    ({ setHeroSectionRefs }) => setHeroSectionRefs
  )
  const heroSectionRefs = useStore(({ heroSectionRefs }) => heroSectionRefs)

  useEffect(() => {
    if (!heroSectionRefs) {
      setHeroSectionRefs({
        scrollingTextRef,
        hexa1Ref,
        hexa2Ref,
      })
    }
  }, [heroSectionRefs])

  return (
    <Layout
      theme={theme}
      seo={{
        title: 'Future of Halal | CEO SAMI',
        description: 'Future of Halal | CEO SAMI',
      }}
      className={s.home}
    >
      <div className={s.canvas}>
        <WebGL />
      </div>

      <ParticleBackground />

      <section className={cn(s.hero, 'overflow-hidden')}>
        <div className="layout-grid-inner mt-36 w-screen">
          {/* <Title className={s.title} /> */}
          <div ref={scrollingTextRef} className={cn('opacity-0')}>
            <ScrollingText text="Future of Halal" />
          </div>

          {/* <SFDR className={cn(s.icon, introOut && s.show)} /> */}

          <span className={cn(s.sub)}>
            {/* <HeroTextIn introOut={introOut}>
              <h2 className={cn('h3', s.subtitle)}>Smooth Scroll</h2>
            </HeroTextIn> */}
            {/* <HeroTextIn introOut={introOut}>
              <h2 className={cn('p-xs', s.tm)}>
                <span>©</span> {new Date().getFullYear()} CEO Sami
              </h2>
            </HeroTextIn> */}
          </span>
        </div>

        <div className={cn(s.bottom, 'layout-grid')}>
          <div className={s.tagline}>
            <h1 className={cn(s.description, 'p-s2')}>
              <HeroTextIn introOut={introOut}>
                <p className="p-s2">Harnessing AI in the Future</p>
              </HeroTextIn>
              <HeroTextIn introOut={introOut}>
                <p className="p-s2">of the $6 Trillion Halal Industry.</p>
              </HeroTextIn>
            </h1>
          </div>

          <div
            className={cn(
              'hide-on-mobile',
              s['scroll-hint'],
              hasScrolled && s.hide,
              introOut && s.show
            )}
          >
            <div className={s.text}>
              <HeroTextIn introOut={introOut}>
                <p>scroll</p>
              </HeroTextIn>
              <HeroTextIn introOut={introOut}>
                <p> to explore</p>
              </HeroTextIn>
            </div>
          </div>

          <div
            className={cn(
              s.cta,
              introOut && s.in,
              'col-span-12 md:col-span-2 md:col-start-11'
            )}
          >
            <Button
              text="Join the Waitlist"
              classNameCustom="w-full ml-0 md:w-full md:m-auto lg:w-auto lg:m-0 lg:ml-auto"
              theme="light"
            />
          </div>

          <img
            ref={hexa1Ref}
            src="/images/Hexa1.png"
            className="absolute ml-[100px] w-[250px] top-24 blur-sm z-[-10] opacity-0 rotate-[35deg]"
            alt="strawberry"
          />

          <img
            ref={hexa2Ref}
            src="/images/Hexa2.png"
            className="absolute right-0 bottom-0 blur-sm z-[-10] opacity-0 rotate-[-20deg] w-[250px] lg:w-auto"
            alt="lemon"
          />
        </div>
      </section>

      <section
        ref={powerUpRectRef}
        className={
          'section2 h-auto lg:h-screen w-full overflow-hidden flex flex-col justify-center items-center'
        }
      >
        <Section2Content />
      </section>

      <section
        className={
          'section3 h-[50vh] w-full flex items-center overflow-hidden whitespace-nowrap'
        }
        ref={whiteRectRef}
      >
        <Section3Content />
      </section>

      <section className={s.why} data-lenis-scroll-snap-align="start">
        <div className="layout-grid">
          <h2 className={cn(s.sticky, 'h2')}>About Future Of Halal</h2>
          <aside className={s.features} ref={whyRectRef}>
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>Future of Halal:</h3>
              <p className="p">
                Harnessing AI in the Future of the $6 Trillion Halal Industry"
                is a groundbreaking work that delves into the untapped potential
                of artificial intelligence (AI) in transforming the global halal
                industry—a sector projected to be valued at a staggering $6
                trillion by year 2025.
              </p>
            </div>
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>Sami Abboud</h3>
              <p className="p">
                The book is written by Sami Abboud, a renowned entrepreneur and
                business leader with over 15 years of hands-on experience
                spearheading complex operations within highly regulated
                industries. Known in the business world as "CEO SAMI," he has an
                impressive track record of international business development
                and has served as a consultant to Top 100 charities. His
                extensive global footprint, including travel to over 50
                countries and participation in more than 300 international
                events, adds a layer of unparalleled expertise and credibility
                to his insights.
              </p>
            </div>
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>Book</h3>
              <p className="p">
                The book makes a compelling case for how AI can revolutionize
                the halal industry by boosting efficiency, enhancing
                transparency, and promoting sustainability. Drawing on Sami
                Abboud's deep expertise and global perspective, it explores
                cutting-edge AI technologies such as machine learning, data
                analytics, and blockchain. These technologies have the potential
                to streamline supply chain management, authenticate product
                quality, and even forecast consumer behavior.
              </p>
            </div>
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>capabilities of AI</h3>
              <p className="p">
                By leveraging the capabilities of AI,{' '}
                <Link
                  className="contrast semi-bold"
                  href="https://github.com/locomotivemtl/locomotive-scroll"
                >
                  "Future of Halal"{' '}
                </Link>{' '}
                posits that the halal industry is poised for unprecedented
                growth and innovation. It offers actionable strategies and
                insights not just for entrepreneurs but also for{' '}
                <Link
                  className="contrast semi-bold"
                  href="https://greensock.com/docs/v3/Plugins/ScrollSmoother"
                >
                  policymakers{' '}
                </Link>
                , aiming to set new benchmarks for ethical and sustainable
                practices in the industry.
              </p>
            </div>
          </aside>
        </div>
      </section>
      <section className={s.rethink}>
        <div className={cn('layout-grid', s.pre)}>
          <div className={s.highlight} data-lenis-scroll-snap-align="start">
            <Parallax speed={-0.5}>
              <p className="h2">What the Experts Are Saying:</p>
            </Parallax>
          </div>
          <div className={s.comparison}>
            <Parallax speed={0.5}>
              <div className=" text-teal-300 ">
                <h3 className={cn(s.title, 'h4')}>By Mohammed Omar Subedar,</h3>
              </div>
              <p className="p">
                (Chief Operating Officer, Halal Monitoring Authority of Canada)
                <br /> <br />
                The book{' '}
                <Link
                  className="contrast semi-bold"
                  href="https://github.com/locomotivemtl/locomotive-scroll"
                >
                  "The Future of Halal"
                </Link>{' '}
                is an outstanding resource for fostering greater transparency.
                It correlates with our vision and provides actionable advice for
                leveraging technology for expansion.
              </p>
            </Parallax>
          </div>
        </div>
      </section>
      <section
        ref={(node) => {
          inuseRectRef(node)
          inUseRef.current = node
        }}
        className={cn(
          'theme-light ultimate-z-index py-4',
          s['in-use'],
          visible && s.visible
        )}
        style={{ paddingBottom: '16px' }}
      >
        <div className="layout-grid">
          <aside className={s.title}>
            <p className="h3 text-white	 ">
              CEO
              <br />
              <span className="text-teal-300 ">SAMI</span>
            </p>
          </aside>
          <ul className={s.list}>
            {projects.map(({ title, source, href }, i) => (
              <li key={i}>
                <ListItem
                  title={title}
                  source={source}
                  href={href}
                  index={i}
                  visible={visible}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="w-full" id='text-experience'>
        <section
          className={'h-screen w-full flex justify-center items-center relative'}
          ref={threeDTextRef}
        >
          <TextExperience />
        </section>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      id: 'home',
    }, // will be passed to the page component as props
  }
}
