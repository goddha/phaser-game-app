import Phaser from 'phaser'

export class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootScene')
    // super({ key: 'bootScene', active: true })
  }

  create() {
    this.sound.play('cheer', { volume: +(<any>this.sound.get('bgm')).config.volume || 0 })
    const screenCenterx = this.cameras.main.worldView.x + this.cameras.main.width / 2
    this.add.image(1280 / 2, 170, 'logo')
    this.add.image(1280 / 2, 315, 'logo_shadow')
    this.add.image(329 / 2, 720 - 614 / 2, 'startKeeper')
    this.add.image(1280 - 354 / 2, 720 - 590 / 2, 'startTaker')
    var style = {
      font: 'bold 90px Kanit',
      color: '#fff',
      boundsAlignH: 'center',
      boundsAlignV: 'middle',
    }
    const container = this.add.container(0, 0)
    const btnRed = this.add.image(screenCenterx, 555, 'button_round_red').setInteractive({ cursor: 'pointer' })
    const text = this.add.text(screenCenterx, 545, 'เริ่มเกม', style).setOrigin(0.5)
    container.add([btnRed, text])
    btnRed.on('pointerdown', () => {
      this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume || 0 })
      this.scene.start('betScene')
    })
    const btnTween = {
      targets: [btnRed, text],
      scale: 0.95,
      ease: 'Linear',
      duration: 100,
    }
    btnRed.on('pointerover', () => {
      this.tweens.add(btnTween)
    })
    btnRed.on('pointerout', () => {
      this.tweens.add({ ...btnTween, scale: 1 })
    })
  }
}
