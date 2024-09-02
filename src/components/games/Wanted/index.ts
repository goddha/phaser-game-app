import Phaser from 'phaser'
import { SceneBG } from './SceneBG'
import { SceneBoot } from './SceneBoot'
import { SceneBet } from './SceneBet'
import { SceneResult } from './SceneResult'
import { SceneHowTo } from './SceneHowTo'

export default function PhaserIndex() {
  return null
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: 'root',
  scene: [SceneBG, SceneBoot, SceneBet, SceneResult, SceneHowTo],
  transparent: true,
  backgroundColor: '#000',
  loader: {
    baseURL: '/assets/wanted/',
  },
  scale: {
    mode: Phaser.Scale.NO_ZOOM,
    width: 1280,
    height: 720,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  min:{
    width: 800,
    height: 450,
  },
  max:{
    width: 1600,
    height: 900,
  },
  audio: {
    disableWebAudio: true,
  },
}
new Phaser.Game(config)
