import Phaser from 'phaser'
import { SceneBG } from './SceneBG'
import { SceneBoot } from './SceneBoot'
import { SceneBet } from './SceneBet'
import { SceneResult } from './SceneResult'
import { SceneHowTo } from './SceneHowTo'
import gameSettings from '../GlobalComponents/gameSettings'

export default function PhaserIndex() {
  return null
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: 'root',
  scene: [SceneBG, SceneBoot, SceneBet, SceneResult, SceneHowTo],  
  loader: {
    baseURL: '/assets/wanted/',
  },
  scale: {
    mode: Phaser.Scale.NO_ZOOM,
    width: 1280,
    height: 720,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
    ...gameSettings
  
}
new Phaser.Game(config)
