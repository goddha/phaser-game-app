import Phaser from 'phaser'
import audioList from './utils/audioList'
import LoadingScreen from '../GlobalComponents/LoadingScreen'

const assetImage = [
  { key: 'btnAudioOn' },
  { key: 'btnAudioOff' },
  { key: 'bgBet' },
  { key: 'bgCover' },
  { key: 'bgLife' },
  { key: 'bgMap' },
  { key: 'bgMoney' },
  { key: 'bgPaper' },
  { key: 'button' },
  { key: 'buttonDown' },
  { key: 'buttonHover' },
  { key: 'btnHowto' },
  { key: 'buttonOrange' },
  { key: 'buttonOrangeDown' },
  { key: 'buttonWood' },
  { key: 'buttonWoodDown' },
  { key: 'buttonX' },
  { key: 'buttonXDown' },
  { key: 'cloud' },
  { key: 'compassArrow' },
  { key: 'compassBody' },
  { key: 'free' },
  { key: 'logo' },
  { key: 'resultLose' },
  { key: 'resultLoseEffect' },
  { key: 'resultWin' },
  { key: 'resultWinEffect' },
  { key: 'ship' },
  { key: 'shipGlow' },
  { key: 'skullDeath' },
  { key: 'skullLife' },
  { key: 'x' },
]
export class SceneBG extends Phaser.Scene {
  constructor() {
    super({ key: 'bgScene', active: true, pack: { files: [{ type: 'image', key: 'duckbetLogoWhite', url: '../global/duckbetLogoWhite.png' }] } })
  }
  async preload() {
    LoadingScreen(this)
    this.load.atlas('portal', 'portal.png', `portal.json`)
    audioList.map((audio) => {
      this.load.audio(audio, [`audio/${audio}.m4a`, `audio/${audio}.ogg`, `audio/${audio}.mp3`])
    })
    assetImage.map((name) => {
      this.load.image(`${name.key}`, `${name.key}.png`)
    })
  }

  create() {
    this.add.image(1280 / 2, 720 / 2, 'bgMap')
    this.scene.start('bootScene')
  }
}
