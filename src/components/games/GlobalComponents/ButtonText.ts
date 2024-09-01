export default class ButtonText extends Phaser.GameObjects.Image {
  text: Phaser.GameObjects.Text
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
    this.text = this.scene.add.text(textX || x, textY || y, textShow || '', { font: '48px Arial', ...textStyle }).setOrigin(0.5)
    this.setInteractive({ cursor: 'pointer' })
    const textDefualtY = this.text?.y
    const toY = downY || 5
    const keyName = this.texture.key
    this.on(
      'pointerover',
      () => {
        this.setTexture(keyName + 'Hover')
        this.text?.setY(textDefualtY)
      },
      this
    )
    this.on(
      'pointerout',
      () => {
        this.setTexture(keyName)
        this.text?.setY(textDefualtY)
      },
      this
    )
    this.on(
      'pointerdown',
      () => {
        this.setTexture(keyName + 'Down')
        this.text?.setY(this.text.y + toY)
      },
      this
    )
    this.on(
      'pointerup',
      () => {
        this.setTexture(keyName)
        this.text?.setY(textDefualtY)
      },
      this
    )
  }
}

// export class TextButton extends ButtonText {
//   constructor(height, width) {
//     super()
//     this.height = height
//     this.width = width
//   }
// }

// export default ButtonText
// function xc(scene: Phaser.Scene, x: number, y: number, textureName: string, xc: any) {
//   throw new Error('Function not implemented.')
// }
