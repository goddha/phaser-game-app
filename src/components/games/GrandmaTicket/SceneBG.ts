import Phaser from 'phaser'
import LoadingScreen from '../GlobalComponents/LoadingScreen'

const assetImage = [
  { key: 'bgBet' },
  { key: 'bgDialogue' },
  { key: 'bgHowto' },
  { key: 'bgBoot' },
  { key: 'bgMoney' },
  { key: 'bgPlay' },
  { key: 'btnAudioOff' },
  { key: 'btnAudioOn' },
  { key: 'btnBrown' },
  { key: 'btnBrownDown' },
  { key: 'btnBrownHover' },
  { key: 'btnCancel' },
  { key: 'btnCancelDown' },
  { key: 'btnCancelHover' },
  { key: 'btnGreen' },
  { key: 'btnGreenDown' },
  { key: 'btnGreenHover' },
  { key: 'btnPlay' },
  { key: 'btnPlayDown' },
  { key: 'btnPlayHover' },
  { key: 'btnYellow' },
  { key: 'btnYellowDown' },
  { key: 'btnYellowHover' },
  { key: 'grandma' },
  { key: 'logo' },
  { key: 'resultLoose' },
  { key: 'resultWin' },
  { key: 'reward' },
  { key: 'ticketCover' },
  { key: 'ticketNoPrize' },
  { key: 'x2' },
  { key: 'x2Howto' },
  { key: 'x3' },
  { key: 'x3Howto' },
  { key: 'x4' },
  { key: 'x5' },
]
const assetAudio = [
  { key: 'bgm' },
  { key: 'blockLose' },
  { key: 'winNormal' },
  { key: 'winBig' },
  { key: 'clicking' },
  { key: 'lose' },
  { key: 'blockWinNormal' },
  { key: 'blockWinBig' },
]
export class SceneBG extends Phaser.Scene {
  constructor() {
    super({ key: 'bgScene', active: true, pack: { files: [{ type: 'image', key: 'duckbetLogoWhite', url: '../global/duckbetLogoWhite.png' }] } })
  }
  async preload() {
    LoadingScreen(this)
    this.load.atlas('grandmaEye', 'grandmaEye.png', `grandmaEye.json`)
    for (let i = 1; i < 10; i++) {
      this.load.image(`ticket${i}`, `ticket${i}.png`)
    }
    assetImage.map((name) => {
      this.load.image(`${name.key}`, `${name.key}.png`)
    })
    assetAudio.map((name) => {
      this.load.audio(`${name.key}`, [`audio/${name.key}.m4a`, `audio/${name.key}.ogg`, `audio/${name.key}.mp3`])
    })
  }

  create() {
    this.add.image(1280 / 2, 720 / 2, 'bgPlay')
    this.scene.start('bootScene')
  }
}
