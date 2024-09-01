export default class Result extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, result: string) {
    super(scene, x, y, result)
    this.setInteractive()
    this.scene.add.existing(this)
  }
}
