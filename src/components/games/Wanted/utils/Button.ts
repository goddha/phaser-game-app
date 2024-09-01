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
    // this.setScale(1)
    this.scene.tweens.add({
      targets: this,
      scale: 1,
      duration: 100,
    })
  }

  over() {
    // this.setScale(0.95)
    this.scene.tweens.add({
      targets: this,
      scale: 0.95,
      duration: 100,
    })
  }

  // handleChooseCard() {
  //   this.scene.events.emit('chooseCard', this.data.list.value)
  // }
  handleChooseEnemy() {
    this.scene.events.emit('chooseEnemy', this.data.list.enemy)
  }
  // handleChooseExtra() {
  //   this.scene.events.emit('chooseExtra', this.data.list.extra)
  // }
}
