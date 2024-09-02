import Link from 'next/link'
import dynamic from 'next/dynamic'

const DuckbetTicket = dynamic(
  () => {
    return import('../../components/games/DuckbetTicket')
  },
  { ssr: false }
)

export default function Phaser() {
  return (
    <div>
      <Link href='/' target='_blank' rel='noopener noreferrer'>
        home
      </Link>
      <DuckbetTicket />
    </div>
  )
}
