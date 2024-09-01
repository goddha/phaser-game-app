import Phaser from 'phaser'
import BtnGreenRound from './utils/BtnGreenRound'

export class SceneBoot extends Phaser.Scene {
  constructor() {
    super('bootScene')
  }

  create() {
    const styleBtnText = {
      font: '60px Kanit',
      fill: '#ffff',
    }
    this.add.image(1280 / 2, 720 / 2, 'bgBoot')
    this.add.image(1280 / 2, 250, 'logoBoot')
    new BtnGreenRound(this, 1280 / 2, 600)
      .on('pointerdown', () => {
        text.setY(text.y + 5)
      })
      .on('pointerup', () => {
        this.sound.play('clicking', { volume: 0.5 })
        text.setY(590)
        this.scene.start('playScene')
        this.scene.launch('betScene').bringToTop('betScene')
      })
    const text = this.add.text(1280 / 2, 590, 'เริ่มเกม', styleBtnText).setOrigin(0.5)
  }
}

export default function PhaserIndex() {
  return null
}
