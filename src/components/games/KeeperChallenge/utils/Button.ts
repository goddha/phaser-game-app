let initial = {}
export default class Button extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)
    this.setInteractive({ cursor: 'pointer' })
    this.on('pointerover', this.over, this)
    this.on('pointerout', this.out, this)
    this.scene.add.existing(this)
    // if (text) {
    //   const info = this.scene.add.text(10, 10, text, { font: '48px Arial' })
    // }
  }

  out() {
    this.setY(this.y + 3)
  }

  over() {
    this.setY(this.y - 3)
  }

  // handleChooseCard() {
  //   this.scene.events.emit('chooseCard', this.data.list.value)
  // }
  handleChooseBullseye() {
    this.scene.events.emit('chooseBullseye', this.data.list.bullseyeposition)
  }
  handleChooseMoney() {
    this.scene.events.emit('chooseMoney', this.data.list.money)
  }
}
