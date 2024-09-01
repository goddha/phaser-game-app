import assets from '../utils/assets'

export default function Loading(self: Phaser.Scene): void {
  const progressBar = self.add.graphics()
  const progressBox = self.add.graphics()
  progressBox.fillStyle(0x222222, 0.8)
  progressBox.fillRect(1400 / 2 - 320 / 2, 270, 320, 50)

  const width = self.cameras.main.width
  const height = self.cameras.main.height
  const loadingText = self.make.text({
    x: width / 2,
    y: height / 2 - 10,
    text: 'Loading...',
    style: {
      font: '20px Kanit',
    },
  })
  loadingText.setOrigin(0.5, 0.5)

  const assetText = self.make.text({
    x: width / 2,
    y: height / 2 + 100,
    text: '',
    style: {
      font: '18px Kanit',
    },
  })

  assetText.setOrigin(0.5, 0.5)

  const percentText = self.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: '0%',
    style: {
      font: '18px Kanit',
    },
  })
  percentText.setOrigin(0.5, 0.5)

  self.load.on('progress', (value: number) => {
    percentText.setText(value * 100 + '%')
    progressBar.clear()
    progressBar.fillStyle(0xffffff, 1)
    progressBar.fillRect(1400 / 2 - 320 / 2 + 10, 280, 300 * value, 30)
  })

  self.load.on('fileprogress', (file: { key: string }) => {
    assetText.setText('Loading asset: ' + file.key)
  })

  self.load.on('complete', () => {
    progressBar.destroy()
    progressBox.destroy()
    loadingText.removeAllListeners
    percentText.removeAllListeners
    assetText.removeAllListeners
  })
  assets.map(({ key, image }) => {
    self.load.image(key, image)
  })
}
