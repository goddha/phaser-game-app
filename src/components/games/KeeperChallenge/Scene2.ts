import Phaser from 'phaser'
import Button from './utils/Button'
import inputProperty from '../GlobalComponents/inputProperty'
// import debugFindXorY from '../GlobalComponents/debugFindXorY'
let inputText: any
let hideInputText: boolean
export class Scene2 extends Phaser.Scene {
	constructor() {
		super('betScene')
	}

	preload() {}

	create() {
		let chooseBullseye: number = 0
		const betMin = 1
		const betMax = 9999
		const betCurrency = 'THB'
		// const styleWarning = {
		//   font: '20px Kanit',
		//   color: '#ff3040',
		//   align: 'right',
		//   padding: {
		//     top: 3,
		//   },
		// }
		const betChoice = [5, 10, 15, 20, 25, 30]
		const buttonStyle = {
			font: 'bold 60px Kanit',
			color: '#ffffff',
			boundsAlignH: 'center',
			boundsAlignV: 'middle',
		}
		const btnAudio = this.add
			.image(1260, 20, `btnAudio${!!(<any>this.sound.get('bgm')).config.volume ? '' : 'Mute'}`)
			.setInteractive({ cursor: 'pointer' })
			.setData({ enable: !!(<any>this.sound.get('bgm')).config.volume })
			.on('pointerdown', () => {
				btnAudio.data.list.enable = !btnAudio.data.list.enable
				;(<any>this.sound.get('bgm')).setVolume(+btnAudio.data.list.enable)
				btnAudio.setTexture(`btnAudio${!!(<any>this.sound.get('bgm')).config.volume ? '' : 'Mute'}`)
			})
		this.add.image(1280 / 2, 720 / 2 - 100, 'goal')
		const btnHowto = new Button(this, 40, 650, 'button_menu')
		btnHowto.on(
			Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
			() => {
				this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume || 0 })
				// this.scene.pause()
				this.scene.launch('howtoScene')
			},
			this
		)
		this.add.image(1280 / 2, 720 / 2 + 471 / 2, 'joystick_orange')
		const joy_keeper = this.add.image(1280 / 2, 310, 'joystick_keeper')
		joy_keeper.displayHeight = 250
		joy_keeper.displayWidth = 230
		this.add.image(330, 556, 'bg_input')
		// debugFindXorY(this, bgt, true, true)
		// debugFindXorY(this, text, true, true)
		const warnFakeBg = this.add.rectangle(1280 / 2, 720 / 2, 1280, 720, 0x000000, 0.5).setInteractive()
		const warnTextBg = this.add.image(1280 / 2, 720 / 2, 'bg_text')
		const warnText = this.add
			.text(1280 / 2, 720 / 2 - 5, `จำนวนเดิมพันไม่ถูกต้อง\nตั้งแต่ ${betMin} ถึง ${betMax} ${betCurrency}`, {
				...buttonStyle,
				color: '#000000',
				font: '16px Kanit',
				padding: { top: 3 },
				align: 'center',
			})
			.setOrigin(0.5)
		const warnExitBtn = this.add
			.image(1280 / 2, 720 / 2 + 100, 'button_round_blue')
			.setInteractive({ cursor: 'pointer' })
			.on('pointerdown', () => {
				this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume || 0 })
				hideInputText = false
				// inputText.setVisible(true)
				warnContainer.setVisible(false)
			})
			.on('pointerover', () => {
				warnExitBtn.setScale(0.99)
			})
			.on('pointerout', () => {
				warnExitBtn.setScale(1)
			})
		const warnExitBtnText = this.add.text(1280 / 2, 720 / 2 + 95, 'ตกลง', { ...buttonStyle, font: '40px Kanit' }).setOrigin(0.5)
		const warnContainer = this.add.container(0, 0, [warnFakeBg, warnTextBg, warnText, warnExitBtn, warnExitBtnText]).setVisible(false).setDepth(10)
		inputText = this.add
			.rexInputText(156, 519, 300, 65, { ...inputProperty.property, fontSize: '40px' })
			.setOrigin(0)
			.setVisible(true)
		var style = document.createElement('style')
		style.innerHTML = inputProperty.innerHtmlCss
		document.head.appendChild(style)
		inputText.node.addEventListener('keypress', (evt: KeyboardEvent) => {
			this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume || 0 })
			if ((evt.which != 8 && evt.which != 0 && evt.which < 48) || evt.which > 57) {
				evt.preventDefault()
			}
		})
		var style = document.createElement('style')
		style.innerHTML = `
      #inputAmount::-webkit-outer-spin-button, 
      #inputAmount::-webkit-inner-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
      }`
		document.head.appendChild(style)
		// let buttonX = 250
		let btnChoices: Button[] = []
		betChoice.map((choice, index) => {
			const xy = index < 2 ? { x: 550 + 150 * index, y: 556 } : { x: 250 + 150 * (index - 2), y: 640 }
			const btnChoice = new Button(this, xy.x, xy.y, 'button_edge_grey')
				.setDisplaySize(130, 70)
				.setData({ money: choice })
				.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
					this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume || 0 })
					// inputText.text = `ขั้นต่ำ ${betMin} ${betCurrency}`
					inputText.text = btnChoice.data.list.money
					btnChoices.map((btn, btnIndex) => {
						btn.setTexture(`button_edge_${index === btnIndex ? 'blue' : 'grey'}`)
					})
				})
				.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
					txtChoice.setY(txtChoice.y - 5)
				})
				.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
					txtChoice.setY(xy.y)
				})
			const txtChoice = this.add.text(xy.x, xy.y, JSON.stringify(choice), { ...buttonStyle, font: 'bold 40px Kanit' }).setOrigin(0.5)
			// buttonX += 150
			btnChoices.push(btnChoice)
		})
		const btnBet = new Button(this, 950, 600, 'button_edge_green')
			.on('pointerover', () => {
				txtBet.setY(txtBet.y - 5)
			})
			.setInteractive({ cursor: 'pointer' })
			.on('pointerout', () => {
				txtBet.y = 600
			})
		const btnBetFake = this.add.image(950, 600, 'button_edge_green_disabled').setInteractive()
		const txtBet = this.add.text(950, 600, 'เดิมพัน', { font: 'bold 50px Kanit', color: '#ffffff' }).setOrigin(0.5).setShadow(2, 2, '#439a00', 2, false, true)
		btnBet.on('pointerdown', () => {
			this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume || 0 })
			if (parseInt(inputText.text) >= betMin && parseInt(inputText.text) <= betMax && chooseBullseye > 0) {
				this.scene.start('resultScene', {
					betChoice: {
						chooseMoney: parseInt(inputText.text),
						chooseBullseye: chooseBullseye,
					},
				})
			} else if (parseInt(inputText.text) < betMin || parseInt(inputText.text) > betMax) {
				hideInputText = true
				warnContainer.setVisible(true)
			}
		})
		const bullseyeXY = { x: 300, y: 200 }
		let btnBullseye: Button[] = []
		for (let bullseyePos = 1; bullseyePos <= 5; bullseyePos++) {
			const btnBullseyeOne = new Button(this, bullseyeXY.x, bullseyeXY.y, 'bullseye_grey').on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
				btnBetFake.setVisible(false)
				this.sound.play('click', { volume: +(<any>this.sound.get('bgm')).config.volume || 0 })
				chooseBullseye = bullseyePos
				btnBullseye.map((btn, index) => {
					btn.setTexture(`bullseye${index === bullseyePos - 1 ? '' : '_grey'}`)
				})
			})
			if (bullseyePos === 2) {
				bullseyeXY.y = 400
				bullseyeXY.x = 300
			} else if (bullseyePos === 4) {
				bullseyeXY.y = 283
				bullseyeXY.x = 1280 / 2
			} else {
				bullseyeXY.x += 680
			}
			btnBullseye.push(btnBullseyeOne)
		}
	}
	update() {
		// if (this.scene.isActive('howtoScene')) {
		// inputText.setVisible(false)
		// }
		inputText.setVisible(!this.scene.isActive('howtoScene') && !hideInputText)
	}
}

export default function PhaserIndex() {
	return null
}
