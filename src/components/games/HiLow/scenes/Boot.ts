// import { client } from '../../../../graphql/client'
// import { ME } from '../../../../graphql/queries'
import { PassingDataType, gameDataType } from '../interfaces/init'
import loadingGraphics from '../partials/Loading'
export default class Boot extends Phaser.Scene {
  token: string | undefined
  gameData: gameDataType | undefined
  constructor() {
    super({ key: 'Boot', active: false, visible: false })
  }

  preload() {
    loadingGraphics(this)
  }

  init(props: PassingDataType) {
    this.token = props.token
    this.gameData = props.gameData
  }

  async create() {
    // const queriesMe = await client.request(ME)
    this.add.image(700, 360, 'bgStart').setDisplaySize(1400, 680 + 39)
    let btnStart = this.add.sprite(525, 550, 'BtnStartStandard').setDisplaySize(291, 357).setInteractive({ useHandCursor: true })
    if (this.token && this.gameData) {
      btnStart.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.scene.start('playScenePoker', { token: this.token, gameData: this.gameData })
        this.scene.remove('StartScene')
      })
    }
  }
}
