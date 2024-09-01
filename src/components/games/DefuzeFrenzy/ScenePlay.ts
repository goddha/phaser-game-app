import Phaser from 'phaser'
import ButtonText from '../GlobalComponents/ButtonText'
// import debugFindXorY from '../GlobalComponents/debugFindXorY'

// import getRandomArbitrary from '../GlobalComponents/GetRandomNumber'

let chooseMoney: number
let TEMPISWINNIG: boolean
// let isGameOver = false
// const getRandomArbitrary = (min: number, max: number) => {
//   return Math.round(Math.random() * (max - min) + min)
// }
// const getKeyByValue = (object: any, value: any) => {
//   const key = Object.keys(object).find((key) => object[key].key === value) || '0'
//   return parseInt(key)
// }
const styleBtn = {
  font: 'bold 50px Kanit',
  color: '#ffffff',
}
const styleMoney = {
  font: 'bold 25px Kanit',
  color: '#690C02',
}
const roadMap = [
  { key: 0, properties: { type: 'normal', number: 1 }, x: 1032, y: 1190, path: [964, 1170, 851, 1214] },
  { key: 1, properties: { type: 'normal', number: 2 }, x: 851, y: 1214, path: [760, 1193, 749, 1123, 638, 1136] },
  { key: 2, properties: { type: 'normal', number: 4 }, x: 638, y: 1136, path: [564, 1167, 593, 1230, 523, 1262, 424, 1210] },
  { key: 3, properties: { type: 'normal', number: 4 }, x: 424, y: 1210, path: [319, 1218, 253, 1221, 220, 1179, 243, 1133] },
  { key: 4, properties: { type: 'portal', number: 7 }, x: 243, y: 1133, path: [259, 1062, 154, 1000] },
  { key: 5, properties: { type: 'normal', number: 2 }, x: 154, y: 1000, path: [92, 946, 113, 877, 162, 854, 255, 844] },
  { key: 6, properties: { type: 'normal', number: 2 }, x: 255, y: 844, path: [325, 920, 382, 936, 447, 905] },
  { key: 7, properties: { type: 'portalOut', number: 1 }, x: 447, y: 905, path: [519, 878, 612, 918] },
  { key: 8, properties: { type: 'drop', number: 4 }, x: 612, y: 918, path: [679, 945, 738, 989, 799, 989] },
  { key: 9, properties: { type: 'portal', number: 12 }, x: 799, y: 989, path: [875, 976, 922, 908, 956, 883, 997, 899] },
  { key: 10, properties: { type: 'dropAll', number: 0 }, x: 997, y: 899, path: [1081, 899, 1144, 880, 1157, 822, 1063, 754] },
  { key: 11, properties: { type: 'normal', number: 2 }, x: 1063, y: 754, path: [1055, 647, 1013, 599, 957, 594, 920, 614, 869, 648] },
  { key: 12, properties: { type: 'portalOut', number: 1 }, x: 869, y: 648, path: [811, 711, 772, 776, 718, 791, 681, 755, 701, 694] },
  { key: 13, properties: { type: 'drop', number: 2 }, x: 701, y: 694, path: [675, 641, 627, 619, 571, 649, 598, 709, 571, 752, 523, 770] },
  { key: 14, properties: { type: 'dropAll', number: 0 }, x: 523, y: 770, path: [403, 786, 303, 754, 266, 702, 280, 667, 388, 607] },
  { key: 15, properties: { type: 'normal', number: 4 }, x: 388, y: 607, path: [460, 538, 468, 497, 444, 465, 392, 462, 309, 511, 253, 524, 169, 529] },
  { key: 16, properties: { type: 'free', number: 1 }, x: 169, y: 529, path: [106, 495, 101, 416, 136, 371, 243, 349] },
  { key: 17, properties: { type: 'drop', number: 2 }, x: 243, y: 349, path: [348, 417, 402, 401, 421, 350, 350, 291, 350, 250, 409, 210] },
  { key: 18, properties: { type: 'dropAll', number: 1 }, x: 409, y: 210, path: [467, 186, 519, 213, 567, 271, 621, 291] },
  { key: 19, properties: { type: 'normal', number: 4 }, x: 621, y: 291, path: [724, 266, 780, 294, 787, 332, 729, 427] },
  { key: 20, properties: { type: 'dropAll', number: 0 }, x: 729, y: 427, path: [695, 514, 776, 576, 839, 543, 887, 440, 951, 421] },
  {
    key: 21,
    properties: { type: 'normal', number: 2 },
    x: 951,
    y: 421,
    path: [1031, 454, 1113, 449, 1153, 391, 1114, 325, 974, 283, 869, 238, 869, 188, 932, 167, 1069, 238],
  },
  { key: 22, properties: { type: 'normal', number: 20 }, x: 1069, y: 238, path: [1069, 238] },
]
const patternsWithResult = [
  {
    result: 0,
    patterns: [
      [1, 4, 10],
      [1, 5, 10],
      [1, 6, 10],
      [2, 4, 10],
      [2, 7, 10],
      [2, 8, 10],
      [2, 8, 14],
      [3, 4, 10],
      [3, 7, 10],
      [3, 8, 10],
      [3, 8, 14],
      [4, 8, 10],
      [4, 8, 14],
      [4, 9, 14],
      [4, 10, 11],
      [4, 10, 14],
      [4, 11, 14],
      [4, 12, 14],
      [4, 13, 14],
      [5, 6, 10],
      [5, 7, 10],
      [5, 8, 10],
      [5, 9, 14],
      [5, 8, 14],
      [5, 10, 14],
      [5, 11, 14],
      [6, 7, 10],
      [6, 8, 10],
      [6, 9, 14],
      [6, 10, 14],
      [6, 11, 14],
      [6, 12, 14],
      [6, 13, 14],
      [4, 12, 16, 18],
      [4, 12, 16, 20],
    ],
  },
  {
    result: 0.25,
    patterns: [
      [4, 8, 9],
      [4, 8, 12],
      [5, 8, 13],
      [6, 8, 13],
      [4, 13, 16, 17],
    ],
  },
  {
    result: 0.5,
    patterns: [
      [1, 4, 8],
      [1, 7, 8],
      [2, 8, 13],
      [3, 8, 13],
      [4, 9, 13],
      [4, 12, 16, 17],
    ],
  },
  {
    result: 1,
    patterns: [
      [1, 4, 13],
      [1, 5, 8],
      [1, 6, 8],
      [2, 4, 8],
      [2, 7, 8],
      [2, 8, 9],
      [2, 8, 12],
      [3, 4, 8],
      [3, 7, 8],
      [3, 8, 9],
      [3, 8, 12],
      [3, 7, 8],
      [4, 11, 13],
      [5, 6, 8],
      [5, 8, 11],
      [6, 8, 11],
      [6, 9, 13],
      [6, 12, 13],
      [6, 7, 13],
    ],
  },
  {
    result: 2,
    patterns: [
      [1, 4, 9],
      [1, 7, 9],
      [1, 7, 12],
      [2, 8, 11],
      [3, 8, 11],
      [3, 9, 13],
      [5, 7, 9],
      [5, 11, 13],
      [6, 11, 13],
    ],
  },
  {
    result: 4,
    patterns: [
      [1, 5, 7],
      [1, 6, 7],
      [1, 5, 9],
      [1, 6, 9],
      [1, 6, 12],
      [2, 4, 9],
      [2, 7, 9],
      [2, 7, 12],
    ],
  },
  {
    result: 20,
    patterns: [
      [4, 12, 16, 22],
      [4, 9, 16, 22],
    ],
  },
]

// const functionTest = (patterns: number[][]) => {
//   let rtnstring = ''
//   patterns.map((pathArr) => {
//     let points = 1
//     pathArr.map((path) => {
//       rtnstring += `${roadMap[path].properties.type}`
//       if (roadMap[path].properties.type === 'normal') {
//         rtnstring += `(${points} * ${roadMap[path].properties.number})`
//         points = points * roadMap[path].properties.number
//       } else if (roadMap[path].properties.type === 'dropAll') {
//         rtnstring += `(${points} = 0)`
//         points = 0
//       } else if (roadMap[path].properties.type === 'drop') {
//         rtnstring += `(${points} / ${roadMap[path].properties.number})`
//         points = points / roadMap[path].properties.number
//       } else if (roadMap[path].properties.type === 'free') {
//         rtnstring += `(${points} * 1)`
//         points *= 1
//       }
//       rtnstring += ` | `
//       // rtnstring += `\n`
//       // rtnstring += `${roadMap[path].properties.type} : ${points} from ${roadMap[path].properties.number}\n`
//     })
//     // console.log(points)
//     rtnstring += `\n${points} path : ${pathArr}\n\n`

//     // rtnstring += '\n'
//   })

//   return rtnstring
// }

let shipFollow: Phaser.GameObjects.PathFollower
let shipGlow: Phaser.GameObjects.Image
let spinDiceContainer: Phaser.GameObjects.Container
let uiContainer: Phaser.GameObjects.Container
let gameOverContainer: Phaser.GameObjects.Container
export class ScenePlay extends Phaser.Scene {
  constructor() {
    super('playScene')
  }
  init(data: any) {
    TEMPISWINNIG = data.TEMPISWINNIG || !!Phaser.Math.RND.sign()
    chooseMoney = data.chooseMoney || 0
  }
  preload() {
    // console.log(functionTest(patternsWithResult[2].patterns))
    // patternsWithResult.map((arr) => {
    //   console.log(functionTest(arr.patterns))
    // })
    // functionTest(patternsWithResult)
    console.log('plaSCene Start')
  }
  create() {
    // ? //------------------------------------------------------------------------------
    // const randomResult = Math.floor(Math.random() * patternsWithResult.length)
    // const randomPattern = Math.floor(Math.random() * patternsWithResult[randomResult].patterns.length)
    // const insertPatternFromApiHere = !!chooseMoney ? patternsWithResult[randomResult].patterns[randomPattern] : [1, 2, 3]
    // const randomResult = Phaser.Math.Between(0, patternsWithResult.length)
    // const randomPattern = Phaser.Math.Between(0, patternsWithResult[randomResult].patterns.length)
    // console.log({ randomResult: patternsWithResult[randomResult].result })
    // console.log({ randomPattern: patternsWithResult[randomResult].patterns[randomPattern] })

    const randomPattern = Phaser.Math.RND.weightedPick(patternsWithResult)
    // const insertPatternFromApiHere = [1, 5, 7]
    const insertPatternFromApiHere = !!chooseMoney ? Phaser.Math.RND.pick(randomPattern.patterns) : [1, 2, 3]
    console.log({ randomPattern }, { insertPatternFromApiHere })
    // ? //------------------------------------------------------------------------------
    const pattern = insertPatternFromApiHere
    console.log({ pattern })
    // isGameOver = false
    let currentLife = 3
    let currentPosition = 0
    let currentPoints = chooseMoney
    this.add.image(1280 / 2, 10, 'bgMap').setOrigin(0.5, 0)
    this.anims.create({
      key: 'portalRotate',
      frames: this.anims.generateFrameNames('portal', { start: 1, end: 8, prefix: 'portal_', suffix: '.png' }),
      frameRate: 10,
      repeat: -1,
    })
    this.add.sprite(240, 1140, 'portal').play('portalRotate')
    this.add.sprite(447, 905, 'portal').play('portalRotate')
    this.add.sprite(794, 999, 'portal').play('portalRotate')
    this.add.sprite(894, 664, 'portal').play('portalRotate')
    this.tweens.add({
      targets: this.add.image(1301, 687, 'cloud'),
      x: 1200,
      duration: 5000,
      repeat: -1,
      yoyo: true,
      ease: 'Sine.easeInOut',
    })
    this.tweens.add({
      targets: this.add.image(46, 275, 'cloud'),
      x: 0,
      duration: 5000,
      repeat: -1,
      yoyo: true,
      ease: 'Sine.easeInOut',
    })
    const bgLife = this.add.image(1150, 50, 'bgLife')
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
        this.scene.launch('howtoScene')
      })
    const bgMoney = this.add.image(1130, 677, 'bgMoney')
    const textCurrentPointsHeader = this.add.text(1130, 666, 'TREASURE', styleMoney).setOrigin(0.5)
    const textCurrentPoints = this.add.text(1130, 697, `${currentPoints}`, { ...styleMoney, color: 'white' }).setOrigin(0.5)
    const textAdjustPoints = this.add.text(1220, 697, `+ 0`, styleMoney).setOrigin(0.5).setVisible(false)
    uiContainer = this.add.container(0, 0, [bgLife, btnAudio, btnHowto, bgMoney, textCurrentPointsHeader, textCurrentPoints, textAdjustPoints]).setDepth(100)
    const skullLifes: Phaser.GameObjects.Image[] = []
    for (let i = 0; i < currentLife; i++) {
      console.log(currentLife, i)
      const skull = this.add.image(1223 - 73.5 * i, 49, 'skullLife')
      skullLifes.push(skull)
    }
    uiContainer.add(skullLifes)
    const blurFilter = this.add.rectangle(0, 0, 1300, 750, 0x000000, 0.5).setInteractive({ cursor: 'normal' })
    const compassBody = this.add.image(0, -50, 'compassBody')
    const compassArrow = this.add.image(0, -50, 'compassArrow').setOrigin(0.5, 0.65)
    const spinBtn = new ButtonText(this, 0, 250, 'button', 'SPIN', styleBtn, undefined, undefined, 235)
      .setData('next', pattern[3 - currentLife])
      .on('pointerup', () => {
        spinTheDice(false, spinBtn.data.list.next)
        forbidPlay.setVisible(true)
      })
    const forbidPlay = this.add.rectangle(0, 0, 1300, 750, 0x000000, 0.01).setInteractive({ cursor: 'normal' }).setVisible(false)
    spinDiceContainer = this.add
      .container(1280 / 2, 720 / 2, [blurFilter, spinBtn, spinBtn.text, compassBody, compassArrow, forbidPlay])
      .setDepth(90)
      .setVisible(false)
    const startPath = new Phaser.Curves.Spline([0, 0, 0, 0])
    shipGlow = this.add.image(roadMap[0].x, roadMap[0].y, 'shipGlow').setVisible(false)
    const glowTween = this.tweens.add({
      targets: shipGlow,
      alpha: 0.1,
      duration: 500,
      yoyo: true,
      repeat: -1,
    })
    shipFollow = this.add
      .follower(<any>startPath, roadMap[0].x, roadMap[0].y, 'ship')
      .setRotation(3)
      .setVisible(false)
    const warping = (actor: Phaser.GameObjects.PathFollower, current: number, to: number, actorGlow: Phaser.GameObjects.Image) => {
      actor.stopFollow()
      this.tweens.add({
        targets: actor,
        duration: 100,
        alpha: 0,
      })
      actorGlow.setVisible(false)
      const warpPath = new Phaser.Curves.Spline([roadMap[current].x, roadMap[current].y, roadMap[to].x, roadMap[to].y])
      actor.setPath(<any>warpPath)
      actor.startFollow({
        rotateToPath: true,
        duration: 750,
        onComplete: () => {
          actorGlow.setVisible(true)
          this.tweens.add({
            targets: actor,
            duration: 100,
            alpha: 1,
          })
        },
      })
      currentPosition = to
      delayedCallSpinDice(true, pattern[3 - currentLife], 1500)
    }
    const spinTheDice = (showing: boolean, next: number) => {
      console.log(currentLife, showing, next)
      if (currentLife <= 0) {
        this.time.delayedCall(
          500,
          () => {
            gameOver()
          },
          [],
          this
        )
        // gameOver()
        return
      }
      if (showing) {
        // ? openCompass
        console.log('dothis')
        spinBtn.setData('next', next)
        spinDiceContainer.setAlpha(0.1).setVisible(true)
        this.tweens.add({
          targets: spinDiceContainer,
          alpha: 1,
          duration: 200,
          onComplete: () => {
            forbidPlay.setVisible(false)
          },
        })
      } else {
        // ? startSpinAndClose
        forbidPlay.setVisible(true)
        this.add.tween({
          targets: compassArrow,
          angle: 720 + (next - currentPosition - 1) * 60,
          duration: 2000,
          ease: 'Cubic.easeOut',
          easeParams: [],
          onComplete: () => {
            this.time.delayedCall(
              500,
              () => {
                spinDiceContainer.setVisible(false)
                compassArrow.setAngle(0)
                glowTween.stop()
                moving(shipFollow, currentPosition, next, shipGlow)
              },
              [],
              this
            )
          },
        })
      }
    }
    const gameOver = async () => {
      console.log('GAME OVER')
      // isGameOver = true
      bgLife.setVisible(false)
      bgMoney.setVisible(false)
      textCurrentPoints.setVisible(false)
      textCurrentPointsHeader.setVisible(false)
      const showborder = this.add.rectangle(0, 0, 1280, 720, 0xff00ff, 0.5).setInteractive({ cursor: 'normal' }).setOrigin(0).setVisible(false)
      const bgBlur = this.add.rectangle(1280 / 2, 720 / 2, 1300, 850, 0x000000, 0.5).setInteractive({ cursor: 'normal' })
      const resultEffect = this.add.image(1280 / 2 - 10, 360, 'resultWinEffect').setVisible(currentPoints > 0)
      this.tweens.addCounter({
        from: 0,
        to: 360,
        duration: 5000,
        repeat: -1,
        onUpdate: (tween) => {
          resultEffect.setAngle(tween.getValue())
        },
      })
      const resultImg = this.add.image(1280 / 2 - 10, 360, `result${currentPoints > 0 ? 'Win' : 'Lose'}`)
      const textHeader = this.add.text(775, 330, `${+currentPoints ? 'You Win' : 'Sorry...'} `, { color: '#690C02', font: 'bold 60px kanit' }).setOrigin(0.5)
      const textPoints = this.add.text(775, 410, `${currentPoints}`, { font: 'bold 40px Kanit', color: 'white' }).setOrigin(0.5)
      const newGameBtn = new ButtonText(this, 1280 / 2, 600, 'button', 'NEW GAME', { ...styleBtn, font: 'bold 30px kanit' }, undefined, undefined, 585).on(
        'pointerup',
        () => {
          forbidPlay.setVisible(true)
          this.time.delayedCall(
            500,
            () => {
              this.scene.launch('betScene').bringToTop('betScene')
            },
            [],
            this
          )
        }
      )
      const forbidPlay = this.add
        .rectangle(1280 / 2, 720 / 2, 1300, 850, 0x000000, 0.01)
        .setInteractive({ cursor: 'normal' })
        .setVisible(false)
      gameOverContainer = this.add.container(1280 / 2, 720 / 2, [
        showborder,
        bgBlur,
        resultEffect,
        resultImg,
        textHeader,
        textPoints,
        newGameBtn,
        newGameBtn.text,
        forbidPlay,
      ])
    }
    const delayedCallSpinDice = async (showing: boolean, to: number, timer: number = 500) => {
      this.time.delayedCall(
        timer,
        () => {
          console.log('do the delay')
          spinTheDice(showing, to)
        },
        [],
        this
      )
    }
    const textAdjustPointsEffect = (textItem: Phaser.GameObjects.Text, text: string, type: string) => {
      const textOriginalX = textItem.x
      const style = {
        font: 'bold 25px Kanit',
        color: type === 'normal' ? '#00aa00' : '#bb0000',
      }
      textItem.setVisible(true).setText(text).setStyle(style)
      this.tweens.add({
        targets: textItem,
        delay: 750,
        alpha: 0,
        x: textOriginalX + 10,
        duration: 500,
        onComplete: () => {
          textItem.setVisible(false).setAlpha(1).setX(textOriginalX)
        },
      })
    }
    const moving = async (actor: Phaser.GameObjects.PathFollower, from: number, to: number, actorGlow: Phaser.GameObjects.Image) => {
      console.log({ from }, { to })
      actor.setVisible(true)
      actorGlow.setVisible(true)
      let path = [roadMap[from].x, roadMap[from].y]
      path = path.concat(roadMap[from].path)
      for (let i = from + 1; i < to; i++) {
        path = path.concat(roadMap[i].path)
      }
      const splinePath = new Phaser.Curves.Spline(path)
      // var graphics = this.add.graphics()
      // graphics.clear()
      // graphics.lineStyle(1, 0xffffff, 0.5)
      // splinePath.draw(graphics, 128)
      // graphics.fillStyle(0x00ff00, 0.5)
      // for (let points = 0; points < splinePath.points.length; points++) {
      //   graphics.fillCircle(splinePath.points[points].x, splinePath.points[points].y, 4)
      // }
      actor.setPosition(roadMap[from].x, roadMap[from].y).setPath(<any>splinePath)
      await actor.startFollow({
        duration: path.length * 150,
        rotateToPath: true,
      })
      this.time.delayedCall(
        path.length * 150 + 500,
        () => {
          glowTween.play()
          currentPosition = to
          const placeType = roadMap[to].properties.type
          if (placeType === 'normal') {
            textAdjustPointsEffect(textAdjustPoints, `+${roadMap[to].properties.number * currentPoints - currentPoints}`, placeType)
            currentPoints *= roadMap[to].properties.number
            delayedCallSpinDice(true, pattern[3 - currentLife])
          } else if (placeType === 'free') {
            textAdjustPointsEffect(textAdjustPoints, `free!`, placeType)
            currentLife++
            this.tweens.add({
              targets: skullLifes[currentLife - 1],
              alpha: 1,
              duration: 300,
              onComplete: () => {
                delayedCallSpinDice(true, pattern[4 - currentLife])
              },
            })
          } else if (placeType === 'portal') {
            warping(actor, to, roadMap[to].properties.number, actorGlow)
          } else if (placeType === 'drop') {
            textAdjustPointsEffect(textAdjustPoints, `-${currentPoints - currentPoints / roadMap[to].properties.number}`, placeType)
            currentPoints /= roadMap[to].properties.number
            delayedCallSpinDice(true, pattern[3 - currentLife])
          } else if (placeType === 'dropAll') {
            textAdjustPointsEffect(textAdjustPoints, `-${currentPoints}`, placeType)
            currentPoints = 0
            delayedCallSpinDice(true, pattern[3 - currentLife])
          } else {
            delayedCallSpinDice(true, pattern[3 - currentLife])
          }
          textCurrentPoints.setText(`${currentPoints}`)
        },
        [],
        this
      )
      this.tweens.add({
        targets: skullLifes[currentLife - 1],
        alpha: 0,
        duration: 300,
      })
      currentLife--
      console.log(`moving done ${currentPosition}`)
    }

    if (chooseMoney > 0) {
      spinTheDice(true, pattern[3 - currentLife])
    }
  }
  // update(time, delta) {
  update() {
    if (shipFollow && shipGlow && spinDiceContainer && uiContainer) {
      shipGlow.setPosition(shipFollow.x, shipFollow.y).setRotation(shipFollow.rotation)
      if (shipFollow.y < 360) {
        this.cameras.main.centerOn(1280 / 2, 360)
        spinDiceContainer.setPosition(1280 / 2, 360)
        uiContainer.setPosition(0, 360 - 720 / 2)
        gameOverContainer?.setPosition(0, 360 - 720 / 2)
      } else if (shipFollow.y > 940) {
        this.cameras.main.centerOn(1280 / 2, 940)
        spinDiceContainer.setPosition(1280 / 2, 940)
        uiContainer.setPosition(0, 940 - 720 / 2)
        gameOverContainer?.setPosition(0, 940 - 720 / 2)
      } else {
        this.cameras.main.centerOn(1280 / 2, shipFollow.y)
        spinDiceContainer.setPosition(1280 / 2, shipFollow.y)
        uiContainer.setPosition(0, shipFollow.y - 720 / 2)
        gameOverContainer?.setPosition(0, shipFollow.y - 720 / 2)
      }
    }
  }
}
