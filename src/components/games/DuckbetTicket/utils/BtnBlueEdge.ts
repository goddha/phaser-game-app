let textureName = 'btnBlueEdge'
export default class Button extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    // textureName = texture
    super(scene, x, y, textureName)
    this.setInteractive({ cursor: 'pointer' })
    this.on('pointerover', this.over, this)
    this.on('pointerout', this.restore, this)
    this.on('pointerdown', this.down, this)
    this.on('pointerup', this.restore, this)
    this.scene.add.existing(this)
    // if (text) {
    //   const info = this.scene.add.text(10, 10, text, { font: '48px Arial' })
    // }
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
}
