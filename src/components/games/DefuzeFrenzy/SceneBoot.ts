import Phaser from 'phaser'
import ButtonText from '../GlobalComponents/ButtonText'

export class SceneBoot extends Phaser.Scene {
  constructor() {
    super('bootScene')
    // super({ key: 'bootScene', active: true })
  }
  create() {
    this.sound.play('bgm', { volume: 0.5, loop: true })
    // const defualtType = { piece: 3, odds: 2, color: '1FC265' }
    const styleBtnText = {
      font: 'bold 45px Kanit',
      fill: '#ffffff',
    }
    this.add.image(1280 / 2, 720 / 2, 'bgCover')
    new ButtonText(this, 270, 510, 'button', 'เข้าเกม', styleBtnText, 3, undefined, 500).on('pointerup', () => {
      this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 })
      this.scene.start('playScene')
      this.scene.launch('betScene').bringToTop('betScene')
    })
  }
}

export default function PhaserIndex() {
  return null
}
