import Phaser from 'phaser'
import AudioList from './utils/audioList'
import LoadingScreen from '../GlobalComponents/LoadingScreen'

export class SceneBG extends Phaser.Scene {
  constructor() {
    super({ key: 'bgScene', active: true, pack: { files: [{ type: 'image', key: 'duckbetLogoWhite', url: '../global/duckbetLogoWhite.png' }] } })
  }
  async preload() {
    LoadingScreen(this)
    console.log('bgScene')
    this.load.image('3', '3.png')
    this.load.image('bg', 'bg.png')
    this.load.image('bgBoot', 'bgBoot.png')
    this.load.image('bgChoose', 'bgChoose.png')
    this.load.image('bgHowTo', 'bgHowTo.png')
    this.load.image('bgMoney', 'bgMoney.png')
    this.load.image('bgReward', 'bgReward.png')
    this.load.image('brush', 'brush.png')
    this.load.image('btnBlueEdge', 'btnBlueEdge.png')
    this.load.image('btnBlueEdgeDown', 'btnBlueEdgeDown.png')
    this.load.image('btnBlueEdgeHover', 'btnBlueEdgeHover.png')
    this.load.image('btnBlueEdgeDisabled', 'btnBlueEdgeDisabled.png')
    this.load.image('btnExitEdge', 'btnExitEdge.png')
    this.load.image('btnExitRed', 'btnExitRed.png')
    this.load.image('btnExitRedDown', 'btnExitRedDown.png')
    this.load.image('btnExitRound', 'btnExitRound.png')
    this.load.image('btnGreenCornerRound', 'btnGreenCornerRound.png')
    this.load.image('btnGreenCornerRoundDown', 'btnGreenCornerRoundDown.png')
    this.load.image('btnGreenCornerRoundHover', 'btnGreenCornerRoundHover.png')
    this.load.image('btnGreenEdge', 'btnGreenEdge.png')
    this.load.image('btnGreenEdgeDown', 'btnGreenEdgeDown.png')
    this.load.image('btnGreenEdgeHover', 'btnGreenEdgeHover.png')
    this.load.image('btnGreenRound', 'btnGreenRound.png')
    this.load.image('btnGreenRoundDisabled', 'btnGreenRoundDisabled.png')
    this.load.image('btnGreenRoundDown', 'btnGreenRoundDown.png')
    this.load.image('btnGreenRoundHover', 'btnGreenRoundHover.png')
    this.load.image('btnOrangeEdge', 'btnOrangeEdge.png')
    this.load.image('btnOrangeEdgeDown', 'btnOrangeEdgeDown.png')
    this.load.image('btnOrangeEdgeHover', 'btnOrangeEdgeHover.png')
    this.load.image('btnWhiteEdge', 'btnWhiteEdge.png')
    this.load.image('btnWhiteEdgeDown', 'btnWhiteEdgeDown.png')
    this.load.image('btnWhiteEdgeHover', 'btnWhiteEdgeHover.png')
    this.load.image('logo', 'logo.png')
    this.load.image('logoBoot', 'logoBoot.png')
    this.load.image('resultLoose', 'resultLoose.png')
    this.load.image('resultWin', 'resultWin.png')
    this.load.image('resultFreeplay', 'resultFreeplay.png')
    this.load.image('resultFreeplayEffect', 'resultFreeplayEffect.png')
    this.load.image('resultx1', 'resultx1.png')
    this.load.image('resultx2', 'resultx2.png')
    this.load.image('resultx3', 'resultx3.png')
    this.load.image('resultx4', 'resultx4.png')
    this.load.image('resultx5', 'resultx5.png')
    this.load.image('reward', 'reward.png')
    this.load.image('ticketAfter', 'ticketAfter.png')
    this.load.image('ticketBefore', 'ticketBefore.png')
    this.load.image('ticketBox', 'ticketBox.png')
    this.textures.createCanvas('ticketScratchCanvas', 651, 651)
    for (let i = 0; i <= 8; i++) {
      this.textures.createCanvas(`ticketScratchCanvas${i}`, 135, 135)
    }
    AudioList.map((audio) => {
      this.load.audio(audio, [`audio/${audio}.m4a`, `audio/${audio}.ogg`, `audio/${audio}.mp3`])
    })
  }

  create() {
    this.add.image(1280 / 2, 720 / 2, 'bg')
    this.scene.start('bootScene')
  }
}
