import Phaser from 'phaser'
import Button from './utils/Button'

// const [chooseMoney, setChoosMoney] = useState(0)
// const [chooseBullseye, setChoosBullseye] = useState(0)

export class SceneHowTo extends Phaser.Scene {
  constructor() {
    super('howtoScene')
  }

  // preload() {
  // this.load.image('button_exit', 'button_exit.png')
  // this.load.image('howtoBG', 'howto.png')
  // }

  create() {
    const txtHeader = 'เกม Wanted'
    const txsub = 'เป็นเกมธีมคาวบอยที่ให้คุณได้ออกล่าค่าหัวเหล่าวายร้ายตัวฉกาจแล้วรับรางวัลนำจับมากมายจากค่าหัวของวายร้ายแต่ละคน ที่ถูกคุณจัดการ'
    const txtRules = [
      `\nกฏกติกาการเล่นเกม`,
      '1. เลือกวายร้ายจากป้ายประกาศที่คุณต้องการ',
      '2. หากคุณต้องการที่จะได้รับรางวัลมากขึ้น ให้เลือกกดที่ปุ่ม"แทงเพิ่มเติม"จะเป็นการเดิมพันเต็ง',
      // '- เต็งยิงโดนแขน x3',
      // '- เต็งยิงโดนขา x3',
      // '- เต็งยิงโดนหัว x5',
      '3. เมื่อเลือกเสร็จแล้วก็กด"เล่น"',
      '4. รอเวลาการออกผล',
      `\nการได้รับรางวัล`,
      '1. การได้รับรางวัลปกตินั้น ผู้เล่นจะต้องทายว่านักล่าค่าหัวจะสามารถปราบวายร้ายได้หรือไม่ ถ้าหากนักล่าค่าหัว สามารถปราบวายร้ายได้ คุณก็จะได้รับรางวัลตามค่าหัวของวายร้ายคนนั้นๆ',
      '2. การได้รับรางวัลแบบที่ 2 จะเป็นการแทงเต็งเพิ่มเติมจากแบบแรกให้ได้รางวัลมากขึ้น แต่ถ้าหากไม่ถูกส่วน ไหนที่คุณเต็งไว้เลยคุณจะไม่ได้รางวัลทั้งหมดในรอบนั้น',
    ]
    // const bg =
    // var mask = shape.createBitmapMask()
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)')
    this.add.image(1280 / 2, 720 / 2, 'paper')
    const howtoHeader = this.add.text(1280 / 2, 160, txtHeader, { font: 'bold 25px Kanit' }).setOrigin(0.5, 0)
    howtoHeader.setColor('#000000')
    const howtoSub = this.add
      .text(1280 / 2, 200, txsub, {
        font: '12px Kanit',
        wordWrap: { width: 300, useAdvancedWrap: true },
      })
      .setOrigin(0.5, 0)

    howtoSub.setColor('#000000')
    const howtoRules = this.add
      .text(1280 / 2, 260, txtRules, {
        font: '12px Kanit',
        wordWrap: { width: 250 },
        // lineSpacing: 7,
      })
      .setOrigin(0.5, 0)

    howtoRules.setColor('#000000')
    const btnExit = new Button(this, 800, 100, 'btnQuitWhite')
    btnExit.on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
      () => {
        // this.scene.resume('betScene')
        this.scene.resume('betScene')
        this.scene.sleep()
      },
      this
    )
  }
}

export default function PhaserIndex() {
  return null
}
