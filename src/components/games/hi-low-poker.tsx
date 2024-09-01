// import * as PIXI from 'pixi.js'
// import { useEffect, useState } from 'react'
// // const hi = { value: 'hi', rate: 10 }
// // const low = { value: 'low', rate: 10 }
// // interface typeSelected {
// //   value: string
// //   rate: number
// // }

// let hiLowCheckedPoker: string | null = null

// const HiLowPoker = () => {
//   const app = new PIXI.Application({
//     backgroundColor: 0xffffff,
//     resizeTo: window,
//     width: window.innerWidth,
//     height: window.innerHeight,
//     autoDensity: true,
//     resolution: window.devicePixelRatio,
//   })

//   const loader = new PIXI.Loader()
//   loader.baseUrl = '/image/hi-low'
//   const initial = () => {
//     document.body.innerHTML = ''
//     document.body.appendChild(app.view)
//     const container = new PIXI.Container()
//     app.stage.addChild(container)

//     loader
//       .add('logo', 'logo.png')
//       .add('bg', 'bg.png')
//       .add('backgroundCardResult', 'box-result.png')
//       .add('cardResult', 'kk.png')
//       .add('scoreWin', 'win.png')
//       .add('totalBet', 'bet.png')
//       .add('hiOption', 'option-hi.png')
//       .add('lowOption', 'option-low.png')
//       .add('bgOption', 'bg-option.png')
//       .add('diamondsCard', 'diamonds.png')
//       .add('heartsCard', 'hearts.png')
//       .add('clubsCard', 'clubs.png')
//       .add('spadesCard', 'spades.png')
//       .load(({ resources }) => {
//         const background = new PIXI.Sprite()
//         app.stage.addChild(background)
//         background.texture = resources.bg.texture

//         const logo = new PIXI.Sprite()
//         logo.x = app.renderer.width * 0.3
//         logo.y = app.renderer.height * 0
//         logo.height = 331
//         logo.width = 491
//         app.stage.addChild(logo)
//         logo.texture = resources.logo.texture

//         const bgResult = new PIXI.Sprite(resources.backgroundCardResult.texture)
//         bgResult.x = app.renderer.width * 0.02
//         bgResult.y = app.renderer.height * 0.1
//         bgResult.height = 516
//         bgResult.width = 381
//         bgResult.interactive = true
//         app.stage.addChild(bgResult)

//         const resultPoker = new PIXI.Sprite(resources.cardResult.texture)
//         resultPoker.x = app.renderer.width * 0.035
//         resultPoker.y = app.renderer.height * 0.125
//         resultPoker.height = app.renderer.width * 0.105
//         resultPoker.width = 270
//         resultPoker.interactive = true
//         app.stage.addChild(resultPoker)

//         const styledText = new PIXI.TextStyle({
//           fill: '#000000',
//           fontSize: 24,
//           strokeThickness: 1.2,
//         })

//         const isTexture = [
//           {
//             name: 'scoreWin',
//             width: 200,
//             x: 0.025,
//             text: 'ยอดชนะ',
//             textX: 155,
//             textY: 765,
//             number: '10',
//           },
//           {
//             name: 'totalBet',
//             width: 200,
//             x: 0.13,
//             text: 'ยอดเดิมพัน',
//             textX: 385,
//             textY: 765,
//             number: '100',
//           },
//         ]

//         isTexture.map(({ name, width, x, text, textX, textY, number }) => {
//           const loadImage = PIXI.Texture.from(name)
//           const sprite = new PIXI.Sprite(loadImage)
//           sprite.width = width
//           sprite.height = 77
//           sprite.x = app.renderer.height * x
//           sprite.y = app.renderer.height * 0.35
//           app.stage.addChild(sprite)
//           const textStyle = new PIXI.Text(text, styledText)
//           textStyle.position.x = textX
//           textStyle.position.y = textY
//           textStyle.anchor.x = 0.5
//           app.stage.addChild(textStyle)

//           const numberText = new PIXI.Text(number, styledText)
//           numberText.style = {
//             fill: '#fff',
//           }
//           numberText.position.x = textX
//           numberText.position.y = textY + 35
//           numberText.anchor.x = 0.5
//           app.stage.addChild(numberText)
//         })

//         const HiLowOption = ['hiOption', 'lowOption']

//         HiLowOption.forEach((option, i) => {
//           const HiLow = PIXI.Sprite.from(option)
//           HiLow.buttonMode = true
//           HiLow.interactive = true
//           HiLow.x = 700 + i * 400
//           HiLow.y = 350
//           HiLow.height = 71
//           HiLow.width = 279
//           HiLow.on('mousedown', () => onDown(option, HiLow))
//             // .on('pointerover', onButtonOver)
//             // .on('pointerout', onButtonOut)
//             // .on('pointerdown', onButtonDown)
//             .on('pointerup', () => {
//               if (hiLowCheckedPoker === option) {
//                 HiLow.y -= 5
//               }
//             })
//           // .on('pointerupoutside', onButtonUp)
//           app.stage.addChild(HiLow)
//         })

//         function onDown(data: string, option: any) {
//           if (hiLowCheckedPoker !== null) {
//             if (hiLowCheckedPoker === data) {
//               return (hiLowCheckedPoker = null)
//             }
//           }
//           option.y += 5
//           option.tint = 0xff0000
//           hiLowCheckedPoker = data
//         }

//         const bgOption = new PIXI.Sprite(resources.bgOption.texture)
//         bgOption.x = 650
//         bgOption.y = 435
//         bgOption.height = 230
//         bgOption.width = 793
//         app.stage.addChild(bgOption)

//         const card = ['diamondsCard', 'heartsCard', 'clubsCard', 'spadesCard']
//         let selectedPoker: string | null = null

//         card.forEach((data, i) => {
//           const cardPoker = PIXI.Sprite.from(data)
//           cardPoker.buttonMode = true
//           cardPoker.interactive = true
//           cardPoker.x = 750 + i * 200
//           cardPoker.y = 550
//           cardPoker.width = 108
//           cardPoker.height = 157
//           cardPoker.anchor.set(0.5)

//           cardPoker
//             .on('mousedown', () => {
//               cardPoker.tint = 0xff0000
//               selectedPoker = data
//             })
//             .on('pointerover', () => {
//               console.log(selectedPoker)
//               cardPoker.y -= 5
//             })
//             .on('pointerout', () => {
//               cardPoker.y += 5
//             })
//           app.stage.addChild(cardPoker)
//         })
//       })
//   }

//   // function onButtonOver() {
//   //   console.log('onButtonOver')
//   //   console.log(selected)
//   // }

//   // function onButtonOut() {
//   //   console.log('onButtonOut')
//   // }

//   // function onButtonDown() {
//   //   console.log('onButtonDown')
//   // }

//   // function onButtonUp() {
//   //   console.log('onButtonUp')
//   //   console.log(selected)
//   //   hiOption.y -= 5
//   // }

//   loader.onProgress.add((loader) => {})
//   loader.onComplete.add((done) => console.log(done))
//   loader.onError.add((...args) => console.log(args))

//   useEffect(() => {
//     initial()
//   }, [])
//   return null
// }

// export default HiLowPoker
