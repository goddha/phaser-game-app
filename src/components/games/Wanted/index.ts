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
  width: 1280,
  height: 720,
  scene: [SceneBG, SceneBoot, SceneBet, SceneResult, SceneHowTo],
  transparent: true,
  backgroundColor: '#000',
  loader: {
    baseURL: '/assets/wanted/',
  },
  audio: {
    disableWebAudio: true,
  },
}
new Phaser.Game(config)
