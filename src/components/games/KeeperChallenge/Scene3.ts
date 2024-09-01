import Phaser from 'phaser'
import Button from './utils/Button'

let dataChooseBullseye: number
let dataChooseMoney: number
export class Scene3 extends Phaser.Scene {
  constructor() {
    super('resultScene')
  }

  init(data: any) {
    dataChooseBullseye = data.betChoice.chooseBullseye
    dataChooseMoney = data.betChoice.chooseMoney
  }

  create() {
    ///************* */ simulate API *************///
    const getRandomInt: Function = (max: number) => {
      const randomint = Math.floor(Math.random() * Math.floor(max)) + 1
      return randomint
    }
    const chooseBullseye: number = dataChooseBullseye
    let gkTo: number = chooseBullseye
    let ballTo: number = getRandomInt(5)
    const winAmount: number = gkTo === ballTo ? dataChooseMoney * 2 : dataChooseMoney * -1
    ///************* */ simulate API *************///
    this.sound.play('whistle', { volume: +(<any>this.sound.get('bgm')).config.volume || 0 })
    const keeperAnimated: { [index: number]: any } = {
      1: {
        info: 'topLeft',
        name: 'keeperTop',
        scaleX: 1,
      },
      5: {
        info: 'topCenter',
        name: 'keeperCenTop',
        scaleX: 1,
      },
      2: {
        info: 'topRight',
        name: 'keeperTop',
        scaleX: -1,
      },
      3: {
        info: 'bottomLeft',
        name: 'keeperLow',
        scaleX: 1,
      },
      4: {
        info: 'bottomRight',
        name: 'keeperLow',
        scaleX: -1,
      },
    }
    const ballProjection: { [index: number]: any } = {
      1: {
        info: 'topLeft',
        path: { x: 370, y: 60 },
        save: { x: -10, y: 60 },
        goal: { x: 320, y: 250 },
      },
      5: {
        info: 'topCenter',
        path: { x: 1280 / 2, y: 130 },
        save: { x: 1280 / 2, y: 130 },
        goal: { x: 1280 / 2, y: 250 },
      },
      2: {
        info: 'topRight',
        path: { x: 900, y: 60 },
        save: { x: 1300, y: 60 },
        goal: { x: 930, y: 250 },
      },
      3: {
        info: 'bottomLeft',
        path: { x: 295, y: 235 },
        save: { x: -10, y: 235 },
        goal: { x: 320, y: 250 },
      },
      4: {
        info: 'bottomRight',
        path: { x: 977, y: 235 },
        save: { x: 1300, y: 235 },
        goal: { x: 930, y: 250 },
      },
    }

    const animatedResult = () => {
      keeper.anims.play(keeperAnimated[gkTo].name)
      keeper.scaleX = keeperAnimated[gkTo].scaleX
      taker.anims.play('taker')
      this.sound.play('kick', { volume: +(<any>this.sound.get('bgm')).config.volume || 0 })
      ball.playAfterDelay('ball', 250)
      this.add.tween({
        targets: ball,
        x: ballProjection[ballTo].path.x,
        y: ballProjection[ballTo].path.y,
        duration: 200,
        delay: 300,
        scale: 0.6,
      })
      if (ballTo === gkTo) {
        this.sound.play('keep', { volume: +(<any>this.sound.get('bgm')).config.volume || 0 })
        ball.setDepth(1)
        const save = this.add.tween({
          targets: ball,
          x: ballProjection[ballTo].save.x,
          y: ballProjection[ballTo].save.y,
          duration: 300,
          delay: 500,
        })
        save.on(
          'complete',
          () => {
            showResult(true)
          },
          this
        )
      } else {
        ball.setDepth(-1)
        const goal = this.add.tween({
          targets: ball,
          x: ballProjection[ballTo].goal.x,
          y: ballProjection[ballTo].goal.y,
          duration: 300,
          delay: 500,
        })
        setTimeout(() => {
          this.sound.play('net', { volume: +(<any>this.sound.get('bgm')).config.volume || 0 })
        }, 200)
        goal.on('complete', () => {
          showResult(false)
        })
      }
      ballTo = getRandomInt(5)
      gkTo = getRandomInt(5)
    }
    const showResult = (isSave: boolean) => {
      const resultShow = isSave ? 'result_win' : 'result_loose'
      const fakebg = this.add.rectangle(1280 / 2, 720 / 2, 1280, 720, 0x000000).setAlpha(0.5)
      const resultEffect = this.add.image(1280 / 2, 720 / 2 - 15, `${resultShow}_effect`).setAlpha(0)
      const resultImg = this.add.image(1280 / 2, 720 / 2 - 15, resultShow)
      const winAmountText = this.add
        .text(1280 / 2, 125, JSON.stringify(winAmount), { font: '120px Kanit', color: '#ffffff' })
        .setOrigin(0.5)
        .setShadow(4, 4, '#333333', 2, false, true)
      const btnReplay = new Button(this, 1280 / 2, 650 - 50, 'button_edge_green')
      btnReplay
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
          this.scene.start('betScene')
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
          txtReplay.setY(650 - 50)
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
          txtReplay.setY(txtReplay.y - 5)
        })
      const txtReplay = this.add
        .text(1280 / 2, 650 - 50, 'เล่นใหม่', {
          font: 'bold 50px Kanit',
          color: '#ffffff',
        })
        .setOrigin(0.5)
        .setShadow(2, 2, '#439a00', 2, false, true)

      const resultContainer = this.add.container(0, 0, [fakebg, resultEffect, resultImg, winAmountText, btnReplay, txtReplay]).setAlpha(0).setDepth(10)
      this.tweens.add({
        targets: resultContainer,
        alpha: 1,
        duration: 500,
        delay: 1000,
        onComplete: () => {
          this.sound.play(`${isSave ? 'win' : 'lose'}`, { volume: +(<any>this.sound.get('bgm')).config.volume || 0 })
          this.tweens.add({
            targets: resultEffect,
            alpha: 1,
            duration: 100,
          })
          const isSaveEffect = isSave ? { duration: 9000, from: 0, to: 360 } : { duration: 20000, from: 360, to: 0 }
          this.tweens.addCounter({
            ...isSaveEffect,
            repeat: -1,
            onUpdate: (tween) => {
              resultEffect.setAngle(tween.getValue())
            },
          })
        },
      })
    }

    /// keeper and taker and ball ///

    const keeper = this.add.sprite(1280 / 2, -10, 'motionPenalty', 'motion_keeper_center_1.png')
    const ball = this.add.sprite(1280 / 2, 620, 'motionPenalty', 'soccer_1.png')
    const taker = this.add.sprite(1280 / 2 - 100, 700, 'motionPenalty', 'motion_taker_1.png')

    /// frames ///
    const keeperTopFrames = this.anims.generateFrameNames('motionPenalty', {
      start: 1,
      end: 12,
      prefix: 'motion_keeper_top_',
      suffix: '.png',
    })
    const keeperLowFrames = this.anims.generateFrameNames('motionPenalty', {
      start: 1,
      end: 9,
      prefix: 'motion_keeper_low_',
      suffix: '.png',
    })
    const keeperCenTopFrames = this.anims.generateFrameNames('motionPenalty', {
      frames: [1, 2, 3],
      prefix: 'motion_keeper_center_',
      suffix: '.png',
    })
    const ballFrames = this.anims.generateFrameNames('motionPenalty', {
      frames: [1, 2, 3],
      prefix: 'soccer_',
      suffix: '.png',
    })
    const takerFrames = this.anims.generateFrameNames('motionPenalty', {
      start: 1,
      end: 5,
      prefix: 'motion_taker_',
      suffix: '.png',
    })
    this.anims.create({
      key: 'keeperTop',
      frames: keeperTopFrames,
      frameRate: 10,
    })
    this.anims.create({
      key: 'keeperLow',
      frames: keeperLowFrames,
      frameRate: 10,
    })
    this.anims.create({
      key: 'keeperCenTop',
      frames: keeperCenTopFrames,
      frameRate: 5,
    })
    this.anims.create({
      key: 'taker',
      frames: takerFrames,
      frameRate: 10,
    })
    this.anims.create({
      key: 'ball',
      frames: ballFrames,
      frameRate: 20,
      repeat: 4,
    })
    /// animated automate ///
    setTimeout(() => {
      animatedResult()
    }, 1000)
  }
}

export default function PhaserIndex() {
  return null
}
