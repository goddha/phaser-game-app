import Phaser from 'phaser'
import Button from './utils/Button'
import GetRandomNumber from '../GlobalComponents/GetRandomNumber'

let importData: {
  chooseMoney: number
  chooseEnemy: number
  chooseExtra: { name: string; key: number; odds: number }
  choicesExtra: [{ name: string; key: number; odds: number }]
  enableVolume: boolean
}
export class SceneResult extends Phaser.Scene {
  constructor() {
    super('resultScene')
  }

  init(data: any) {
    importData = data.betChoice
    console.log(importData)
  }

  create() {
    this.add.image(1280 / 2, 720 / 2, 'bg')
    //////////// DEBUG /////////////
    const debugPuaseBtn = () => {
      new Button(this, 200, 200, 'btnStart').on(
        Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
        () => {
          console.log({ resultExtraDetail })
          console.log({ result: resultIsWin })
          console.log({ resultExtra })
          console.log({ resultKilled })
          this.scene.pause('resultScene')
        },
        this
      )
    }
    //////////// DEBUG /////////////
    const stylePaperText = { font: 'bold 40px Kanit', color: '#000000', align: 'center' }
    const styleAmountText = { font: '25px Kanit' }

    ///************* */ simulate API *************///
    const getRandomInt = (max: number) => {
      return Math.floor(Math.random() * Math.floor(max)) + 1
    }
    const TEMPresultKilled = getRandomInt(2) //  1 = you 2 = enemy
    const TEMPresultExtra = getRandomInt(3) // 1 = head 2,3 = body
    let TEMPresultIsWin: boolean
    const TEMPchooseEnemy = importData.chooseEnemy
    if (TEMPresultKilled === 2 && importData.chooseExtra.key === 0) {
      TEMPresultIsWin = true
    } else if (TEMPresultKilled === 2 && importData.chooseExtra.key === TEMPresultExtra) {
      TEMPresultIsWin = true
    } else {
      TEMPresultIsWin = false
    }

    const TEMPresultExtraDetail = importData.choicesExtra.find((obj) => obj.key === TEMPresultExtra)
    const TEMPchooseExtra = importData.chooseExtra
    const odds = importData.chooseExtra.odds !== 0 ? importData.chooseExtra.odds : 2
    const resultAmount = TEMPresultIsWin ? `+ ${importData.chooseMoney * odds}` : `- ${importData.chooseMoney}`
    ///************* */ simulate API *************///

    ///*************** REAL VARIABLES **************/
    const currency = 'THB'
    const resultKilled = TEMPresultKilled
    const resultExtra = TEMPresultExtra
    const resultIsWin = TEMPresultIsWin
    const chooseEnemy = TEMPchooseEnemy
    const chooseExtra = TEMPchooseExtra
    const resultExtraDetail = TEMPresultExtraDetail
    ///*************** REAL VARIABLES **************/

    const hitSopt = resultExtra === 1 ? 'Head' : 'Body'
    const countdownFrames = this.anims.generateFrameNames('countdown', {
      frames: [3, 2, 1],
      suffix: '.png',
    })
    const enemyStandbyFrames = this.anims.generateFrameNames('shootOut', {
      frames: [1, 2, 3],
      prefix: 'enemy' + chooseEnemy,
      suffix: '.png',
    })
    const playerStandbyFrames = this.anims.generateFrameNames('shootOut', {
      frames: [1, 2, 3],
      prefix: 'you',
      suffix: '.png',
    })
    const playerShotFrames = this.anims.generateFrameNames('shootOut', {
      frames: [1, 2, 3],
      prefix: 'you',
      suffix: '.png',
    })
    this.anims.create({
      key: 'countdown',
      frames: countdownFrames,
      frameRate: 2,
    })
    this.anims.create({
      key: `shootOutEnemy${chooseEnemy}`,
      frames: enemyStandbyFrames,
      frameRate: 3,
    })
    this.anims.create({
      key: 'shootOutPlayer',
      frames: playerStandbyFrames,
      frameRate: 3,
    })
    this.anims.create({
      key: 'shootOutPlayerKilled',
      frames: playerShotFrames,
      frameRate: 3,
    })
    const countdown = this.add.sprite(1280 / 2, 720 / 2, 'countdown', '1.png')
    countdown.anims.play('countdown')
    const playerStandby = this.add.sprite(90, 655, 'shootOut', 'you1.png')
    const enemyStandby = this.add.sprite(1180, 655, 'shootOut', 'enemy' + chooseEnemy + '1.png')
    countdown.on('animationcomplete', () => {
      countdown.destroy()
      playerStandby.anims.play('shootOutPlayer')
      enemyStandby.anims.play(`shootOutEnemy${chooseEnemy}`)
    })
    const showShootOut = () => {
      this.sound.play(`reload`, { volume: +importData.enableVolume * 0.5 })
      this.add.image(1280 / 2, 720 / 2, 'bgRed')
      const playerShadow = this.add.sprite(90 + 220, 655, 'shootOut', 'youShot.png')
      const enemyShadow = this.add.sprite(1180 - 220, 655, 'shootOut', 'enemy' + chooseEnemy + 'Shot' + '.png')
      const showResultShootout = () => {
        const effectGun = this.add.image(345, 535, 'effectGun')
        this.sound.play(`shot${GetRandomNumber(1, 2)}`, { volume: +importData.enableVolume * 0.5 })
        if (resultKilled === 2) {
          effectGun.setX(345)
          enemyShadow.setFrame('enemy' + chooseEnemy + 'Shot' + hitSopt + '.png')
        } else {
          effectGun.setX(920).setFlipX(true)
          playerShadow.setFrame('you' + 'Shot' + hitSopt + '.png')
        }
        setTimeout(() => showResultPaper(resultExtra), 1000)
      }
      setTimeout(() => showResultShootout(), 500)
      // debugPuaseBtn()
    }
    const showResultPaper = (position: number) => {
      this.add.rectangle(1280 / 2, 720 / 2, 1280, 720, 0x000000, 0.5).setInteractive()
      const containerResult = this.add.container(0, 0).setAlpha(0.01)
      const containerPaperResult = this.add.container(0, 0).setAlpha(0.01)
      const showAmount = () => {
        const showAmount = this.add.image(1280 / 2, 720 / 2, resultIsWin ? 'resultWin' : 'resultLoose')
        const txtAmount = this.add.text(1280 / 2, 720 / 2 + 5, `${resultAmount} ${currency}`, styleAmountText).setOrigin(0.5)
        containerResult.add(showAmount).add(txtAmount)
        this.sound.play(`${resultIsWin && chooseExtra.key > 0 ? 'winBig' : resultIsWin ? 'win' : 'lose'}`, { volume: +importData.enableVolume * 0.5 })
        this.tweens.add({
          targets: containerResult,
          alpha: 1,
          duration: 500,
          onComplete: () => {
            new Button(this, 1280 / 2, 630, 'btnGreen').on(
              Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
              () => {
                this.scene.start('betScene')
              },
              this
            )
            this.add.text(1280 / 2, 630, `เล่นใหม่`, styleAmountText).setOrigin(0.5)
          },
        })
      }
      if (chooseExtra.key !== 0 && resultKilled === 2) {
        const paper = this.add.image(1280 / 2, 720 / 2, 'paper')
        const shadowResult = this.add.image(1280 / 2, 720 / 2, `shadowExtraResult${position}`)
        const textResult = this.add.text(1280 / 2, 720 / 2 + 210, `${resultExtraDetail?.name}\nx${resultExtraDetail?.odds}`, stylePaperText).setOrigin(0.5)
        containerPaperResult.add(paper).add(shadowResult).add(textResult)
        this.tweens.add({
          targets: containerPaperResult,
          alpha: 1,
          duration: 500,
          onComplete: () => {
            setTimeout(() => {
              this.tweens.add({
                targets: containerPaperResult,
                alpha: 0,
                duration: 500,
                onComplete: () => {
                  showAmount()
                  containerPaperResult.destroy()
                },
              })
            }, 2000)
          },
        })
      } else {
        showAmount()
        containerPaperResult.destroy()
      }

      // debugPuaseBtn()
    }
    playerStandby.on('animationcomplete', showShootOut)
    // debugPuaseBtn()
  }
}
