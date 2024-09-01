import dynamic from 'next/dynamic'

const Wanted = dynamic(
  () => {
    return import('../../components/games/Wanted')
  },
  { ssr: false }
)

export default function Phaser() {
  return <Wanted />
}
