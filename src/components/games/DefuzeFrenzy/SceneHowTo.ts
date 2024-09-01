import Phaser from 'phaser'

const txtHeader = { text: 'กติกา', style: { font: 'bold 40px Kanit', color: '#ffffff' } }
const txtRules = {
  text: `1.  เลือกรูปแบบแผ่นป้ายที่จะเล่น\n2.  เลือกราคาที่ต้องการ\n3.  คุณจะชนะเมื่อเรียงแผ่นป้ายได้ถูกต้อง`,
  style: { font: '20px Kanit', color: '#ffffff', align: 'left', fixedWidth: 350, wordWrapWidth: 350, wordWrapUseAdvanced: true },
}

const txsub = { text: 'วิธีเล่น', style: { ...txtRules.style, font: 'bold 20px Kanit', color: '#088C82' } }
export class SceneHowTo extends Phaser.Scene {
  constructor() {
    super('howtoScene')
  }

  // preload() {
  // this.scene.pause('playScene')
  // }

  create() {
    this.add
      .rectangle(1280 / 2, 720 / 2, 1280, 720, 0x000000, 0.5)
      .setInteractive()
      .setOrigin(0.5)
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)')
    this.add.image(1280 / 2, 720 / 2, 'bgHowto')
    this.add.text(1280 / 2, 130, txtHeader.text, txtHeader.style).setOrigin(0.5)
    this.add.text(1280 / 2, 180, txsub.text, txsub.style).setOrigin(0.5)
    this.add
      .text(1280 / 2, 255, txtRules.text, txtRules.style)
      .setOrigin(0.5)
      .setLineSpacing(15)
    const btnExit = this.add
      .image(850, 75, 'btnX')
      .setInteractive({ cursor: 'pointer' })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 })
        // this.scene.resume('playScene')
        this.scene.stop()
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        btnExit.setTexture('btnXHover')
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        btnExit.setTexture('btnX')
      })
  }
}

export default function PhaserIndex() {
  return null
}
