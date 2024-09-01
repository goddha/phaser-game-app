import dynamic from 'next/dynamic'

const HiLow = dynamic(
  () => {
    return import('../../components/games/HiLow')
  },
  { ssr: false },
)

export default function Phaser() {
  return <HiLow />
}
