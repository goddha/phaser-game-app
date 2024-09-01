import dynamic from 'next/dynamic'

const DuckbetTicket = dynamic(
  () => {
    return import('../../components/games/DuckbetTicket')
  },
  { ssr: false }
)

export default function Phaser() {
  return <DuckbetTicket />
}
