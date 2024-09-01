const DrawUnderLine = (
  scene: Phaser.Scene,
  gameObject: Phaser.GameObjects.Sprite | Phaser.GameObjects.Image | Phaser.GameObjects.Text,
  color: number,
  x?: number,
  y?: number
) => {
  const underline = scene.add.graphics()
  underline.lineStyle(2, color || 0xffffff)
  underline.beginPath()
  console.log(gameObject.getBounds())
  underline.moveTo(x || gameObject.getBounds().left, y || gameObject.getBounds().bottom)
  underline.lineTo(gameObject.width + gameObject.getBounds().left, gameObject.getBounds().bottom)
  underline.closePath()
  underline.strokePath()
}

export default DrawUnderLine
