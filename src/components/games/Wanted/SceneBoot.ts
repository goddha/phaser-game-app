import Phaser from 'phaser'
import Button from './utils/Button'

export class SceneBoot extends Phaser.Scene {
  constructor() {
    super({ key: 'bootScene' })
  }

  preload() {
    this.load.image('bootScreen', 'cover.png')
    this.load.glsl('bundle', 'bundle2.glsl.js')
  }
  create() {
    this.add.image(1280 / 2, 720 / 2, 'bootScreen')
    const styleBootText = { font: '25px Kanit' }
    const btnPlay = new Button(this, 1003, 512, 'btnPlay')
    this.add.text(1003, 610, 'เล่น', styleBootText).setOrigin(0.5)
    btnPlay.on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
      () => {
        this.sound.play('shot1', { volume: 0.5 })
        this.scene.start('betScene')
      },
      this
    )
    btnPlay.on(
      Phaser.Input.Events.POINTER_OVER,
      () => {
        btnPlay.setTexture('btnPlayOver')
      },
      this
    )
    btnPlay.on(Phaser.Input.Events.POINTER_OUT, () => {
      btnPlay.setTexture('btnPlay')
    })
    this.add.shader('bundle', 0, 0, 40, 40).setRenderToTexture('shaderTexture')
    this.add.image(1280 - 40, 0 + 40, 'shaderTexture').setOrigin(1, 0)
  }
}

export default function PhaserIndex() {
  return null
}
