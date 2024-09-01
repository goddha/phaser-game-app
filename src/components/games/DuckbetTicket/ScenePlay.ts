import Phaser from 'phaser'
import BtnGreenRound from './utils/BtnGreenRound'
// import BtnGreenEdge from './utils/BtnGreenEdge'
import BtnOrangeEdge from './utils/BtnOrangeEdge'
import BtnBlueEdge from './utils/BtnBlueEdge'

let betAmount: number
const betCurrency = 'THB'
let result: { odds: number; position: number; showing: boolean }[]

const simulatedResult = () => {
  const resultTEMP = []
  const getRandomArbitrary = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min)
  }
  const findOddsCounter = (nameKey: number, oddsArray: { odds: number; counter: number }[]) => {
    let index: number | boolean = false
    for (let i = 0; i < oddsArray.length; i++) {
      if (oddsArray[i].odds === nameKey) {
        // oddsArray[i].counter = 3
        index = i
      }
    }
    return index
  }
  let oddsCounter = [
    { odds: 1, counter: 2 },
    { odds: 2, counter: 2 },
    { odds: 3, counter: 2 },
    { odds: 4, counter: 2 },
    { odds: 5, counter: 2 },
  ]
  const isWinning = !!Math.round(Math.random())
  if (isWinning) {
    const index = findOddsCounter(getRandomArbitrary(1, 5), oddsCounter)
    if (index) oddsCounter[index].counter = 3
  }
  for (let i = 0; i < 9; i++ /* ticket position */) {
    const oddsIndex = getRandomArbitrary(0, oddsCounter.length - 1)
    if (oddsIndex >= 0) {
      resultTEMP.push({ odds: oddsCounter[oddsIndex].odds, position: i, showing: false })
      oddsCounter[oddsIndex].counter--
      if (oddsCounter[oddsIndex].counter === 0) {
        oddsCounter.splice(oddsIndex, 1)
      }
    } else {
      console.error('FUCK')
    }
  }
  return resultTEMP
  // return [
  //   { odds: 5, position: 0, showing: false },
  //   { odds: 2, position: 1, showing: false },
  //   { odds: 1, position: 2, showing: false },
  //   { odds: 5, position: 3, showing: false },
  //   { odds: 3, position: 4, showing: false },
  //   { odds: 4, position: 5, showing: false },
  //   { odds: 2, position: 6, showing: false },
  //   { odds: 1, position: 7, showing: false },
  //   { odds: 1, position: 8, showing: false },
  // ]
}
const styleBtnText = {
  font: 'bold 45px Kanit',
  fill: '#ffffff',
  padding: {
    top: 3,
  },
  align: 'center',
}
const styleText = {
  ...styleBtnText,
  ...{ font: 'bold 30px Kanit', wordWrap: { width: 200 } },
}
export class ScenePlay extends Phaser.Scene {
  constructor() {
    super('playScene')
  }
  init(data: any) {
    betAmount = data.chooseMoney
  }
  preload() {
    console.log('playScene')
  }
  create() {
    result = simulatedResult()
    // result =  {
    //    [
    //     { odds: 5, position: 0, showing: false },
    //     { odds: 3, position: 1, showing: false },
    //     { odds: 2, position: 2, showing: false },
    //     { odds: 5, position: 3, showing: false },
    //     { odds: 3, position: 4, showing: false },
    //     { odds: 2, position: 5, showing: false },
    //     { odds: 1, position: 6, showing: false },
    //     { odds: 1, position: 7, showing: false },
    //     { odds: 1, position: 8, showing: false },
    //   ]
    // }
    let settle = false
    this.add.image(1280 / 2, 720 / 2, 'bg')
    this.add.image(140, 20, 'logo').setOrigin(0.5, 0)
    this.add.text(140, 220, 'ยอดเงินเดิมพัน', styleText).setOrigin(0.5)
    this.add.image(140, 280, 'bgMoney')
    this.add.text(140, 280, `${betAmount || 0} ${betCurrency}`, styleText).setOrigin(0.5)
    this.add.image(140, 450, 'bgReward')
    this.add.text(140, 365, 'รางวัล', styleText).setOrigin(0.5)
    this.add.image(140, 460, 'reward')
    const ticketArea = this.add.image(1280 / 2, 720 / 2, 'ticketAfter').setInteractive()
    const brush = this.textures.get('brush').getSourceImage() as HTMLImageElement
    let canvasPiece: Phaser.Textures.CanvasTexture[] = []

    for (let i = 0; i <= 8; i++) {
      const ticketPiece = this.textures.get(`resultx${result[i].odds}`).getSourceImage() as HTMLCanvasElement
      canvasPiece.push(this.textures.get(`ticketScratchCanvas${i}`) as Phaser.Textures.CanvasTexture)
      canvasPiece[i].getContext().globalCompositeOperation = 'source-over'
      canvasPiece[i].clear()
      canvasPiece[i].draw(0, 0, ticketPiece)
      const ticketPosition = i <= 2 ? { x: 430 + i * 210, y: 145 } : i > 2 && i < 6 ? { x: 430 + (i - 3) * 210, y: 355 } : { x: 430 + (i - 6) * 210, y: 555 }
      this.add.image(ticketPosition.x, ticketPosition.y, `resultx${result[i].odds}`)
      const ticketScratchCanvas = this.add.image(ticketPosition.x, ticketPosition.y, `ticketScratchCanvas${i}`).setOrigin(0.5)
      ticketArea
        .on('pointermove', (pointer: any) => {
          if (pointer.isDown) {
            erase(
              canvasPiece[i],
              brush,
              pointer.x - ticketScratchCanvas.x + ticketScratchCanvas.width * 0.5 - brushHalfWidth,
              pointer.y - ticketScratchCanvas.y + ticketScratchCanvas.height * 0.5 - brushHalfHeight
            )
          }
        })
        .on('pointerdown', (pointer: any) => {
          erase(
            canvasPiece[i],
            brush,
            pointer.x - ticketScratchCanvas.x + ticketScratchCanvas.width * 0.5 - brushHalfWidth,
            pointer.y - ticketScratchCanvas.y + ticketScratchCanvas.height * 0.5 - brushHalfHeight
          )
        })
    }
    const brushHalfWidth = this.textures.get('brush').get().halfWidth
    const brushHalfHeight = this.textures.get('brush').get().halfHeight
    const btnShow = new BtnGreenRound(this, 1120, 630)
      // .setData({isOpen : false})
      .on('pointerdown', () => {
        this.sound.play('clicking', { volume: 0.5 })
        showTicketResult(canvasPiece)
      })
    const textbtnShow = this.add.text(1120, 620, 'เปิด', styleBtnText).setOrigin(0.5)
    this.add.text(1120, 50, `ครบ`, styleBtnText).setOrigin(0.5)
    this.add.image(1120, 145, '3')
    this.add.text(1120, 235, `รับรางวัล`, styleBtnText).setOrigin(0.5)
    this.add.image(1120, 400, 'ticketBox')
    const btnNewTicket = new BtnBlueEdge(this, 1120, 450).on('pointerdown', () => {
      this.sound.play('clicking', { volume: 0.5 })
      this.input.setDefaultCursor('auto')
      this.scene.launch('betScene').bringToTop('betScene')
    })
    const btnNewTicketDisabled = this.add.image(1120, 450, 'btnBlueEdgeDisabled').setInteractive()
    const textNewTicket = this.add.text(1120, 450, 'ซื้อ', styleBtnText).setOrigin(0.5)
    const btnShowHowto = new BtnOrangeEdge(this, 140, 630).on('pointerdown', () => {
      this.sound.play('clicking', { volume: 0.5 })
      this.input.setDefaultCursor('auto')
      this.scene.launch('howtoScene').bringToTop('howtoScene')
    })
    const textShowHowto = this.add.text(140, 630, 'วิธีเล่น', styleBtnText).setOrigin(0.5)
    const ticketBefore = this.textures.get(`ticketBefore`).getSourceImage() as HTMLCanvasElement
    const canvasfull = this.textures.get(`ticketScratchCanvas`) as Phaser.Textures.CanvasTexture
    canvasfull.getContext().globalCompositeOperation = 'source-over'
    canvasfull.clear()
    canvasfull.draw(0, 0, ticketBefore)
    const ticketScratchCanvasFull = this.add.image(1280 / 2, 720 / 2, `ticketScratchCanvas`).setOrigin(0.5)
    this.input
      .on('pointermove', (pointer: any) => {
        if (pointer.isDown) {
          erase(
            canvasfull,
            brush,
            pointer.x - ticketScratchCanvasFull.x + ticketScratchCanvasFull.width * 0.5 - brushHalfWidth,
            pointer.y - ticketScratchCanvasFull.y + ticketScratchCanvasFull.height * 0.5 - brushHalfHeight
          )
        }
      })
      .on('pointerdown', (pointer: any) => {
        erase(
          canvasfull,
          brush,
          pointer.x - ticketScratchCanvasFull.x + ticketScratchCanvasFull.width * 0.5 - brushHalfWidth,
          pointer.y - ticketScratchCanvasFull.y + ticketScratchCanvasFull.height * 0.5 - brushHalfHeight
        )
      })

    this.input.on('pointerup', () => {
      checkCanvasArray(canvasPiece)
    })
    this.input.on(Phaser.Input.Events.POINTER_UP_OUTSIDE, () => {
      checkCanvasArray(canvasPiece)
    })
    const checkCanvasArray = (canvasArray: Phaser.Textures.CanvasTexture[]) => {
      for (let i = 0; i < 9; i++) {
        let canvasPercent = []
        canvasPercent[i] = count(canvasArray[i])
        if ((100 * canvasPercent[i].filled) / canvasPercent[i].total < 30) {
          result[i].showing = true
        } else {
          result[i].showing = false
        }
      }
      const notAllShow = result.some((ele) => ele.showing === false)
      if (!notAllShow) {
        showTicketResult(canvasArray)
      }
    }
    const showTicketResult = (canvasArray: Phaser.Textures.CanvasTexture[]) => {
      canvasfull.getContext().globalCompositeOperation = 'destination-out'
      canvasfull.draw(0, 0, ticketBefore)
      for (let i = 0; i < 9; i++) {
        const ticketPiece = this.textures.get(`resultx${result[i].odds}`).getSourceImage() as HTMLCanvasElement
        canvasArray[i].getContext().globalCompositeOperation = 'destination-out'
        canvasArray[i].draw(0, 0, ticketPiece)
      }
      if (!settle) {
        this.add.image(1120, 630, 'btnGreenRound').setInteractive().setTint(0x909090)
        this.add.text(1120, 620, 'เปิด', styleBtnText).setOrigin(0.5).setTint(0x909090)
        btnNewTicketDisabled.destroy()
        settle = true
        calculateIsWin()
      }
    }
    const calculateIsWin = () => {
      /*  ****************************************
      win : winning = true / amount = odds*bet,
      winfreeplay : winnig = true / amount = 0,
      loose : winnig =false/amount = 0 
      ****************************************  */
      let counter: { [key: string]: number } = {}
      result.map(function (obj) {
        const key = JSON.stringify(obj.odds)
        counter[key] = (counter[key] || 0) + 1
      })
      const odds = Object.keys(counter).find((key) => counter[key] === 3)
      if (odds) {
        const multiply = parseInt(odds) === 1 ? 0 : parseInt(odds)
        showResult(true, multiply * betAmount, parseInt(odds))
      } else {
        showResult(false, betAmount, 0)
      }
    }
    const showResult = (winning: boolean, amount: number, odds: number) => {
      const bgFake = this.add.rectangle(1280 / 2, 720 / 2, 1280, 720, 0x000000, 0).setInteractive()
      const bg = this.add.rectangle(1280 / 2, 720 / 2, 1280, 720, 0x000000, 0.5).setInteractive()
      const resultAsset =
        winning && amount !== 0
          ? { imgName: 'resultWin', amountShow: '+ ' + amount, soundName: odds > 3 ? 'winBig' : 'winNormal' }
          : amount === 0
          ? { imgName: 'resultFreeplay', amountShow: '', soundName: 'winDuck' }
          : { imgName: 'resultLoose', amountShow: '- ' + amount, soundName: 'lose1' }
      // const imgName = winning && amount !== 0 ? 'resultWin' : amount === 0 ? 'resultFreeplay' : 'resultLoose'
      // const amountShow = winning && amount !== 0 ? '+ ' + amount : amount === 0 ? '' : '- ' + amount
      const resultImage = this.add.image(1280 / 2, 720 / 2, resultAsset.imgName)
      const resultAmountText = this.add.text(630, 460, resultAsset.amountShow, styleBtnText).setOrigin(0.5)
      const resultEffect = this.add.image(1280 / 2, 720 / 2, 'resultFreeplayEffect').setVisible(false)
      const showResultContainer = this.add.container(0, 0).add(bg).add(resultEffect).add(resultImage).add(resultAmountText).setAlpha(0)
      setTimeout(() => {
        this.sound.play(resultAsset.soundName, { volume: 0.5 })
        if (winning && amount === 0) {
          resultImage.setOrigin(0.5, 0.6)
          resultEffect.setVisible(true)
          this.tweens.add({
            targets: resultEffect,
            duration: 3000,
            angle: 180,
            repeat: -1,
          })
        }
        this.tweens.add({
          targets: showResultContainer,
          alpha: 1,
          duration: 500,
          onComplete: () => {
            setTimeout(() => {
              this.tweens.add({
                targets: showResultContainer,
                alpha: 0,
                duration: 500,
                onComplete: () => {
                  bgFake.destroy()
                  showResultContainer.destroy()
                  amount === 0 && this.scene.restart({ chooseMoney: betAmount })
                },
              })
            }, 2000)
          },
        })
      }, 800)
    }
    const erase = (canvasTexture: Phaser.Textures.CanvasTexture, source: HTMLImageElement, x: number, y: number) => {
      canvasTexture.getContext().globalCompositeOperation = 'destination-out'
      canvasTexture.draw(x, y, source)
    }
    const count = (canvasTexture: Phaser.Textures.CanvasTexture) => {
      let pixels = canvasTexture.getPixels()
      let filled = 0
      let total = 0
      for (let x = 0, c = pixels.length; x < c; x++) {
        let row = pixels[x]
        for (let y = 0, r = row.length; y < r; y++) {
          if (row[y].alpha) filled++
          total++
        }
      }
      return { filled: filled, empty: total - filled, total: total }
    }
    const changeTextY = (object: Phaser.GameObjects.Sprite, text: Phaser.GameObjects.Text) => {
      const defualtY = text.y
      object
        .on('pointerup', () => {
          text.setY(defualtY)
        })
        .on('pointerdown', () => {
          text.setY(text.y + 5)
        })
        .on('pointerout', () => {
          text.setY(defualtY)
        })
    }
    changeTextY(btnNewTicket, textNewTicket)
    changeTextY(btnShow, textbtnShow)
    changeTextY(btnShowHowto, textShowHowto)
  }

  update() {}
}
