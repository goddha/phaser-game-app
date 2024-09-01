import Phaser from 'phaser'
import Button from './utils/Button'
import ButtonExtra from './utils/ButtonExtra'
import Poster from './utils/Poster'
import GetRandomNumber from '../GlobalComponents/GetRandomNumber'

let chooseExtra = { name: '', odds: 0, key: 0 }
let chooseMoney = 0
let chooseEnemy = 0
const betChoices = [
  { amount: 8, key: 1, currency: 'THB' },
  { amount: 10, key: 2, currency: 'THB' },
  { amount: 15, key: 3, currency: 'THB' },
  { amount: 20, key: 4, currency: 'THB' },
  { amount: 25, key: 5, currency: 'THB' },
  { amount: 30, key: 6, currency: 'THB' },
]
const choicesExtra = [
  { name: 'หัว', odds: 5, key: 1 },
  { name: 'แขน', odds: 3, key: 2 },
  { name: 'ตัว', odds: 3, key: 3 },
]
const styleBtnText = {
  font: '40px Kanit',
  fill: '#ffff',
}
const styleBtnStartText = {
  font: 'bold 50px Kanit',
  fill: '#000',
}
const stylePosterText = {
  font: '18px Zantroke',
  fill: '#ffff',
}
const styleExtraText = {
  font: 'bold 25px Kanit',
  fill: '#000',
}
export class SceneBet extends Phaser.Scene {
  constructor() {
    super('betScene')
  }
  // preload() {}
  create() {
    this.add.image(0, 0, 'bgBlur').setOrigin(0, 0)
    this.add.image(70, 60, 'logo')
    const btnAudio = this.add
      .image(1280 - 10, 10, `btn${!!(<any>this.sound.get('bgm')).config.volume ? 'Audio' : 'Mute'}`)
      .setOrigin(1, 0)
      .setData({ enable: !!(<any>this.sound.get('bgm')).config.volume })
      .setInteractive({ cursor: 'pointer' })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        btnAudio.data.list.enable = !btnAudio.data.list.enable
        ;(<any>this.sound.get('bgm')).setVolume(+btnAudio.data.list.enable * 0.5)
        btnAudio.setTexture(`btn${btnAudio.data.list.enable ? 'Audio' : 'Mute'}`)
      })
    this.add.image(1280 / 2, 30, 'barChoose')
    this.add.text(1280 / 2, 30, 'เลือกค่าหัว', { font: 'bold 25px TS-Country-C-NP' }).setOrigin(0.5)
    this.add.image(200, 310, 'mainActor')
    const standbyEnemy = this.add.image(1085, 310, 'enemy0')
    this.add.image(1280, 720 - 245, 'betBgShadow').setOrigin(1, 1)
    this.add.image(1280, 720, 'betBg').setOrigin(1, 1)
    const btnStart = new Button(this, 1100, 602, 'btnStart')
      .on(
        Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
        () => {
          btnStart.setScale(1)
          this.sound.play(`shot${GetRandomNumber(1, 2)}`, { volume: +btnAudio.data.list.enable * 0.5 })
          this.add.image(1095, 592, 'effectBullet')
          this.add.rectangle(1280 / 2, 720 / 2, 1280, 720, 0x000000, 0.01).setInteractive()
          setTimeout(() => callResultScene(), 1000)
        },
        this
      )
      .setVisible(false)
    const fakeBtnStart = this.add.image(1100, 602, 'btnStartDisable').setVisible(true)
    const callResultScene = () => {
      this.scene.sleep('betScene')
      this.scene.launch('resultScene', {
        betChoice: {
          chooseMoney: chooseMoney,
          chooseEnemy: chooseEnemy,
          chooseExtra: chooseExtra,
          choicesExtra: choicesExtra,
          enableVolume: btnAudio.data.list.enable,
        },
      })
      chooseExtra = { name: '', odds: 0, key: 0 }
      chooseMoney = 0
      chooseEnemy = 0
    }
    this.add.text(1098, 590, 'ยิง', styleBtnStartText).setOrigin(0.5)
    let showMoney = this.add.text(480, 540, JSON.stringify(chooseMoney), { font: 'bold 25px TS-Country-C-NP' }).setOrigin(0.5)
    this.add.text(480, 570, betChoices[0].currency, { font: 'bold 25px TS-Country-C-NP' }).setOrigin(0.5)
    const txtShowExtra = this.add.text(420, 670, '', { font: '35px Kanit' }).setOrigin(0.5)
    const shadowExtraShow = this.add.image(175, 600, 'shadowExtraShow0')
    const posterShadow = this.add.image(0, 0, 'posterShadow').setVisible(false)
    const enemyPortrait = this.add.image(360, 560, 'portraitEnemy0')
    betChoices.map((choice, index) => {
      const posterX = index < 3 ? 465 + index * 175 : 465 + (index - 3) * 175
      const posterY = index < 3 ? 160 : 360
      let posterChoice: any, posterText: any, posterContainer: any
      posterChoice = new Poster(this, 0, 0, 'poster' + choice.key).setDataEnabled().setData('enemy', choice.key).setData('amount', choice.amount)
      posterText = this.add.text(0 - 25, 0 + 65, JSON.stringify(choice.amount) + ' ' + choice.currency, stylePosterText).setOrigin(0, 0.5)
      posterContainer = this.add.container(posterX, posterY).setSize(posterChoice.width, posterChoice.height)
      posterContainer.add(posterChoice).add(posterText)
      posterChoice
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
          this.sound.play('reload', { volume: +btnAudio.data.list.enable * 0.5 })
          posterChoice.handleChooseEnemy()
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
          posterContainer.setScale(1.05)
          this.sound.play('hover', { volume: +btnAudio.data.list.enable * 0.5 })
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
          posterContainer.setScale(1)
        })
      this.scene.scene.events.on('chooseEnemy', (optionCallBack: any) => {
        if (choice.key === optionCallBack) {
          chooseEnemy = optionCallBack
          chooseMoney = choice.amount
          posterShadow.setVisible(true).setX(posterContainer.x).setY(posterContainer.y)
        } else {
        }
        btnStart.setVisible(true)
        btnBet.setVisible(true)
        btnCancel.setVisible(true)
        fakeBtnStart.setVisible(false)
        fakeBtnBet.setVisible(false)
        fakeBtnCancel.setVisible(false)
        standbyEnemy.setTexture('enemy' + JSON.stringify(chooseEnemy))
        enemyPortrait.setTexture('portraitEnemy' + JSON.stringify(chooseEnemy))
        showMoney.setText(JSON.stringify(chooseMoney))
      })
    })

    const btnBet = new Button(this, 778, 560, 'btnOrange').setVisible(false)
    const fakeBtnBet = this.add.image(778, 560, 'btnOrangeDisable').setVisible(true)
    this.add.text(775, 560, 'แทงเพิ่มเติม', styleBtnText).setOrigin(0.5)
    btnBet
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.sound.play('reload', { volume: +btnAudio.data.list.enable * 0.5 })
        showExtraBet()
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        this.sound.play('hover', { volume: +btnAudio.data.list.enable * 0.5 })
      })
    const btnCancel = new Button(this, 848, 652, 'btnRed').setVisible(false)
    // const fakeBtnCancel = new Button(this, 848, 652, 'btnRedDisable').setVisible(true)
    const fakeBtnCancel = this.add.image(848, 652, 'btnRedDisable').setVisible(true)

    this.add.text(848, 652, 'ยกเลิก', styleBtnText).setOrigin(0.5)
    btnCancel
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.sound.play('reload', { volume: +btnAudio.data.list.enable * 0.5 })
        chooseExtra = { name: '', odds: 0, key: 0 }
        txtShowExtra.setText('')
        shadowExtraShow.setTexture('shadowExtraShow0')
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        this.sound.play('hover', { volume: +btnAudio.data.list.enable * 0.5 })
      })
    const btnInfo = this.add
      .image(680, 652, 'btnInfo')
      .setInteractive({ cursor: 'pointer' })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        btnInfo.setTint(0x0000)
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        if (btnInfo.isTinted) btnInfo.clearTint()
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.scene.pause('betScene')
        this.scene.launch('howtoScene')
      })

    const showExtraBet: Function = () => {
      const extraBetContainer = this.add.container(0, 0)
      const extraBase = this.add.rectangle(1280 / 2, 720 / 2, 1280, 720, 0x000000, 0.5).setInteractive()
      const extraArea = this.add.image(1280 / 2, 720 / 2, 'extraBg')
      const btnQuitExtra = new Button(this, 904, 134, 'btnQuitBlack').on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        extraBetContainer.setVisible(false)
      })
      const extraTxtHeadline = this.add.image(650, 140, 'extraTxtTha')
      const extraBtnConfirm = new Button(this, 663, 560, 'btnGreen')
      const extraTxtConfirm = this.add.text(663, 560, 'ยืนยัน', styleBtnText).setOrigin(0.5)
      const shadowGlowActive = this.add.image(520, 352, 'shadowExtra0')
      const shadowExtraBase = this.add.image(520, 352, 'shadowExtra0')
      const shadowGlow = this.add.image(520, 352, 'shadowExtra0').setVisible(false)
      extraBetContainer.add(extraBase).add(extraArea).add(extraBtnConfirm).add(extraTxtConfirm).add(extraTxtHeadline).add(btnQuitExtra)
      extraBtnConfirm
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
          this.sound.play('reload', { volume: +btnAudio.data.list.enable * 0.5 })
          extraBetContainer.setVisible(false)
          if (chooseExtra.key !== 0) {
            txtShowExtra.setText(chooseExtra.name + ' x' + JSON.stringify(chooseExtra.odds))
            shadowExtraShow.setTexture('shadowExtraShow' + JSON.stringify(chooseExtra.key))
          }
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
          this.sound.play('hover', { volume: +btnAudio.data.list.enable * 0.5 })
        })

      choicesExtra.map((choices, index) => {
        const btnExtraChoice = new ButtonExtra(this, 760, 286 + index * 70, 'extraChoiceBg')
          .setDataEnabled()
          .setData({ extra: choices.key, isToggle: false })
          .setAlpha(0.1)
        const txtExtraChoice = this.add.text(760, 286 + index * 70, 'เต็งยิงโดน' + choices.name + ' x' + choices.odds, styleExtraText).setOrigin(0.5)
        btnExtraChoice
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.sound.play('hover', { volume: +btnAudio.data.list.enable * 0.5 })
            shadowGlow.setTexture('shadowExtra' + JSON.stringify(choices.key)).setVisible(true)
            if (!btnExtraChoice.data.list.isToggle) {
              this.tweens.add({
                targets: btnExtraChoice,
                alpha: 1,
                duration: 100,
              })
            }
          })
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            shadowGlow.setVisible(false)
            if (!btnExtraChoice.data.list.isToggle) {
              this.tweens.add({
                targets: btnExtraChoice,
                alpha: 0.1,
                duration: 100,
              })
            }
          })
          .on(
            Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
            () => {
              this.sound.play('reload', { volume: +btnAudio.data.list.enable * 0.5 })
              btnExtraChoice.handleChooseExtra()
            },
            this
          )
        this.scene.scene.events.on('chooseExtra', (optionCallBack: any) => {
          if (choices.key === optionCallBack) {
            btnExtraChoice.data.list.isToggle = true
            btnExtraChoice.setAlpha(1).setTint(0xffffff)
            chooseExtra = choices
            shadowGlowActive.setTexture('shadowExtra' + JSON.stringify(choices.key))
          } else {
            btnExtraChoice.setAlpha(0.1).setTint(0x000000)
            btnExtraChoice.data.list.isToggle = false
          }
        })
        extraBetContainer.add(btnExtraChoice).add(txtExtraChoice).add(shadowExtraBase).add(shadowGlowActive).add(shadowGlow)
      })
    }
  }
  update() {}
}
