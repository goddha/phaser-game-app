import Phaser from 'phaser'
import audioList from './utils/audioList'
import LoadingScreen from '../GlobalComponents/LoadingScreen'

const assetImage = [
  { key: '3Piece' },
  { key: '4Piece' },
  { key: '6Piece' },
  { key: 'bg' },
  { key: 'bgBet' },
  { key: 'bgHowto' },
  { key: 'bgMoney' },
  { key: 'bgPlay3' },
  { key: 'bgPlay4' },
  { key: 'bgPlay6' },
  { key: 'bgStart' },
  { key: 'btnAudio' },
  { key: 'btnAudioMute' },
  { key: 'btnBlueGreen' },
  { key: 'btnBlueGreenDown' },
  { key: 'btnBlueGreenHover' },
  { key: 'btnGreenConfirm' },
  { key: 'btnGreenConfirmDown' },
  { key: 'btnGreenConfirmHover' },
  { key: 'btnGreenSmallWhiteEdge' },
  { key: 'btnGreenSmallWhiteEdgeDown' },
  { key: 'btnInfo' },
  { key: 'btnRed' },
  { key: 'btnRedDown' },
  { key: 'btnRedHover' },
  { key: 'btnRedX' },
  { key: 'btnRedXDown' },
  { key: 'btnRedXHover' },
  { key: 'btnSquareX' },
  { key: 'btnSquareGreen' },
  { key: 'btnSquareGreenDown' },
  { key: 'btnSquareRed' },
  { key: 'btnSquareRedDown' },
  { key: 'btnX' },
  { key: 'btnXHover' },
  { key: 'cover1in3' },
  { key: 'cover1in4' },
  { key: 'cover1in6' },
  { key: 'resultLose' },
  { key: 'resultWin' },
  { key: 'shadow1in3' },
  { key: 'shadow1in4' },
  { key: 'shadow1in6' },
]
// const audioList = ['click', 'bgm', 'win3', 'win4', 'win6']
export class SceneBG extends Phaser.Scene {
  constructor() {
    super({ key: 'bgScene', active: true, pack: { files: [{ type: 'image', key: 'duckbetLogoWhite', url: '../global/duckbetLogoWhite.png' }] } })
  }
  async preload() {
    LoadingScreen(this)
    audioList.map((audio) => {
      this.load.audio(audio, [`audio/${audio}.m4a`, `audio/${audio}.ogg`, `audio/${audio}.mp3`])
    })
    assetImage.map((name) => {
      this.load.image(`${name.key}`, `${name.key}.png`)
    })
  }

  create() {
    this.add.image(1280 / 2, 720 / 2, 'bg')
    this.scene.start('bootScene')
  }
}
