import Phaser from 'phaser'
import BtnCancel from './utils/BtnCancel'
import DrawUnderLine from '../GlobalComponents/DrawUnderLine'
import inputProperty from '../GlobalComponents/inputProperty'
// import BtnGreenRound from './utils/'
// import Button from './utils/Button'

// let chooseMoney: number
const betMin = 1
const betCurrency = 'THB'
const choiceMoney = [5, 10, 15, 20, 25, 30]
// const currency = 'THB'
const styleBtn = {
	font: 'bold 40px Kanit',
	color: '#462421',
}
const styleBtnConfirm = {
	font: 'bold 40px Kanit',
	// ...styleBtn,
	color: '#1e571a',
}
const styleWarning = {
	font: '14px Kanit',
	color: '#ff3040',
	align: 'right',
	padding: {
		top: 2,
	},
}
let inputText: any
const btnWithTextTexture = (object: Phaser.GameObjects.Image, text: Phaser.GameObjects.Text) => {
	const defualtY = text.y
	const keyName = object.texture.key
	object
		.on('pointerup', () => {
			object.setTexture(keyName)
			text.setY(defualtY)
		})
		.on('pointerdown', () => {
			object.setTexture(keyName + 'Down')
			text.setY(text.y + 5)
		})
		.on('pointerover', () => {
			object.setTexture(keyName + 'Hover')
			text.setY(defualtY)
		})
		.on('pointerout', () => {
			object.setTexture(keyName)
			text.setY(defualtY)
		})
}
export class SceneBet extends Phaser.Scene {
	constructor() {
		super('betScene')
	}

	preload() {
		this.scene.pause('playScene')
	}
	create() {
		const audioEnable: number = (<any>this.sound.get('bgm')).config.volume
		this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)')
		this.add.image(1280 / 2, 350, 'bgBet')
		const textWarning = this.add
			.text(1280 / 2, 515, `ขั้นต่ำ ${betMin} ${betCurrency}`, styleWarning)
			.setOrigin(0.5)
			.setVisible(false)
		inputText = this.add.rexInputText(465, 260, 300, 65, { ...inputProperty.property, fontSize: '40px', color: '#ffffff', align: 'left' }).setOrigin(0)
		var style = document.createElement('style')
		style.innerHTML = inputProperty.innerHtmlCss
		document.head.appendChild(style)
		inputText.node.addEventListener('keypress', (evt: KeyboardEvent) => {
			this.sound.play('clicking', { volume: audioEnable * 0.5 })
			if ((evt.which != 8 && evt.which != 0 && evt.which < 48) || evt.which > 57) {
				evt.preventDefault()
			}
		})
		this.add.text(640, 250, 'เลือกจำนวนเงินเดิมพัน', { ...styleBtn, font: '25px Kanit' }).setOrigin(0.5)
		choiceMoney.map((choice, index) => {
			const x = index < 3 ? 510 + index * 128 : 510 + (index - 3) * 128
			const y = index < 3 ? 380 : 465
			const btnChoice = this.add
				.image(x, y, 'btnBrown')
				.setInteractive({ cursor: 'pointer' })
				.on(Phaser.Input.Events.POINTER_DOWN, () => {
					this.sound.play('clicking', { volume: audioEnable * 0.5 })
					inputText.text = choice
				})
			const choiceText = this.add.text(x, y, JSON.stringify(choice), styleBtn).setOrigin(0.5)
			btnWithTextTexture(btnChoice, choiceText)
		})
		const btnConfirm = this.add
			.image(1280 / 2, 560, 'btnGreen')
			.setInteractive({ cursor: 'pointer' })
			.on('pointerdown', () => {
				this.sound.play('clicking', { volume: audioEnable * 0.5 })
				btnConfirm.on('pointerup', () => {
					acceptAmount(parseInt(inputText.text))
				})
			})
		const textConfirm = this.add.text(1280 / 2, 560, 'ยืนยัน', styleBtnConfirm).setOrigin(0.5)
		btnWithTextTexture(btnConfirm, textConfirm)
		new BtnCancel(this, 800, 295).on(Phaser.Input.Events.POINTER_DOWN, () => {
			this.sound.play('clicking', { volume: audioEnable * 0.5 })
			inputText.text = 0
		})
		const acceptAmount = (amount: number) => {
			this.add.rectangle(0, 0, 1280, 720, 0x000000, 0).setInteractive()
			if (amount > betMin) {
				this.scene.start('playScene', { chooseMoney: amount })
			} else {
				textWarning.setVisible(true)
			}
		}
		const textHowto = this.add
			.text(1280 / 2, 620, 'วิธีเล่น', { ...styleBtn, font: '25px Kanit' })
			.setOrigin(0.5)
			.setInteractive({ cursor: 'pointer' })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				inputText.setVisible(false)
				this.sound.play('clicking', { volume: 0.5 })
				this.input.setDefaultCursor('auto')
				this.scene.launch('howtoScene').bringToTop('howtoScene')
			})
		DrawUnderLine(this, textHowto, 0x462421)
	}
	update() {
		if (!this.scene.manager.isActive('howtoScene')) {
			inputText.setVisible(true)
		} else {
			inputText.setVisible(false)
		}
	}
}
