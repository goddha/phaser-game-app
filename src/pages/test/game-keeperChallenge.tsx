import Link from 'next/link'
import dynamic from 'next/dynamic'

const KeeperChallenge = dynamic(
  () => {
    return import('../../components/games/KeeperChallenge')
  },
  { ssr: false }
)

export default function Phaser() {
  return (
    <div>
      <Link href='/' target='_blank' rel='noopener noreferrer'>
        home
      </Link>
      <KeeperChallenge />
    </div>
  )
}
