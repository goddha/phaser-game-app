import Phaser from 'phaser'
// import btnWithTextTexture from '../GlobalComponents/btnWithTextTexture'
import ButtonText from '../GlobalComponents/ButtonText'
import ButtonTextNoHover from '../GlobalComponents/ButtonTextNoHover'
import DrawUnderLine from '../GlobalComponents/DrawUnderLine'
import inputProperty from '../GlobalComponents/inputProperty'

// let chooseMoney: number
const betMin = 1
const betCurrency = 'THB'
const choiceMoney = [5, 10, 15, 20, 25, 30]
const betType = [
	{ piece: 3, odds: 2, color: '1FC265' },
	{ piece: 4, odds: 4, color: 'F0A335' },
	{ piece: 6, odds: 10, color: 'C61313' },
]
const styleBtn = {
	font: 'bold 50px Kanit',
	color: '#ffffff',
}
const styleBtnConfirm = {
	font: 'bold 30px Kanit',
	color: '#ffffff',
}
// const styleBtnCancel = {
//   font: 'bold 35px Kanit',
//   color: '#1e571a',
// }
const styleWarning = {
	font: '14px Kanit',
	color: '#ff3040',
	align: 'right',
	padding: {
		top: 2,
	},
}
let inputText: any
let showInputText: boolean
export class SceneBet extends Phaser.Scene {
	constructor() {
		super('betScene')
	}
	// preload() {
	//   this.scene.pause('playScene')
	// }
	create() {
		showInputText = false
		this.scene.pause('playScene')
		// this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)')
		this.add.rectangle(1280 / 2, 720 / 2, 1280, 720, 0x00000, 0.5).setInteractive()
		const typeContainer = this.add.container(0, 0)
		betType.map((type, index) => {
			const typeButton = this.add
				.image(1280 / 2, 120 + index * 200, `${type.piece}Piece`)
				.setInteractive({ cursor: 'pointer' })
				.on('pointerover', () => {
					typeButton.setScale(1.05)
					typePieceText.setScale(1.05)
					typeNameText.setScale(1.05)
				})
				.on('pointerout', () => {
					typeButton.setScale(1)
					typePieceText.setScale(1)
					typeNameText.setScale(1)
				})
				.on('pointerdown', () => {
					typeContainer.setVisible(false)
					stepBetting(type)
				})
			const typePieceText = this.add.text(1280 / 2 - 130, 105 + index * 200, `${type.piece}`, { ...styleBtn, color: `#${type.color}` })
			const typeNameText = this.add.text(1280 / 2 - 80, 105 + index * 200, 'ช่อง', { ...styleBtn, color: '#000000' })
			typeContainer.add(typeButton).add(typeNameText).add(typePieceText)
		})
		const stepBetting = (gameType: object) => {
			showInputText = true
			const type = gameType
			this.add.image(1280 / 2, 340, 'bgBet')
			const textWarning = this.add
				.text(1280 / 2, 515, `ขั้นต่ำ ${betMin} ${betCurrency}`, styleWarning)
				.setOrigin(0.5)
				.setVisible(false)
			inputText = this.add.rexInputText(485, 295, 250, 65, { ...inputProperty.property, fontSize: '35px', align: 'left' }).setOrigin(0)
			this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 })
			inputText.node.addEventListener('keypress', function (evt: KeyboardEvent) {
				if ((evt.which != 8 && evt.which != 0 && evt.which < 48) || evt.which > 57) {
					evt.preventDefault()
				}
			})
			this.add.text(640, 280, 'เลือกจำนวนเงินเดิมพัน', { ...styleBtn, font: '25px Kanit' }).setOrigin(0.5)
			choiceMoney.map((choice, index) => {
				const x = index < 3 ? 525 + index * 114 : 525 + (index - 3) * 114
				const y = index < 3 ? 400 : 465
				new ButtonText(this, x, y, 'btnBlueGreen', JSON.stringify(choice), styleBtn, 3).on(Phaser.Input.Events.POINTER_DOWN, () => {
					this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 })
					inputText.text = choice
				})
			})
			let btnConfirmIsDown = false
			new ButtonTextNoHover(this, 1280 / 2 + 80, 560, 'btnSquareGreen', 'ยืนยัน', styleBtnConfirm, 0)
				.on(Phaser.Input.Events.POINTER_UP, () => {
					if (btnConfirmIsDown) acceptAmount(parseInt(inputText.text))
				})
				.on(Phaser.Input.Events.POINTER_OUT, () => {
					btnConfirmIsDown = false
				})
				.on(Phaser.Input.Events.POINTER_DOWN, () => {
					this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 })
					btnConfirmIsDown = true
				})
			new ButtonTextNoHover(this, 1280 / 2 - 80, 560, 'btnSquareRed', 'ยกเลิก', styleBtnConfirm, 0).on(Phaser.Input.Events.POINTER_DOWN, () => {
				this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 })
				this.scene.restart()
			})
			const btnClear = this.add
				.image(780, 332, 'btnSquareX')
				.setInteractive({ cursor: 'pointer' })
				.on('pointerup', () => {
					btnClear.clearTint()
				})
				.on('pointerdown', () => {
					this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 })
					btnClear.setTint(0xc61313)
					inputText.text = 0
				})
			var style = document.createElement('style')
			style.innerHTML = inputProperty.innerHtmlCss
			document.head.appendChild(style)
			const acceptAmount = (amount: number) => {
				this.add.rectangle(0, 0, 1280, 720, 0x000000, 0).setInteractive()
				if (amount > betMin) {
					this.scene.start('playScene', { chooseMoney: amount, type })
				} else {
					textWarning.setVisible(true)
				}
			}
			const textHowto = this.add
				.text(1280 / 2, 620, 'วิธีเล่น', { font: '20px Kanit', color: '#ffffff' })
				.setOrigin(0.5)
				.setInteractive({ cursor: 'pointer' })
				.on(Phaser.Input.Events.POINTER_UP, () => {
					inputText.setVisible(false)
					this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume * 0.5 })
					this.input.setDefaultCursor('auto')
					this.scene.launch('howtoScene').bringToTop('howtoScene')
				})
			DrawUnderLine(this, textHowto, 0xffffff)
		}
	}
	update() {
		if (!this.scene.manager.isActive('howtoScene') && showInputText) {
			inputText.setVisible(true)
		} else if (showInputText) {
			inputText.setVisible(false)
		}
	}
}
