import dynamic from 'next/dynamic'

const PirateTreasure = dynamic(
  () => {
    return import('../../components/games/PirateTreasure')
  },
  { ssr: false }
)

export default function Phaser() {
  return <PirateTreasure />
}
