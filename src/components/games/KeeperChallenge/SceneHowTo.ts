import Phaser from 'phaser'
// import PlayScene from '../HiLow/Play'
import Button from './utils/Button'

// const [chooseMoney, setChoosMoney] = useState(0)
// const [chooseBullseye, setChoosBullseye] = useState(0)

export class SceneHowTo extends Phaser.Scene {
  constructor() {
    super('howtoScene')
  }

  create() {
    const txtHeader = 'กติกา'
    const txsub = 'เกม Penaty Goal เป็นเกมยิงจุดโทษที่ให้เข้าประตู หากยิงเข้าก็จะได้รับรางวัล'
    const txtRules = [
      '1.เลือกมุมยิงจุดโทษทิศทางที่ท่านต้องการ ซึ่งมีให้เลือกทั้งหมด 6 มุม ',
      '2.จากนั้นเลือกราคาที่ท่านต้องการจะวางเดิมพัน ',
      '3.กดปุุ่ม "เริ่มเกม" ',
      '4.รอผลรางวัล',
    ]
    // const bg =
    // var mask = shape.createBitmapMask()
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)')
    this.add.image(1280 / 2, 720 / 2, 'howtoBG')
    const howtoHeader = this.add.text(1280 / 2, 90, txtHeader, { font: 'bold 60px Kanit' }).setOrigin(0.5, 0)
    howtoHeader.setColor('#000000')
    const howtoSub = this.add.text(1280 / 2, 170, txsub, { font: '20px Kanit', wordWrap: { width: 500, useAdvancedWrap: true } }).setOrigin(0.5, 0)
    howtoSub.setColor('#000000')
    this.add
      .text(1280 / 2, 230, txtRules, { font: '20px Kanit', color: '#000000', wordWrap: { width: 450 } })
      .setOrigin(0.5, 0)
      .setLineSpacing(10)
    const btnExit = new Button(this, 40, 650, 'button_exit')
    btnExit.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume || 0 })
      this.scene.resume('betScene')
      this.scene.sleep()
    })
  }
}

export default function PhaserIndex() {
  return null
}
