import cn from 'clsx'
import { Button } from 'components/button'
import { Link } from 'components/link'
import dynamic from 'next/dynamic'
import s from './footer.module.scss'

const GitHub = dynamic(() => import('icons/github.svg'), { ssr: false })

export const Footer = () => {
  return (
    <footer className={cn('theme-light', s.footer, 'text-white')}>
      <div className={s.bottom}>
        <div className={s.links}>
          {/* <Link
            className={cn(s.link, 'p-xs')}
            href="https://twitter.com/studiofreight"
          >
            Twitter
          </Link> */}
          <Link
            className={cn(s.link, 'p-xs')}
            href="https://instagram.com/ceo.sami"
          >
            Instagram
          </Link>
          <Link
            className={cn(s.link, 'p-xs')}
            href="https://linkedin.com/in/sami-abboud"
          >
            Linkedin
          </Link>
        </div>
        <p className={cn('p-xs', s.tm)}>
          <span>©</span> {new Date().getFullYear()} Future of Halal | CEO SAMI
        </p>
      </div>
    </footer>
  )
}
