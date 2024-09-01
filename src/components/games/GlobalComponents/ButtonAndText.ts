class Button extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, textureName: string) {
    super(scene, x, y, textureName)
    this.scene.add.existing(this)
    this.setInteractive({ cursor: 'pointer' })
    const keyName = this.texture.key
    this.on(
      'pointerover',
      () => {
        this.setTexture(keyName + 'Hover')
      },
      this
    )
    this.on(
      'pointerout',
      () => {
        this.setTexture(keyName)
      },
      this
    )
    this.on(
      'pointerdown',
      () => {
        this.setTexture(keyName + 'Down')
      },
      this
    )
    this.on(
      'pointerup',
      () => {
        this.setTexture(keyName)
      },
      this
    )
  }
}
class Text extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    textShow?: string,
    textStyle?: Phaser.Types.GameObjects.Text.TextStyle,
    downY?: number,
    textX?: number,
    textY?: number
  ) {
    if (!textShow) return
    super(scene, textX || x, textY || y, textShow, { font: '48px Arial', ...textStyle })
    this.setOrigin(0.5)
    const textDefualtY = this.y
    const toY = downY || 5
    this.on(
      'pointerover',
      () => {
        this.setY(textDefualtY)
      },
      this
    )
    this.on(
      'pointerout',
      () => {
        this.setY(textDefualtY)
      },
      this
    )
    this.on(
      'pointerdown',
      () => {
        this.setY(this.y + toY)
      },
      this
    )
    this.on(
      'pointerup',
      () => {
        this.setY(textDefualtY)
      },
      this
    )
  }
}
export default { Button, Text }
