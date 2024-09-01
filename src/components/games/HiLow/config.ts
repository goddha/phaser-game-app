import StartScene from './scenes/Boot'
import PlayScene from './scenes/Play'
import UserNavBar from './partials/UserNavbar'

const Scene = [StartScene, PlayScene, UserNavBar]

export const PokerGameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  parent: 'root',
  width: 1400,
  height: 719,
  scene: Scene,
  backgroundColor: '#000000',
  title: 'Hi-Low Poker',
  url: '',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  loader: {
    baseURL: '/image/hi-low/',
  },
  render: { pixelArt: false, antialias: true },
  transparent: true,
}
