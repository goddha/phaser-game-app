import dynamic from 'next/dynamic'

const EasyPuzzle = dynamic(
  () => {
    return import('../../components/games/EasyPuzzle')
  },
  { ssr: false }
)

export default function Phaser() {
  return <EasyPuzzle />
}
