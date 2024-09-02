import Link from 'next/link'
import dynamic from 'next/dynamic'

const GrandmaTicket = dynamic(
  () => {
    return import('../../components/games/GrandmaTicket')
  },
  { ssr: false }
)

export default function Phaser() {
  return (
    <div>
      <Link href='/' target='_blank' rel='noopener noreferrer'>
        home
      </Link>
      <GrandmaTicket />
    </div>
  )
}
