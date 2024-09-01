import GetRandomNumber from './GetRandomNumber'

const LoadingScreen = (sceneOrigin: Phaser.Scene) => {
	const styleLoading = {
		font: '16px Kanit',
		color: '#ffffff',
	}
	sceneOrigin.add.rectangle(1280 / 2, 720 / 2, 1280, 720, 0x313535, 1)
	sceneOrigin.add.image(1280 / 2, 720 / 2 - 15, 'duckbetLogoWhite')
	sceneOrigin.add
		.text(1280 / 2, 720, `If the game not load, please use Google Chrome`, styleLoading)
		.setOrigin(0.5, 1)
		.setVisible(true)
	const progressBox = sceneOrigin.add
		.graphics()
		.fillStyle(0x202323, 1)
		.fillRoundedRect(1280 / 2 - 370 / 2, 720 / 2 - 20 / 2 + 25, 370, 20, 10)
	const progressBar = sceneOrigin.add
		.graphics()
		.fillStyle(0x47afb4, 1)
		.fillRoundedRect(1280 / 2 - 360 / 2 - 2, 720 / 2 - 7.5 + 25, 20, 15, 7.5)
	const textLoading = sceneOrigin.add
		.text(1280 / 2 - 360 / 2, 720 / 2 - 7.5 + 55, 'loading', styleLoading)
		.setOrigin(0, 0.5)
		.setVisible(true)
	const textLoadingPercent = sceneOrigin.add
		.text(1280 / 2 + 360 / 2, 720 / 2 - 7.5 + 55, '0 %', styleLoading)
		.setOrigin(1, 0.5)
		.setVisible(true)
	const textLoadingComplete = sceneOrigin.add
		.text(1280 / 2, 720 / 2 - 7.5 + 55, 'completed', styleLoading)
		.setOrigin(0.5)
		.setVisible(false)
	sceneOrigin.load.on('progress', (value: number) => {
		const progress = Math.floor(value * 100)
		progressBar
			.clear()
			.fillStyle(0x47afb4, 1)
			.fillRoundedRect(1280 / 2 - 360 / 2 - 2, 720 / 2 - 7.5 + 25, value * 365, 15, 7.5)
		if (progress > 99) {
			progressBox
				.clear()
				.fillStyle(0xffffff, 1)
				.fillRoundedRect(1280 / 2 - 370 / 2, 720 / 2 - 20 / 2 + 25, 370, 20, 10)
			textLoading.setVisible(false)
			textLoadingPercent.setVisible(false)
			textLoadingComplete.setVisible(true)
		} else {
			const numberFullstop = GetRandomNumber(0, 3)
			let textFullstop = 'loading'
			for (let i = 0; i < numberFullstop; i++) {
				textFullstop += '.'
			}
			textLoading.setText(`${textFullstop}`)
			textLoadingPercent.setText(JSON.stringify(progress) + ' %')
		}
	})
}

export default LoadingScreen
