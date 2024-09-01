'use strict'
import { theme } from '../../../../styles/styled'
import Button from '../utils/Button'
import Box from '../utils/Box'
import { client } from '../../../../graphql/client'
import { BET_WITH_RESULT } from '../../../../graphql/queries'
import { Record, QueryBetWithResultArgs } from '../../../../graphql/generated'
import { CARD_OPTION_POKER, OPTION_TYPE_POKER, Chip_OPTION_POKER } from '../partials/OptionPoker'
import { CardResult } from '../partials/ResultPoker'
import { gameDataType, PassingDataType } from '../interfaces/init'

const scenePlayerConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'playScenePoker',
}

let CHIP_OPTION: number
let TYPE_POKER: number
let CARD_OPTION: string

export default class PlayScene extends Phaser.Scene {
  token: string | undefined
  gameData!: gameDataType
  constructor() {
    super(scenePlayerConfig)
  }

  init(props: PassingDataType) {
    const { token, gameData } = props
    this.token = token
    this.gameData = gameData
    console.log(this.gameData)
  }

  async create() {
    this.scene.launch('userNavBar', {
      scene: 'playScenePoker',
      credit: 123,
      test: this.make.text({
        text: '0 $',
        style: {
          font: '24px/35px Kanit',
          color: theme.colors.black,
          wordWrap: { width: 300 },
        },
      }),
    })

    this.add.image(700, 360, 'bg').setDisplaySize(1400, 680 + 39)
    // this.add.grid(700, 350, 1400, 680 + 39, 32, 32, 0x057605)
    CardResult(this)
    const winBox = new Box(this, 0, 0, 'win')
    const betBox = new Box(this, 0, 0, 'bet')
    const textWin = this.makeText('ยอดชนะ')
    const ScoreWin = this.makeText('0 $', theme.colors.white)

    const containerWinBox = this.add.container(125, 622)
    containerWinBox.add([winBox, textWin, ScoreWin])
    Phaser.Display.Align.In.Center(textWin, winBox).setY(-30)
    Phaser.Display.Align.In.Center(ScoreWin, betBox).setY(0)
    const textBet = this.makeText('ยอดเดิมพัน')
    const ScoreBet = this.makeText('0 $', theme.colors.white)

    const containerWinBet = this.add.container(350, 622)
    containerWinBet.add([betBox, textBet, ScoreBet])
    Phaser.Display.Align.In.Center(textBet, betBox).setY(-30)
    Phaser.Display.Align.In.Center(ScoreBet, betBox).setY(0)

    this.add.image(825, 80, 'logo').setDisplaySize(391, 200)

    OPTION_TYPE_POKER(this)
    this.scene.scene.events.on(
      'OPTION_TYPE_POKER',
      (response: number) => {
        TYPE_POKER = response
      },
      this,
    )
    const bgOption = this.add.sprite(850, 400, 'bgOption').setDisplaySize(790, 230)
    const containerTitle = this.add.container(900, 280)
    const title = this.add.sprite(0, 0, 'title').setDisplaySize(126, 54)
    const textTitle = this.add.text(0, 0, 'แทงสี', { font: '25px Kanit', color: theme.colors.black })
    textTitle.setShadow(0, 3, '#0000003B', 6)
    Phaser.Display.Align.In.Center(textTitle, title)
    const titlePosition = containerTitle.add([title, textTitle])
    Phaser.Display.Align.In.Center(titlePosition, bgOption)
    titlePosition.setY(bgOption.y - 110)

    CARD_OPTION_POKER(this)
    this.scene.scene.events.on(
      'CARD_OPTION_POKER',
      (response: string) => {
        CARD_OPTION = response
      },
      this,
    )

    this.add.sprite(750, 615, 'floorPrice').setDisplaySize(495, 70)
    Chip_OPTION_POKER(this)
    this.scene.scene.events.on(
      'ChIP_OPTION_POKER',
      (response: number) => {
        CHIP_OPTION = response
      },
      this,
    )

    const onSubmit = new Button(this, 1150, 615, 'submit').setDisplaySize(161, 114)
    const textSubmit = this.add.text(0, 0, 'ยืนยัน', { font: '25px Kanit', color: theme.colors.white })
    Phaser.Display.Align.In.Center(textSubmit, onSubmit)
    onSubmit.on(
      'pointerover',
      () => {
        textSubmit.setY(textSubmit.y - 5)
      },
      this,
    )
    onSubmit.on('pointerout', () => textSubmit.setY(textSubmit.y + 5), this)
    onSubmit.on(
      'pointerdown',
      async () => {
        this.events.emit('upDateCredit', '123')
        console.log(TYPE_POKER)
        console.log(CARD_OPTION)
        console.log(CHIP_OPTION)

        this.events.emit('getResultSuccessfully')
        if (this.token) {
          const isData = {
            token: this.token,
            data: { type: TYPE_POKER, value: CARD_OPTION, amount: CARD_OPTION },
            gameId: this.gameData._id,
          }
          const data = await client.request<{ data: Record }, QueryBetWithResultArgs>(BET_WITH_RESULT, isData)
          console.log('data', data)
        }
      },
      this,
    )
  }

  makeText(text: string, color: string = theme.colors.black): Phaser.GameObjects.Text {
    return this.make.text({
      text: text,
      style: {
        font: 'bold 24px/35px Kanit',
        color: color,
        wordWrap: { width: 300 },
      },
    })
  }
}
