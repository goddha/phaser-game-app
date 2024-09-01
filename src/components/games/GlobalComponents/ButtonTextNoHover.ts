export default class ButtonText extends Phaser.GameObjects.Image {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    textureName: string,
    textShow?: string,
    textStyle?: Phaser.Types.GameObjects.Text.TextStyle,
    downY?: number,
    textX?: number,
    textY?: number
  ) {
    super(scene, x, y, textureName)
    this.scene.add.existing(this)
    const text = textShow ? this.scene.add.text(textX || x, textY || y, textShow, { font: '48px Arial', ...textStyle }).setOrigin(0.5) : null
    this.setInteractive({ cursor: 'pointer' })
    const textDefualtY = text?.y
    const toY = downY || 5
    const keyName = this.texture.key
    // this.on(
    //   'pointerover',
    //   () => {
    //     this.setTexture(keyName + 'Hover')
    //     text?.setY(textDefualtY)
    //   },
    //   this
    // )
    this.on(
      'pointerout',
      () => {
        this.setTexture(keyName)
        text?.setY(textDefualtY)
      },
      this
    )
    this.on(
      'pointerdown',
      () => {
        this.setTexture(keyName + 'Down')
        text?.setY(text.y + toY)
      },
      this
    )
    this.on(
      'pointerup',
      () => {
        this.setTexture(keyName)
        text?.setY(textDefualtY)
      },
      this
    )
  }
}
