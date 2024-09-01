import Phaser from 'phaser'

let betAmount: number
const betCurrency = 'THB'
// let result: { odds: number; position: number; showing: boolean }[]
const getRandomArbitrary = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min)
}
const simulatedResult = (willWin: boolean) => {
  return !!getRandomArbitrary(-1, 1) && willWin ? getRandomArbitrary(2, 5) : false
}
const styleTextMain = {
  color: '#ffffff',
  font: 'bold 30px Kanit',
  padding: {
    top: 3,
  },
  align: 'center',
}
const styleBtnHowto = {
  ...styleTextMain,
  font: 'bold 40px Kanit',
  color: '#864E3A',
}
const styleTextResult = {
  ...styleTextMain,
  font: 'bold 50px Kanit',
}
const styleDialouge = {
  ...styleBtnHowto,
  color: '#000000',
}
const styleBtnConfirm = {
  ...styleBtnHowto,
  color: '#1e571a',
}
export class ScenePlay extends Phaser.Scene {
  constructor() {
    super('playScene')
  }
  init(data: any) {
    betAmount = data.chooseMoney
  }
  preload() {
    // console.log('playScene')
  }
  create() {
    const btnWithTextTexture = (object: Phaser.GameObjects.Image, text: Phaser.GameObjects.Text) => {
      const defualtY = text.y
      const keyName = object.texture.key
      object
        .on('pointerup', () => {
          object.setTexture(keyName)
          text.setY(defualtY)
        })
        .on('pointerdown', () => {
          this.sound.play('clicking', { volume: +btnAudio.data.list.enable * 0.5 })
          object.setTexture(keyName + 'Down')
          text.setY(text.y + 5)
        })
        .on('pointerover', () => {
          object.setTexture(keyName + 'Hover')
          text.setY(defualtY)
        })
        .on('pointerout', () => {
          object.setTexture(keyName)
          text.setY(defualtY)
        })
    }
    const betChance = {
      tryCount: 3,
      willWin: !!getRandomArbitrary(0, 1),
    }
    this.add.image(1280 / 2, 720 / 2, 'bgPlay')
    const btnAudio = this.add
      .image(1280 - 35, 0 + 25, `btnAudio${!!(<any>this.sound.get('bgm')).config.volume ? 'On' : 'Off'}`)
      .setInteractive({ cursor: 'pointer' })
      .setData({ enable: !!(<any>this.sound.get('bgm')).config.volume })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        btnAudio.data.list.enable = !btnAudio.data.list.enable
        ;(<any>this.sound.get('bgm')).setVolume(+btnAudio.data.list.enable * 0.5)
        btnAudio.setTexture(`btnAudio${btnAudio.data.list.enable ? 'On' : 'Off'}`)
      })
    this.add.image(150, 150, 'logo')
    this.add.text(150, 240, 'เงินเดิมพัน', styleTextMain).setOrigin(0.5)
    this.add.image(150, 300, 'bgMoney')
    this.add.text(150, 300, `${betAmount || 0}`, styleTextMain).setOrigin(0.5)
    this.add.text(150, 360, 'รางวัล', styleTextMain).setOrigin(0.5)
    this.add.image(150, 460, 'reward')
    this.add.image(1053, 290, 'bgDialogue')
    const dialogue = this.add.text(1053, 260, `เลือกเปิด ${betChance.tryCount} ใบนะ`, styleDialouge).setOrigin(0.5)
    this.add.image(1056, 510, 'grandma')
    const btnHowto = this.add
      .image(150, 580, 'btnYellow')
      .setInteractive({ cursor: 'pointer' })
      .on('pointerup', () => {
        // this.scene.pause()
        this.scene.launch('howtoScene')
      })
    const txtHowto = this.add.text(150, 580, 'กติกา', styleBtnHowto).setOrigin(0.5)
    btnWithTextTexture(btnHowto, txtHowto)
    this.add.image(560, 350, 'ticketCover')
    for (let i = 0; i < 9; i++) {
      const position = i < 3 ? { x: 385 + 175 * i, y: 173 } : i < 6 ? { x: 385 + 175 * (i - 3), y: 347 } : { x: 385 + 175 * (i - 6), y: 522 }
      const ticketPick = this.add.image(position.x, position.y, `ticket${i + 1}`).setInteractive()
      ticketPick.on(Phaser.Input.Events.POINTER_DOWN, () => {
        ticketPick.disableInteractive()
        betChance.tryCount--
        forbidPlay.setVisible(true)
        this.tweens.add({
          targets: ticketPick,
          scaleX: 0,
          duration: 200,
          onComplete: () => {
            const result = simulatedResult(betChance.willWin)
            this.tweens.add({
              targets: ticketPick,
              scaleX: 1,
              duration: 200,
              onComplete: () => {
                forbidPlay.setVisible(false)
              },
            })
            ticketPick.setTexture(`${result ? 'x' + result : 'ticketNoPrize'}`)
            result && this.sound.play(`block${result > 3 ? 'WinBig' : 'WinNormal'}`, { volume: +btnAudio.data.list.enable * 0.5 })
            if (!!result || betChance.tryCount < 1) {
              showResult(result)
              dialogue.text = !!result ? 'เยี่ยม เล่นอีกมั้ย' : 'น่าเสียดาย ลองใหม่นะ'
            } else {
              dialogue.text = `เปิดได้อีก ${betChance.tryCount} ครั้งนะ`
            }
            // console.log(betChance.willWin, betChance.tryCount)
          },
        })
      })
    }
    const forbidPlay = this.add
      .image(1280 / 2, 720 / 2, 'bgPlay')
      .setAlpha(0.01)
      .setInteractive()
      .setVisible(false)
    const grandmaEye = this.add.sprite(1056, 487, 'grandmaEye')
    this.anims.create({
      key: 'blink',
      frames: this.anims.generateFrameNames('grandmaEye', { frames: [0, 1, 0, 1], prefix: 'eye', suffix: '.png' }),
      frameRate: 5,
      repeatDelay: 2500,
      delay: 500,
      repeat: -1,
    })
    grandmaEye.play('blink')
    const showResult = (result: number | false) => {
      const fakebg = this.add.rectangle(1280 / 2, 720 / 2, 1280, 720, 0x000000, 0.7).setInteractive()
      const resultUi = !!result
        ? {
            resultImg: 'resultWin',
            resultText: { amount: `+ ${result * betAmount} ${betCurrency}`, header: 'ยินดีด้วย' },
            sound: `win${result > 3 ? 'Big' : 'Normal'}`,
          }
        : { resultImg: 'resultLoose', resultText: { amount: `- ${betAmount} ${betCurrency}`, header: 'เสียใจด้วย' }, sound: `lose` }
      const resultImg = this.add.image(1280 / 2, 720 / 2, `${resultUi.resultImg}`)
      const resultAmountText = this.add.text(1280 / 2, 430, resultUi.resultText.amount, styleTextResult).setOrigin(0.5)
      const resultHeaderText = this.add.text(1280 / 2, 330, resultUi.resultText.header, styleBtnHowto).setOrigin(0.5)
      let isDownConfirm = false
      const btnConfirm = this.add
        .image(1280 / 2, 560, 'btnGreen')
        .on('pointerdown', () => {
          isDownConfirm = true
        })
        .on('pointerup', () => {
          if (isDownConfirm) {
            resultContainer.setVisible(false)
            this.scene.launch('betScene')
          }
        })
        .on('pointerout', () => {
          isDownConfirm = false
        })
      const textConfirm = this.add.text(1280 / 2, 560, 'เล่นใหม่', styleBtnConfirm).setOrigin(0.5)
      btnWithTextTexture(btnConfirm, textConfirm)
      const resultContainer = this.add
        .container(0, 0)
        .add(fakebg)
        .add(resultImg)
        .add(resultAmountText)
        .add(btnConfirm)
        .add(textConfirm)
        .add(resultHeaderText)
        .setAlpha(0.01)
      const showResult = {
        targets: resultContainer,
        alpha: 1,
        duration: 300,
        delay: 500,
        onComplete: () => {
          this.sound.play(resultUi.sound, { volume: +btnAudio.data.list.enable * 0.5 })
          btnConfirm.setInteractive({ cursor: 'pointer' })
        },
      }
      this.tweens.add(showResult)
    }
  }
}
