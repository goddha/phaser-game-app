import Phaser from 'phaser'
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin'
import { Scene1 } from './Scene1'
import { SceneBG } from './SceneBG'
import { Scene2 } from './Scene2'
import { Scene3 } from './Scene3'
import { SceneHowTo } from './SceneHowTo'

export default function PhaserIndex() {
  return null
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'root',
  width: 1280,
  height: 720,
  scene: [SceneBG, Scene3, Scene1, Scene2, SceneHowTo],
  transparent: true,
  backgroundColor: '#000000',
  loader: {
    baseURL: '/assets/keeperChallenge/',
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
  min:{
    width: 800,
    height: 450,
  },
  max:{
    width: 1600,
    height: 900,
  },
  dom: {
    createContainer: true,
  },
}
new Phaser.Game(config)
