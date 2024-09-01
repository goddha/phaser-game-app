import dynamic from 'next/dynamic'

const KeeperChallenge = dynamic(
  () => {
    return import('../../components/games/KeeperChallenge')
  },
  { ssr: false }
)

export default function Phaser() {
  return <KeeperChallenge />
}
