import Phaser from 'phaser'
import LoadingScreen from '../GlobalComponents/LoadingScreen'
// import Button from './utils/Button'

export class SceneBG extends Phaser.Scene {
  constructor() {
    // super('bgScene')
    super({ key: 'bgScene', active: true, pack: { files: [{ type: 'image', key: 'duckbetLogoWhite', url: '../global/duckbetLogoWhite.png' }] } })
  }
  preload() {
    LoadingScreen(this)
    // this.load.bitmapFont('kanit', 'kanit_0.png', 'kanit.fnt')
    this.load.audio('bgm', 'audio/bgm.ogg')
    this.load.audio('hover', 'audio/hover.ogg')
    this.load.audio('lose', 'audio/lose.ogg')
    this.load.audio('reload', 'audio/reload.ogg')
    this.load.audio('shot1', 'audio/shot1.ogg')
    this.load.audio('shot2', 'audio/shot2.ogg')
    this.load.audio('win', 'audio/win.ogg')
    this.load.audio('winBig', 'audio/winBig.ogg')
    this.load.multiatlas('shootOut', 'shootout.json', '')
    this.load.multiatlas('countdown', 'countdown.json', '')
    this.load.image('barChoose', 'barChoose.png')
    this.load.image('betBg', 'betBg.png')
    this.load.image('betBgShadow', 'betBgShadow.png')
    this.load.image('bgRed', 'bgRed.png')
    this.load.image('bg', 'bg.png')
    this.load.image('bgBlur', 'bgBlur.png')
    this.load.image('btnAudio', 'btnAudio.png')
    this.load.image('btnGreen', 'btnGreen.png')
    this.load.image('btnInfo', 'btnInfo.png')
    this.load.image('btnMute', 'btnMute.png')
    this.load.image('btnOrange', 'btnOrange.png')
    this.load.image('btnOrangeDisable', 'btnOrangeDisable.png')
    this.load.image('btnPlay', 'btnPlay.png')
    this.load.image('btnPlayOver', 'btnPlayOver.png')
    this.load.image('btnQuitBlack', 'btnQuitBlack.png')
    this.load.image('btnQuitWhite', 'btnQuitWhite.png')
    this.load.image('btnRed', 'btnRed.png')
    this.load.image('btnRedDisable', 'btnRedDisable.png')
    this.load.image('btnStart', 'btnStart.png')
    this.load.image('btnStartDisable', 'btnStartDisable.png')
    this.load.image('effectBullet', 'effectBullet.png')
    this.load.image('effectGun', 'effectGun.png')
    this.load.image('extraBg', 'extraBg.png')
    this.load.image('extraChoiceBg', 'extraChoiceBg.png')
    this.load.image('extraTxtEng', 'extraTxtEng.png')
    this.load.image('extraTxtTha', 'extraTxtTha.png')
    this.load.image('logo', 'logo.png')
    this.load.image('mainActor', 'mainActor.png')
    this.load.image('paper', 'paper.png')
    this.load.image('resultLoose', 'resultLoose.png')
    this.load.image('resultWin', 'resultWin.png')
    this.load.image('enemy0', 'enemy0.png')
    this.load.image('portraitEnemy0', 'portraitEnemy0.png')
    this.load.image('posterShadow', 'posterShadow.png')
    for (let i = 0; i <= 3; i++) {
      this.load.image('shadowExtraResult' + i, 'shadowExtraResult' + i + '.png')
      this.load.image('shadowExtraShow' + i, 'shadowExtraShow' + i + '.png')
      this.load.image('shadowExtra' + i, 'shadowExtra' + i + '.png')
    }
    for (let i = 1; i <= 6; i++) {
      this.load.image('enemy' + i, 'enemy' + i + '.png')
      this.load.image('portraitEnemy' + i, 'portraitEnemy' + i + '.png')
      this.load.image('poster' + i, 'poster' + i + '.png')
    }
  }

  create() {
    this.sound.play('bgm', { loop: true, volume: 0.5 })
    this.scene.start('bootScene')
  }
}
