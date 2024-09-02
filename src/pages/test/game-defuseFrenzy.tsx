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
      <Link href='/' replace>
        back
      </Link>
      <PirateTreasure />
    </div>
  )
}
