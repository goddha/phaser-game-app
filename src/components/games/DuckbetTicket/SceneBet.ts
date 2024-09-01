import Phaser from 'phaser'
import BtnWhiteEdge from './utils/BtnWhiteEdge'
import BtnGreenCornerRound from './utils/BtnGreenCornerRound'
import debugXY from '../GlobalComponents/debugFindXorY'
import DrawUnderLine from '../GlobalComponents/DrawUnderLine'
import inputProperty from '../GlobalComponents/inputProperty'
// import BtnGreenRound from './utils/'
// import Button from './utils/Button'

// let chooseMoney: number
const betMin = 1
const betMax = 999
const betCurrency = 'THB'
const choiceMoney = [5, 10, 15, 20, 25, 30]
// const currency = 'THB'
const styleBtn = {
	font: 'bold 30px Kanit',
	color: '#660000',
}
const styleBtnWhite = {
	...styleBtn,
	color: '#ffffff',
}
const styleWarning = {
	font: '16px Kanit',
	color: '#ff3040',
	align: 'right',
	padding: {
		top: 2,
	},
}
let inputText: any
export class SceneBet extends Phaser.Scene {
	constructor() {
		super('betScene')
	}

	preload() {
		console.log('betScene')
		this.scene.pause('playScene')
	}
	create() {
		const changeTextY = (object: Phaser.GameObjects.Sprite, text: Phaser.GameObjects.Text) => {
			const defualtY = text.y
			object
				.on('pointerup', () => {
					this.sound.play('clicking', { volume: 0.5 })
					text.setY(defualtY)
				})
				.on('pointerdown', () => {
					text.setY(text.y + 5)
				})
				.on('pointerout', () => {
					text.setY(defualtY)
				})
		}
		this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)')
		// this.add.rectangle(1280 / 2, 720 / 2, 1280, 720, 0x000000, 0.5)
		this.add.image(1280 / 2, 350, 'bgChoose')
		const textWarning = this.add.text(745, 310, `ตั้งแต่ ${betMin} - ${betMax} ${betCurrency}`, styleWarning).setOrigin(1).setVisible(false)
		inputText = this.add.rexInputText(735, 360, 250, 50, { ...inputProperty.property, color: `#660000` }).setOrigin(1)
		var style = document.createElement('style')
		style.innerHTML = `
      ${inputProperty.innerHtmlCss}
      @-moz-document url-prefix() { 
        #inputAmount{
          padding-right: 15px;
          padding-bottom: 30px;
        } 
      }
      `
		document.head.appendChild(style)
		inputText.node.addEventListener('keypress', (evt: KeyboardEvent) => {
			this.sound.play('clicking', { volume: 0.3 })
			if ((evt.which != 8 && evt.which != 0 && evt.which < 48) || evt.which > 57) {
				evt.preventDefault()
			}
		})
		choiceMoney.map((choice, index) => {
			const x = index < 3 ? 525 + index * 115 : 525 + (index - 3) * 115
			const y = index < 3 ? 410 : 480
			const btnChoice = new BtnWhiteEdge(this, x, y).on(Phaser.Input.Events.POINTER_DOWN, () => {
				inputText.text = choice
				// chooseMoney = choice
			})
			const choiceText = this.add.text(x, y, JSON.stringify(choice), styleBtn).setOrigin(0.5)
			changeTextY(btnChoice, choiceText)
		})
		const btnConfirm = new BtnGreenCornerRound(this, 1280 / 2, 560).on('pointerdown', () => {
			btnConfirm.on('pointerup', () => {
				acceptAmount(parseInt(inputText.text))
			})
		})

		const textConfirm = this.add.text(1280 / 2, 560, 'ยืนยัน', styleBtnWhite).setOrigin(0.5)
		const textHowto = this.add
			.text(1280 / 2, 620, 'วิธีเล่น', { font: '20px Kanit', color: '#ffffff' })
			.setOrigin(0.5)
			.setInteractive({ cursor: 'pointer' })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				inputText.setVisible(false)
				this.sound.play('clicking', { volume: 0.5 })
				this.input.setDefaultCursor('auto')
				this.scene.launch('howtoScene').bringToTop('howtoScene')
			})
		DrawUnderLine(this, textHowto, 0xffffff)
		changeTextY(btnConfirm, textConfirm)
		const btnExitRed = this.add
			.image(782, 333, 'btnExitRed')
			.setInteractive({ cursor: 'pointer' })
			.on(Phaser.Input.Events.POINTER_UP, () => {
				this.sound.play('clicking', { volume: 0.5 })
				btnExitRed.setTexture('btnExitRed')
			})
			.on(Phaser.Input.Events.POINTER_DOWN, () => {
				btnExitRed.setTexture('btnExitRedDown')
				inputText.text = 0
			})
		const acceptAmount = (amount: number) => {
			this.add.rectangle(0, 0, 1280, 720, 0x000000, 0).setInteractive()
			if (betMin < amount && amount < betMax) {
				this.scene.start('playScene', { chooseMoney: amount })
			} else {
				textWarning.setVisible(true)
			}
		}
	}
	update() {
		// inputText.setPosition(735 / (1280 / this.cameras.main.width), 360 / (720 / this.cameras.main.height))
		if (!this.scene.manager.isActive('howtoScene')) {
			inputText.setVisible(true)
		} else {
			inputText.setVisible(false)
		}
	}
}
