import Phaser from 'phaser'
import BtnPlay from './utils/BtnPlay'

export class SceneBoot extends Phaser.Scene {
  constructor() {
    super('bootScene')
    // super({ key: 'bootScene', active: true })
  }
  create() {
    this.sound.play('bgm', { volume: 0.5, loop: true })
    const audioEnable: number = this.sound.get('bgm').config.volume
    const styleBtnText = {
      font: 'bold 45px Kanit',
      fill: '#900a21',
    }
    this.add.image(1280 / 2, 720 / 2, 'bgBoot')
    new BtnPlay(this, 843, 384).on('pointerup', () => {
      this.sound.play('clicking', { volume: audioEnable * 0.5 })
      text.setY(590)
      this.scene.start('playScene')
      this.scene.launch('betScene').bringToTop('betScene')
    })
    const text = this.add.text(870, 520, 'เล่นเกม', styleBtnText).setOrigin(0.5).setAngle(-10)
  }
}

export default function PhaserIndex() {
  return null
}
