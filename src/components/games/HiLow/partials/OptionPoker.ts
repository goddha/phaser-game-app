import { theme } from '../../../../styles/styled'
import { cardOptionPoker, chipOptionPoker, optionHiLowPoker } from '../interfaces/init'
import Button from '../utils/Button'

// Option hi low
type chooseType = 0 | 1 | undefined
let chooseTypePoker: chooseType = undefined

const onTraceฺBtn = (btn: Button, text: Phaser.GameObjects.Text, self: Phaser.Scene) => {
  btn.on('pointerover', () => text.setY(text.y - 5), self)
  btn.on('pointerout', () => text.setY(text.y + 5), self)
}

export function OPTION_TYPE_POKER(self: Phaser.Scene) {
  optionHiLowPoker.map(({ key, value, text }, i) => {
    const containerBtnPoker = self.add.container(650 + i * 350, 200)
    const textPoker = self.add.text(0, 0, `${text} 1.5`, { font: 'bold 35px Kanit', color: theme.colors.white })
    const btnTypePoker = new Button(self, 0, 0, key).setDisplaySize(279, 71).setDataEnabled()
    onTraceฺBtn(btnTypePoker, textPoker, self)
    Phaser.Display.Align.In.Center(btnTypePoker, textPoker)
    containerBtnPoker.add([btnTypePoker, textPoker])
    btnTypePoker.data.set('valueTypePoker', value)
    btnTypePoker.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => btnTypePoker.handleChooseTypePoker(), self)
    self.scene.scene.events.on(
      'typeOption',
      (response: number) => {
        if (response === value) {
          if (chooseTypePoker === value) {
            btnTypePoker.alpha = 1
            chooseTypePoker = undefined
          } else {
            btnTypePoker.alpha = 0.5
            chooseTypePoker = value
          }
        } else {
          btnTypePoker.alpha = 1
        }
        self.events.emit('OPTION_TYPE_POKER', chooseTypePoker)
      },
      self,
    )
  })
}

// Card

type ChooseCardType = 'spades' | 'diamonds' | 'hearts' | 'clubs' | undefined
let chooseCard: ChooseCardType = undefined

export function CARD_OPTION_POKER(self: Phaser.Scene) {
  cardOptionPoker.forEach(({ key, value }, i) => {
    const card = new Button(self, 600 + i * 170, 410, key).setDisplaySize(108, 157)
    card.setDataEnabled()
    card.data.set('value', value)
    card.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => card.handleChooseCard(), self)
    self.scene.scene.events.on(
      'chooseCard',
      (response: string) => {
        if (response === value) {
          if (chooseCard === value) {
            card.alpha = 1
            chooseCard = undefined
          } else {
            card.alpha = 0.5
            chooseCard = value
          }
        } else {
          card.alpha = 1
        }
        self.events.emit('CARD_OPTION_POKER', chooseCard)
      },
      self,
    )
  })
}

// chip
let chooseChip: number = 0
export function Chip_OPTION_POKER(self: Phaser.Scene) {
  chipOptionPoker.map(({ text, price }, index) => {
    const containerMoney = self.add.container(110 * index + 570, 600)
    const textMoney = self.add.text(0, 0, text, { font: 'bold 25px Kanit', color: theme.colors.black })
    const money = new Button(self, 0, 0, 'money').setDisplaySize(100, 100).setDataEnabled()
    onTraceฺBtn(money, textMoney, self)
    Phaser.Display.Align.In.Center(money, textMoney)
    containerMoney.add([money, textMoney])
    money.data.set('money', price)
    money.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => money.handleChooseMoney(), self)
    self.scene.scene.events.on(
      'chooseMoney',
      (response: number) => {
        if (price === response) {
          if (chooseChip === price) {
            money.alpha = 1
            chooseChip = 0
          } else {
            money.alpha = 0.5
            chooseChip = price
          }
        } else {
          money.alpha = 1
        }
        self.events.emit('ChIP_OPTION_POKER', chooseChip)
      },
      self,
    )
  })
}
