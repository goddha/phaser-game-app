import Phaser from 'phaser'
import BtnCancel from './utils/BtnCancel'

export class SceneHowTo extends Phaser.Scene {
  constructor() {
    super('howtoScene')
  }

  create() {
    const styleFont = {
      font: '20px Kanit',
      color: '#000000',
      align: 'center',
      fixedWidth: 420,
      wordWrapWidth: 420,
      wordWrapUseAdvanced: true,
    }
    const txtHeader = 'กติกา'
    // const txsub = 'วิธีการเล่น'
    const txtRules = {
      text: `1.  เลือกราคาที่ต้องการ\n\n2.  เลือกเปิดครั้งละ 1 ช่อง มีโอกาสเปิดได้ 3 ครั้ง\n\n3.  รับรางวัลเมื่อเปิดเจอช่องรางวัลต่อไปนี้`,
      style: { ...styleFont, align: 'left' },
    }
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)')
    this.add.image(1280 / 2, 720 / 2, 'bgHowto')
    this.add
      .text(1280 / 2, 110, txtHeader, {
        font: 'bold 40px Kanit',
        color: '#000000',
      })
      .setOrigin(0.5)
    this.add.text(1280 / 2, 235, txtRules.text, txtRules.style).setOrigin(0.5)
    for (let i = 2; i < 6; i++) {
      const x = i % 2 === 0 ? 460 : 700
      const y = i % 2 === 0 ? 260 + 60 * i : 260 + 60 * (i - 1)
      this.add.image(x, y, `x${i}` + (i < 4 ? 'Howto' : '')).setScale(0.5)
      this.add.text(x + 120, y, `ชนะ ${i} เท่า`, styleFont).setOrigin(0.5)
    }
    new BtnCancel(this, 868, 60).on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.sound.play('clicking', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 })
      // this.scene.resume('playScene')
      this.scene.stop()
    })
  }
}

export default function PhaserIndex() {
  return null
}
