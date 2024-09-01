import Phaser from 'phaser'
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin'
// const InputTextPlugin = require('phaser3-rex-plugins/plugins/inputtext-plugin')
import { SceneBG } from './SceneBG'
import { SceneBoot } from './SceneBoot'
import { ScenePlay } from './ScenePlay'
import { SceneBet } from './SceneBet'
import { SceneHowTo } from './SceneHowTo'

export default function PhaserIndex() {
  return null
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'root',
  width: 1280,
  height: 720,
  scene: [SceneBG, SceneBoot, SceneBet, ScenePlay, SceneHowTo],
  transparent: true,
  backgroundColor: '#000000',
  loader: {
    baseURL: '/assets/pirateTreasure/',
  },
  audio: {
    disableWebAudio: true,
  },
  plugins: {
    global: [
      {
        key: 'rexInputTextPlugin',
        plugin: InputTextPlugin,
        start: true,
      },
    ],
  },
  scale: {
    mode: Phaser.Scale.NO_ZOOM,
    width: 1280,
    height: 720,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },
}
new Phaser.Game(config)
