import Phaser from 'phaser'
import { FC } from 'react'
import { PokerGameConfig } from './config'

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config)
  }
}

interface gameDataType {
  code: string
  image: string
  name: string
  _id: string
}

interface PropsType {
  token: string
  gameData: gameDataType
}

const PhaserIndex: FC<PropsType> = ({ token, gameData }): null => {
  const game = new Game(PokerGameConfig)
  game.scene.start('Boot', { token: token, gameData })
  return null
}

export default PhaserIndex
