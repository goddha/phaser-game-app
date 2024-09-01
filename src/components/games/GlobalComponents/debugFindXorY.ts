const debugFindXorY = (
  scene: Phaser.Scene,
  gameObject: Phaser.GameObjects.Sprite | Phaser.GameObjects.Image | Phaser.GameObjects.Text,
  useX?: boolean,
  useY?: boolean,
  pointerCommand?: string
) => {
  scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
    if (useY) {
      gameObject.y = pointer.y
    }
    if (useX) {
      gameObject.x = pointer.x
    }
  })
  scene.input.on(`${pointerCommand || 'pointerdown'}`, (pointer: Phaser.Input.Pointer) => {
    console.log({ x: pointer.x })
    console.log({ y: pointer.y })
  })
}

export default debugFindXorY
