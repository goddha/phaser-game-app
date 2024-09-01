import Result from '../utils/Result'

export function CardResult(self: Phaser.Scene) {
  self.add.sprite(1320, 370, 'oldResult').setDisplaySize(130, 667)
  const boxResult = self.add.image(240, 300, 'BgResult').setDisplaySize(360, 490)

  const resultCard = new Result(self, 240, 300, 'k').setDisplaySize(270, 392)
  Phaser.Display.Align.In.Center(resultCard, boxResult)

  const graphics = self.make.graphics({})
  graphics.fillRect(0, 100, 400, 400)
  const mask = new Phaser.Display.Masks.GeometryMask(self, graphics)
  resultCard.setMask(mask)

  self.scene.scene.events.on(
    'getResultSuccessfully',
    () => {
      resultCard.scene.tweens.add({
        targets: resultCard,
        y: -100,
        ease: 'Bounce.easeOut',
        duration: 1000,
        delay: 500,
      })

      const newResult = new Result(self, 240, 700, 'q').setDisplaySize(270, 392)
      newResult.setMask(mask)

      newResult.scene.tweens.add({
        targets: newResult,
        y: 300,
        ease: 'Bounce.easeOut',
        duration: 1000,
        delay: 500,
      })

      // self.tweens.add({
      //   targets: resultCard,
      //   props: {
      //     scale: 0.07,
      //     timeScale: { from: 0.5, to: 2 },
      //     repeat: -1,
      //     x: { value: '+=1080', duration: 3000, ease: 'Power2' },
      //     y: { value: '150', duration: 1500, ease: 'Sine.inOut' },
      //   },
      //   delay: 1000,
      // })
    },
    self,
  )
}
