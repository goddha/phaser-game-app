let textureName = 'btnGreenCornerRound'
export default class Button extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, textureName)
    this.setInteractive({ cursor: 'pointer' })
    this.on('pointerover', this.over, this)
    this.on('pointerout', this.restore, this)
    this.on('pointerdown', this.down, this)
    this.on('pointerup', this.restore, this)
    this.scene.add.existing(this)
  }

  restore() {
    this.setTexture(textureName)
  }

  over() {
    this.setTexture(textureName + `Hover`)
  }

  down() {
    this.setTexture(textureName + 'Down')
  }

  // handleChooseCard() {
  //   this.scene.events.emit('chooseCard', this.data.list.value)
  // }
  // handleChooseEnemy() {
  //   this.scene.events.emit('chooseEnemy', this.data.list.enemy)
  // }
  // handleChooseExtra() {
  //   this.scene.events.emit('chooseExtra', this.data.list.extra)
  // }
}
