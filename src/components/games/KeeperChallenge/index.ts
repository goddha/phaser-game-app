import Phaser from 'phaser'
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin'
import { Scene1 } from './Scene1'
import { SceneBG } from './SceneBG'
import { Scene2 } from './Scene2'
import { Scene3 } from './Scene3'
import { SceneHowTo } from './SceneHowTo'
import gameSettings from '../GlobalComponents/gameSettings'

export default function PhaserIndex() {
  return null
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'root',
  scene: [SceneBG, Scene3, Scene1, Scene2, SceneHowTo],
  loader: {
    baseURL: '/assets/keeperChallenge/',
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
  ...gameSettings,
  dom: {
    createContainer: true,
  },
}
new Phaser.Game(config)
