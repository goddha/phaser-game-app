import dynamic from 'next/dynamic'

const GrandmaTicket = dynamic(
  () => {
    return import('../../components/games/GrandmaTicket')
  },
  { ssr: false }
)

export default function Phaser() {
  return <GrandmaTicket />
}
