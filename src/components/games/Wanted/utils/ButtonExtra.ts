export default class Button extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)
    this.setInteractive({ cursor: 'pointer' })
    this.scene.add.existing(this)
  }
  handleChooseExtra() {
    this.scene.events.emit('chooseExtra', this.data.list.extra)
  }
}
