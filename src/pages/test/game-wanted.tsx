import dynamic from 'next/dynamic'
import Link from 'next/link'

const Wanted = dynamic(
  () => {
    return import('../../components/games/Wanted')
  },
  { ssr: false }
)

export default function Phaser() {
  return (
    <div>
      <Link href='/' target='_blank' rel='noopener noreferrer'>
        home
      </Link>
      <Wanted />
    </div>
  )
}
