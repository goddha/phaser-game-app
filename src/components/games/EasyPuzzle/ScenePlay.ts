import Phaser from 'phaser'
import ButtonText from '../GlobalComponents/ButtonText'
import imageList from './utils/imageList'
import getRandomArbitrary from '../GlobalComponents/GetRandomNumber'

let chooseMoney: number
let type: { piece: number; odds: number; color: string }
let winAmount: string
const betCurrency = 'THB'
let imageName: string
let TEMPISWINNIG: boolean
// const getRandomArbitrary = (min: number, max: number) => {
//   return Math.round(Math.random() * (max - min) + min)
// }
const getKeyByValue = (object: any, value: any) => {
  const key = Object.keys(object).find((key) => object[key].key === value) || '0'
  return parseInt(key)
}
const randomImg = (scene: Phaser.Scene, gameType: number) => {
  const imagelistkey = getKeyByValue(imageList, gameType)
  const randomImgKey = getRandomArbitrary(0, imageList[imagelistkey].list.length - 1)
  const img = imageList[imagelistkey].list[randomImgKey]
  for (let i = 0; i < gameType; i++) {
    scene.load.image(`${img}${gameType}${i}`, `image/${gameType}/${img}${gameType}${i}.png`)
  }
  return img
}
const styleTextMain = {
  color: '#ffffff',
  font: 'bold 40px Kanit',
  padding: {
    top: 3,
  },
  align: 'center',
}
const styleTextMainBlack = {
  ...styleTextMain,
  color: '#000000',
}
const checkSort = (array: any[]) => {
  let sorted = true
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      sorted = false
      break
    }
  }
  return sorted
}
const shufflePosition = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
const simulatedPositionResult = (willwin: boolean, count: number) => {
  console.log({ willwin })
  const positionArray = []
  for (let i = 0; i < count; i++) {
    positionArray.push(i)
  }
  if (!willwin) {
    let sorted = true
    while (sorted) {
      shufflePosition(positionArray)
      sorted = checkSort(positionArray)
    }
  }
  return positionArray
}
// let textLoading
export class ScenePlay extends Phaser.Scene {
  constructor() {
    super('playScene')
  }
  init(data: any) {
    TEMPISWINNIG = data.TEMPISWINNIG || Math.random() < 0.5
    chooseMoney = data.chooseMoney || 0
    type = data.type || { piece: 3, odds: 2, color: '1FC265' }
  }
  preload() {
    this.add.image(1280 / 2, 720 / 2, 'bg')
    this.add.image(950, 320, `bgPlay${type.piece}`)
    this.add.image(340, 60, 'bgMoney')
    this.add.text(195, 60, `ยอดเดิมพัน`, styleTextMainBlack).setOrigin(0.5)
    this.add.image(1103, 675, 'btnGreenConfirm').setTint(0x727272)
    new ButtonText(this, 1103, 675, 'btnGreenConfirm', 'ยืนยัน', styleTextMain, 3, 1125, 670).setVisible(false)
    new ButtonText(this, 797, 675, 'btnRedX', 'เริ่มใหม่', styleTextMain, 3, 835, 670)
    const blackFade = this.add.rectangle(1280 / 2, 720 / 2, 1280, 720, 0x000000, 0.3)
    if (chooseMoney > 0) {
      imageName = randomImg(this, type.piece)
      this.add
        .text(1280 / 2, 720 / 2, 'loading...', { ...styleTextMain, font: '40px Kanit' })
        .setOrigin(0.5)
        .setShadow(2, 2, '#000000', 0x000000, true, true)
      this.tweens.add({
        targets: blackFade,
        alpha: 0,
        duration: 100,
      })
      // LoadingScreen(this)
    }
  }
  create() {
    if (chooseMoney <= 0) return null
    const areaType = [
      {
        key: 3,
        randomPlace: { minX: 300, maxX: 350, minY: 200, maxY: 600 },
        position: [
          { key: 0, x: 949, y: 125, isplaced: false },
          { key: 1, x: 949, y: 317, isplaced: false },
          { key: 2, x: 949, y: 509, isplaced: false },
        ],
      },
      {
        key: 4,
        randomPlace: { minX: 160, maxX: 450, minY: 200, maxY: 550 },
        position: [
          { key: 0, x: 806, y: 173, isplaced: false },
          { key: 1, x: 1093, y: 173, isplaced: false },
          { key: 2, x: 806, y: 462, isplaced: false },
          { key: 3, x: 1093, y: 462, isplaced: false },
        ],
      },
      {
        key: 6,
        randomPlace: { minX: 110, maxX: 500, minY: 200, maxY: 540 },
        position: [
          { key: 0, x: 758, y: 173, isplaced: false },
          { key: 1, x: 950, y: 173, isplaced: false },
          { key: 2, x: 1142, y: 173, isplaced: false },
          { key: 3, x: 758, y: 460, isplaced: false },
          { key: 4, x: 950, y: 460, isplaced: false },
          { key: 5, x: 1142, y: 460, isplaced: false },
        ],
      },
    ]
    const areaTypeKey = getKeyByValue(areaType, type.piece)
    const imagePosition = simulatedPositionResult(TEMPISWINNIG, type.piece)
    this.add.image(1280 / 2, 720 / 2, 'bg')
    const bgMoney = this.add.image(340, 60, 'bgMoney')
    const moneyText = this.add.text(195, 60, `ยอดเดิมพัน`, styleTextMainBlack).setOrigin(0.5)
    const moneyAmountText = this.add.text(400, 60, `${chooseMoney}`, styleTextMain).setOrigin(0.5)
    const btnInfo = this.add
      .image(515, 60, 'btnInfo')
      .setInteractive({ cursor: 'pointer' })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.sound.play('click', { volume: +btnAudio.data.list.enable * 0.5 })
        // this.scene.pause()
        this.scene.launch('howtoScene')
      })
    const btnAudio = this.add
      .image(575, 60, `${!!(<any>this.sound.get('bgm')).config.volume ? 'btnAudio' : 'btnAudioMute'}`)
      // .image(575, 60, `btnAudio`)
      .setInteractive({ cursor: 'pointer' })
      .setData({ enable: !!(<any>this.sound.get('bgm')).config.volume })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        btnAudio.data.list.enable = !btnAudio.data.list.enable
        ;(<any>this.sound.get('bgm')).setVolume(+btnAudio.data.list.enable * 0.5 || 0)
        btnAudio.setTexture(`${btnAudio.data.list.enable ? 'btnAudio' : 'btnAudioMute'}`)
      })
    this.add.container(0, 0, [bgMoney, moneyText, moneyAmountText, btnInfo, btnAudio]).setDepth(200)
    this.add.image(1103, 675, 'btnGreenConfirm').setTint(0x727272)
    const BtnRealConfirm = new ButtonText(this, 1103, 675, 'btnGreenConfirm', 'ยืนยัน', styleTextMain, 3, 1125, 670)
      .on('pointerup', () => {
        this.sound.play('click', { volume: +btnAudio.data.list.enable * 0.5 })
        areaType[areaTypeKey].position.map((position, index) => {
          this.add.image(position.x, position.y, `${imageName}${type.piece}${imagePosition[index]}`).setDepth(200)
        })
        winAmount = TEMPISWINNIG ? `+ ${chooseMoney * type.odds} ${betCurrency}` : `- ${chooseMoney} ${betCurrency}`
        showResult(TEMPISWINNIG, winAmount, type.piece)
      })
      .setVisible(false)
    // const fakeBtn = new ButtonText(this, 1103, 675, 'btnGreenConfirm', 'ยืนยันยัง', styleTextMain, 3, 1125, 670)
    new ButtonText(this, 797, 675, 'btnRedX', 'เริ่มใหม่', styleTextMain, 3, 835, 670).on('pointerup', () => {
      this.sound.play('click', { volume: +btnAudio.data.list.enable * 0.5 })
      BtnRealConfirm.setVisible(false)
      pieces.map((piece, index) => {
        const pieceXY = {
          x: getRandomArbitrary(areaType[areaTypeKey].randomPlace.minX, areaType[areaTypeKey].randomPlace.maxX),
          y: getRandomArbitrary(areaType[areaTypeKey].randomPlace.minY, areaType[areaTypeKey].randomPlace.maxY),
        }
        const pieceAngle = getRandomArbitrary(-30, 30)
        const pieceDepth = getRandomArbitrary(90, 98)
        piecesShadow[index]
          .setPosition(pieceXY.x + 2, pieceXY.y + 3)
          .setAngle(pieceAngle)
          .setDepth(pieceDepth)
          .setVisible(true)
        piece.setPosition(pieceXY.x, pieceXY.y).setAngle(pieceAngle).setDepth(pieceDepth)
        areaType[areaTypeKey].position[index].isplaced = false
        piece.data.list.position = -1
      })
    })
    this.input.dragDistanceThreshold = 10
    this.add.image(950, 320, `bgPlay${type.piece}`)
    areaType[areaTypeKey].position.map((position, index) => {
      this.add.image(position.x, position.y, `${imageName}${type.piece}${index}`).setAlpha(0.2)
    })
    let pieces: Phaser.GameObjects.Image[] = []
    let piecesShadow: Phaser.GameObjects.Image[] = []
    for (let index = 0; index < type.piece; index++) {
      const pieceXY = {
        x: getRandomArbitrary(areaType[areaTypeKey].randomPlace.minX, areaType[areaTypeKey].randomPlace.maxX),
        y: getRandomArbitrary(areaType[areaTypeKey].randomPlace.minY, areaType[areaTypeKey].randomPlace.maxY),
      }
      const pieceDepth = getRandomArbitrary(90, 98)
      const pieceAngle = getRandomArbitrary(-30, 30)
      const pieceShadow = this.add
        .image(pieceXY.x + 2, pieceXY.y + 3, `shadow1in${type.piece}`)
        .setDepth(pieceDepth)
        .setAngle(pieceAngle)
      const piece = this.add
        .image(pieceXY.x, pieceXY.y, `cover1in${type.piece}`)
        .setInteractive({ cursor: 'pointer', draggable: true })
        .setDepth(pieceDepth)
        .setAngle(pieceAngle)
        .setData({ position: -1, x: pieceXY.x, y: pieceXY.y })
      piece.on('drag', (pointer: Phaser.Input.Pointer) => {
        if (piece.data.list.position >= 0) {
          areaType[areaTypeKey].position[piece.data.list.position].isplaced = false
          piece.data.list.position = -1
        }
        piece.setPosition(pointer.x, pointer.y)
        pieceShadow.setVisible(false).setDepth(999).setAngle(0)
        piece.setDepth(999).setAngle(0)
      })
      piece.on('dragend', () => {
        let isPlace = false
        pieceShadow.setDepth(99)
        piece.setDepth(99)
        areaType[areaTypeKey].position.map((pose) => {
          if (Math.abs(piece.x - pose.x) < 100 && Math.abs(piece.y - pose.y) < 100) {
            if (areaType[areaTypeKey].position[pose.key].isplaced) {
              piece.data.list.position = -1
              isPlace = false
              piece.setTint(0xf22b00)
              // #f22b00
              setTimeout(() => {
                piece.clearTint()
              }, 300)
              return
            }
            piece.x = pose.x
            piece.y = pose.y
            pieceShadow.setVisible(false)
            piece.data.list.position = pose.key
            areaType[areaTypeKey].position[pose.key].isplaced = true
            isPlace = true
          }
        })
        if (!isPlace) {
          piece.setAngle(pieceAngle)
          pieceShadow.setAngle(pieceAngle)
          pieceShadow.setVisible(true)
          piece.setPosition(pieceXY.x, pieceXY.y)
          pieceShadow.setPosition(pieceXY.x + 2, pieceXY.y + 3)
        }
        const isNotFinished = areaType[areaTypeKey].position.some((element) => !element.isplaced)
        console.log({ isNotFinished })
        BtnRealConfirm.setVisible(!isNotFinished)
      })
      pieces.push(piece)
      piecesShadow.push(pieceShadow)
    }
    const showResult = (winnig: boolean, winAmount: string, gameType: number) => {
      const result = winnig
        ? { resultImg: `resultWin`, resultText: 'ยินดีด้วย', color: '#16ba00' }
        : { resultImg: `resultLose`, resultText: 'เสียใจด้วย', color: '#ff0000' }
      const fakeBg = this.add.rectangle(1280 / 2, 720 / 2, 1280, 720, 0x000000, 0.5).setInteractive()
      const resultImg = this.add.image(1280 / 2, 720 / 2, `${result.resultImg}`)
      const resultText = this.add.text(660, 340, `${result.resultText}`, styleTextMainBlack).setOrigin(0.5)
      const resultAmount = this.add.text(660, 410, `${winAmount}`, { ...styleTextMainBlack, color: result.color }).setOrigin(0.5)
      const resultContainer = this.add.container(0, 0, [fakeBg, resultImg, resultText, resultAmount]).setAlpha(0.01).setDepth(300)
      const btnNew = this.add
        .image(660, 500, 'btnGreenSmallWhiteEdge')
        .on(Phaser.Input.Events.POINTER_OUT, () => {
          btnNew.setTexture('btnGreenSmallWhiteEdge')
        })
        .on(Phaser.Input.Events.POINTER_DOWN, () => {
          this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 })
          btnNew.setTexture('btnGreenSmallWhiteEdgeDown')
        })
        .on(Phaser.Input.Events.POINTER_UP_OUTSIDE, () => {
          btnNew.setTexture('btnGreenSmallWhiteEdge')
        })
        .on(Phaser.Input.Events.POINTER_UP, () => {
          resultContainer.setVisible(false)
          this.scene.launch('betScene')
        })
      const textbtnNew = this.add.text(660, 500, 'เล่นใหม่', { ...styleTextMain, font: 'bold 35px Kanit' }).setOrigin(0.5)
      resultContainer.add(btnNew).add(textbtnNew)
      this.sound.play(winnig ? `win${gameType}` : 'lose', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 || 0, delay: 1 })
      this.add.tween({
        targets: resultContainer,
        alpha: 1,
        delay: 500,
        completeDelay: 1000,
        onComplete: () => {
          btnNew.setInteractive({ cursor: 'pointer' })
        },
      })
    }
  }
}
