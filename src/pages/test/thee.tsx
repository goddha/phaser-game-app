import dynamic from 'next/dynamic'
// const HiLowPokerGame = dynamic(import('../../components/games/hi-low-poker'), { ssr: false })

export default function TheePage() {
  return '<HiLowPokerGame />'
}
