import Phaser from 'phaser'
import BtnOrangeEdge from './utils/BtnOrangeEdge'

export class SceneHowTo extends Phaser.Scene {
  constructor() {
    super('howtoScene')
  }

  create() {
    this.add
      .rectangle(1280 / 2, 720 / 2, 1280, 720, 0x000000, 0.5)
      .setInteractive()
      .setOrigin(0.5)
    const styleFont = { font: '16px Kanit', wordWrap: { width: 300 }, color: '#000000' }
    const txtHeader = 'เกม Duckbet Ticket'
    const txsub = 'วิธีการเล่น'
    const txtRules = {
      text: `1.  กดซื้อฉลากด้วยจำนวนเงินที่ต้องการ\n2.  ขูดฉลากด้วยเมาส์หรือกดปุ่มเปิดทั้งหมด\n3.  เมื่อขูดเสร็จ ผู้เล่นจะได้รับรางวัล หากภายในฉลากมีสัญลักษณ์ที่เหมือนกัน 3 ชิ้น`,
      style: { ...styleFont, ...{ align: 'left' } },
    }
    this.add.image(1280 / 2, 720 / 2 - 10, 'bgHowTo')
    this.add.text(1280 / 2, 110, txtHeader, { font: 'bold 25px Kanit', color: '#000000' }).setOrigin(0.5)
    this.add.text(1280 / 2, 130, txsub, styleFont).setOrigin(0.5)
    this.add.text(1280 / 2, 190, txtRules.text, txtRules.style).setOrigin(0.5)
    for (let i = 2; i < 6; i++) {
      const x = i % 2 === 0 ? 490 : 710
      const y = i % 2 === 0 ? 310 + 40 * i : 310 + 40 * (i - 1)
      console.log({ x, y })
      this.add.image(x, y, `resultx${i}`).setScale(0.5)
      this.add.text(x + 80, y, `ชนะ ${i} เท่า`, styleFont).setOrigin(0.5)
    }
    this.add
      .image(1280 / 2, 270, `resultx1`)
      .setScale(0.4)
      .setOrigin(0.5)
    this.add.text(1280 / 2, 330, `เล่นฟรีอีก 1 รอบด้วยเดิมพันเดิม`, styleFont).setOrigin(0.5)
    new BtnOrangeEdge(this, 1280 / 2, 570).on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_UP,
      () => {
        this.sound.play('clicking', { volume: 0.5 })
        this.scene.stop()
      },
      this
    )
    this.add.text(1280 / 2, 570, 'ยืนยัน', { font: '45px Kanit', color: '#ffffff' }).setOrigin(0.5)
  }
}

export default function PhaserIndex() {
  return null
}
