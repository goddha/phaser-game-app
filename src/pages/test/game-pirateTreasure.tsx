import dynamic from 'next/dynamic'
import Link from 'next/link'

const PirateTreasure = dynamic(
  () => {
    return import('../../components/games/PirateTreasure')
  },
  { ssr: false }
)

export default function Phaser() {
  return (
    <div>
      <Link href='/' target='_blank' rel='noopener noreferrer'>
        home
      </Link>
      <PirateTreasure />
    </div>
  )
}
