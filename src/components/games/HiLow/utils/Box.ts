export default class Box extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture)
    this.setDisplaySize(196, 77)
    this.scene.add.existing(this)
  }
}
