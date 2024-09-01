import Phaser from 'phaser'
import LoadingScreen from '../GlobalComponents/LoadingScreen'

const audioList = ['bgm', 'cheer', 'click', 'keep', 'kick', 'lose', 'net', 'whistle', 'win']
export class SceneBG extends Phaser.Scene {
  constructor() {
    super({ key: 'bgScene', active: true, pack: { files: [{ type: 'image', key: 'duckbetLogoWhite', url: '../global/duckbetLogoWhite.png' }] } })
    // super('bgScene')
  }
  preload() {
    LoadingScreen(this)
    audioList.map((name) => {
      this.load.audio(`${name}`, [`audio/${name}.m4a`, `audio/${name}.ogg`, `audio/${name}.mp3`])
    })
    this.load.multiatlas('motionPenalty', 'motionPenalty.json', '')
    this.load.image('logo', 'logo.png')
    this.load.image('logo_shadow', 'logo_shadow.png')
    this.load.image('bg_input', 'bg_input.png')
    this.load.image('bg_text', 'bg_text.png')
    this.load.image('button_round_red', 'button_round_red.png')
    this.load.image('button_round_blue', 'button_round_blue.png')
    this.load.image('button_round_green', 'button_round_green.png')
    this.load.image('startKeeper', 'start_keeper.png')
    this.load.image('startTaker', 'start_taker.png')
    this.load.image('bg', 'field.png')
    this.load.image('btnAudio', 'btnAudio.png')
    this.load.image('btnAudioMute', 'btnAudioMute.png')
    this.load.image('button_edge_grey', 'button_edge_grey.png')
    this.load.image('button_edge_green', 'button_edge_green.png')
    this.load.image('button_edge_green_disabled', 'button_edge_green_disabled.png')
    this.load.image('field', 'field.png')
    this.load.image('result_loose', 'result_loose.png')
    this.load.image('result_loose_effect', 'result_loose_effect.png')
    this.load.image('result_win', 'result_win.png')
    this.load.image('result_win_effect', 'result_win_effect.png')
    this.load.image('goal', 'goal.png')
    this.load.image('bullseye', 'bullseye.png')
    this.load.image('button_exit', 'button_exit.png')
    this.load.image('bullseye_grey', 'bullseye_grey.png')
    this.load.image('button_edge_green', 'button_edge_green.png')
    this.load.image('joystick_orange', 'joystick_orange.png')
    this.load.image('button_edge_grey', 'button_edge_grey.png')
    this.load.image('button_edge_blue', 'button_edge_blue.png')
    this.load.image('joystick_keeper', 'joystick_keeper.png')
    this.load.image('button_menu', 'button_menu.png')
    this.load.image('button_exit', 'button_exit.png')
    this.load.image('howtoBG', 'howto.png')
    // this.load.image('logo', 'logo.png')
    this.load.image('field', 'field.png')
  }

  create() {
    this.sound.play('bgm', { volume: 0.5, loop: true })
    this.add.image(1280 / 2, 720 / 2, 'bg')
    this.scene.launch('bootScene')
  }
}
