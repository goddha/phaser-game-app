import Phaser from 'phaser'
// import btnWithTextTexture from '../GlobalComponents/btnWithTextTexture'
// import ButtonText from '../GlobalComponents/ButtonText'
import ButtonTextNoHover from '../GlobalComponents/ButtonTextNoHover'
import DrawUnderLine from '../GlobalComponents/DrawUnderLine'
import inputProperty from '../GlobalComponents/inputProperty'

// let chooseMoney: number
const betMin = 1
const betMax = 500
const betCurrency = 'THB'
const choiceMoney = [5, 10, 15, 20, 25, 30]
const styleBtn = {
  font: 'bold 40px Kanit',
  color: '#4C1C12',
}
const styleBtnConfirm = {
  font: 'bold 30px Kanit',
  color: '#ffffff',
}
const styleWarning = {
  font: '14px Kanit',
  color: '#ff3040',
  align: 'right',
  padding: {
    top: 2,
  },
}
let inputText: any
let showInputText: boolean
export class SceneBet extends Phaser.Scene {
  constructor() {
    super('betScene')
  }
  // preload() {
  //   this.scene.pause('playScene')
  // }
  create() {
    // showInputText = false
    showInputText = true
    this.scene.pause('playScene')
    const bg = this.add.image(1280 / 2, 720, 'bgMap').setOrigin(0.5, 1)
    this.anims.create({
      key: 'portalRotate',
      frames: this.anims.generateFrameNames('portal', { start: 1, end: 8, prefix: 'portal_', suffix: '.png' }),
      frameRate: 10,
      repeat: -1,
    })
    const portal1 = this.add.sprite(240, 1140 - 580, 'portal').play('portalRotate') // 1140
    const portal2 = this.add.sprite(447, 905 - 580, 'portal').play('portalRotate') //905
    const portal3 = this.add.sprite(794, 999 - 580, 'portal').play('portalRotate')
    const portal4 = this.add.sprite(894, 664 - 580, 'portal').play('portalRotate')
    const cloud1 = this.add.image(1301, 487, 'cloud')
    const cloud2 = this.add.image(46, 75, 'cloud')
    const tweensProps = {
      repeat: -1,
      yoyo: true,
      ease: 'Sine.easeInOut',
    }
    this.tweens.add({
      targets: this.add.container(0, 0, [bg, cloud1, cloud2, portal1, portal2, portal3, portal4]),
      y: 550,
      duration: 30000,
      ...tweensProps,
    })
    this.tweens.add({ targets: cloud1, x: 1200, duration: 5000, ...tweensProps })
    this.tweens.add({ targets: cloud2, x: 0, duration: 5000, ...tweensProps })
    this.add.rectangle(1280 / 2, 720 / 2, 1280, 720, 0x00000, 0.5).setInteractive()
    this.add.image(1280 / 2, 340, 'bgBet')
    const btnAudio = this.add
      .image(50, 50, `btnAudio${!!(<any>this.sound.get('bgm')).config.volume ? 'On' : 'Off'}`)
      .setInteractive({ cursor: 'pointer' })
      .setData({ enable: !!(<any>this.sound.get('bgm')).config.volume })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        btnAudio.data.list.enable = !btnAudio.data.list.enable
        ;(<any>this.sound.get('bgm')).setVolume(+btnAudio.data.list.enable * 0.5)
        btnAudio.setTexture(`btnAudio${btnAudio.data.list.enable ? 'On' : 'Off'}`)
      })
    const btnHowto = this.add
      .image(50, 100, 'btnHowto')
      .setInteractive({ cursor: 'pointer' })
      .on('pointerup', () => {
        this.scene.launch('howtoScene').bringToTop('howtoScene')
      })
    const textWarning = this.add
      .text(1280 / 2, 515, `รับระหว่าง ${betMin} ${betCurrency} - ${betMax} ${betCurrency}`, styleWarning)
      .setOrigin(0.5)
      .setVisible(false)
    inputText = this.add.rexInputText(495, 285, 240, 65, { ...inputProperty.property, fontSize: '35px', align: 'left' }).setOrigin(0)
    this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 })
    inputText.node.addEventListener('keypress', function (evt: KeyboardEvent) {
      if ((evt.which != 8 && evt.which != 0 && evt.which < 48) || evt.which > 57) {
        evt.preventDefault()
      }
    })
    this.add.text(640, 275, 'เลือกจำนวนเงินเดิมพัน', { ...styleBtn, font: '20px Kanit' }).setOrigin(0.5)
    choiceMoney.map((choice, index) => {
      const x = index < 3 ? 525 + index * 114 : 525 + (index - 3) * 114
      const y = index < 3 ? 400 : 470
      new ButtonTextNoHover(this, x, y, 'buttonWood', JSON.stringify(choice), styleBtn, 2).on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 })
        inputText.text = choice
      })
    })
    let btnConfirmIsDown = false
    new ButtonTextNoHover(this, 1280 / 2, 560, 'buttonOrange', 'ยืนยัน', styleBtnConfirm, 2)
      .on(Phaser.Input.Events.POINTER_UP, () => {
        if (btnConfirmIsDown) acceptAmount(parseInt(inputText.text))
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        btnConfirmIsDown = false
      })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 })
        btnConfirmIsDown = true
      })
    const btnClear = this.add
      .image(770, 320, 'buttonX')
      .setInteractive({ cursor: 'pointer' })
      .on('pointerup', () => {
        btnClear.clearTint()
      })
      .on('pointerout', () => {
        btnClear.clearTint()
      })
      .on('pointerdown', () => {
        this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 })
        btnClear.setTint(0xc61313)
        inputText.text = 0
      })
    var style = document.createElement('style')
    style.innerHTML = inputProperty.innerHtmlCss
    document.head.appendChild(style)
    const acceptAmount = (amount: number) => {
      this.add.rectangle(0, 0, 1280, 720, 0x000000, 0).setInteractive()
      if (amount >= betMin && amount <= betMax) {
        this.scene.start('playScene', { chooseMoney: amount })
      } else {
        textWarning.setVisible(true)
      }
    }
    const textHowto = this.add
      .text(1280 / 2, 620, 'วิธีเล่น', { font: '20px Kanit', color: '#ffffff' })
      .setOrigin(0.5)
      .setInteractive({ cursor: 'pointer' })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        inputText.setVisible(false)
        this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 })
        this.input.setDefaultCursor('auto')
        this.scene.launch('howtoScene').bringToTop('howtoScene')
      })
    DrawUnderLine(this, textHowto, 0xffffff)
    // }
  }
  update() {
    if (!this.scene.manager.isActive('howtoScene') && showInputText) {
      inputText.setVisible(true)
    } else if (showInputText) {
      inputText.setVisible(false)
    }
  }
}
