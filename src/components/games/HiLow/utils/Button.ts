export default class Button extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)
    this.setInteractive({ cursor: 'pointer' })
    this.on('pointerover', this.over, this)
    this.on('pointerout', this.out, this)
    this.scene.add.existing(this)
  }

  out() {
    this.setY(this.y + 5)
  }

  over() {
    this.setY(this.y - 5)
  }

  handleChooseCard() {
    this.scene.events.emit('chooseCard', this.data.list.value)
  }
  handleChooseTypePoker() {
    this.scene.events.emit('typeOption', this.data.list.valueTypePoker)
  }
  handleChooseMoney() {
    this.scene.events.emit('chooseMoney', this.data.list.money)
  }
}
