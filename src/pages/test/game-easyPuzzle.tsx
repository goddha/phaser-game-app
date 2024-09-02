import Link from 'next/link'
import dynamic from 'next/dynamic'

const EasyPuzzle = dynamic(
  () => {
    return import('../../components/games/EasyPuzzle')
  },
  { ssr: false }
)

export default function Phaser() {
  return (
    <div>
      <Link href='/' target='_blank' rel='noopener noreferrer'>
        home
      </Link>
      <EasyPuzzle />
    </div>
  )
}
