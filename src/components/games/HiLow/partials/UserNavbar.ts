import { client } from '../../../../graphql/client'
import { ME } from '../../../../graphql/queries'

const userNavBarSceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'userNavBar',
}

export default class UserNavBar extends Phaser.Scene {
  item: any
  constructor() {
    super(userNavBarSceneConfig)
  }

  init(data: any) {
    this.item = data
    this.scene.get(data.scene).events.on('upDateCredit', (e: any) => console.log(e))
  }

  async create() {
    const { me } = await client.request(ME)
    const background = this.add.graphics()
    background.fillStyle(Phaser.Display.Color.HexStringToColor('#057A8C').color, 1)
    background.fillRect(0, 0, 1400, 39)
    this.make
      .text({
        text: `ชื่อเล่น : ${me.username} ยอดเงินของคุณ : ${me.creditAmount}`,
        style: {
          font: '20px/26px Kanit',
        },
      })
      .setPadding(10)
    this.btnUserNavBar(1250, 'เติมเงิน', '#1CBB37')
    this.btnUserNavBar(1310, 'กติกา', '#F1AE05')
    this.btnUserNavBar(1380, 'ปิดเกม', '#E43242')
  }

  btnUserNavBar(x: number, text: string, color: string) {
    const btn = this.add.graphics()
    btn.fillStyle(Phaser.Display.Color.HexStringToColor(color).color, 1)
    const isText = this.make.text({
      text: text,
      style: {
        font: '20px/26px Kanit',
      },
    })
    isText.setPadding(5, 0)
    btn.fillRoundedRect(0, 0, isText.width, 23, 5)
    const containerBtn = this.add.container(x - isText.width, 10)
    console.log(isText.width)
    containerBtn.add([btn, isText])
  }
}
