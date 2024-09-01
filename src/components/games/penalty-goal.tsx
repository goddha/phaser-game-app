import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

const Body = styled.div`
  background-color: black;
  height: 100vh;
  width: 100vw;
`
const ImageBG = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;
`
const MainContent = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-width: 1280px;
  height: 720px;
`
const ButtonStart = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    font-weight: bold;
    color: white;
    font-size: 80px;
    text-align: center;
    position: absolute;
  }
  > button {
    border: 0;
    background: transparent;
  }
`
const BetContent = styled.div`
  padding: 0;
  margin: 0;
  position: relative;
  /* border: red solid 10px; */
  width: 1280px;
  height: 720px;
`
const FisrtShow = styled.div`
  display: grid;
  grid-template-columns: 35% 30% 35%;
  justify-content: space-between;
  align-items: center;
`
const FisrtShowImage = styled.div`
  height: 720px;
  position: relative;
`
export default function PanaltyGoalGame() {
  const [stage, setStage] = useState(1)
  let moneyChoice = [5, 20, 50, 100]
  const [money] = useState<number>(100)
  const [moneyBet, setMoneyBet] = useState<number>(0)
  const [positionBet, setPositionBet] = useState(0)

  const nextStage = (to: number) => {
    console.log({ to })
    if (to === 3) {
      if (!(moneyBet > 0)) {
        alert('error money bet')
        return
      }
      if (moneyBet > money) {
        alert('error bet too high')
        return
      }
      if (positionBet <= 0) {
        alert('error positionBet')
        return
      }
    }
    setStage(to)
  }
  const firstPage = (
    <div>
      <FisrtShow>
        <FisrtShowImage>
          <Image
            src='/image/penalty/start_keeper.png'
            // layout='fixed'
            // width={280}
            // height={680}
            layout='fill'
            objectFit='contain'
            objectPosition='left bottom'
          />
        </FisrtShowImage>
        <FisrtShowImage>
          <div
            style={{
              display: 'grid',
              height: 720,
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: 10,
            }}>
            <img src='/image/penalty/logo.png' style={{ width: 600 }} />
            {/* <Image
              src='/image/penalty/logo.png'
              layout='fill'
              objectFit='contain'
              objectPosition='50% top'
            /> */}
            {/* <ButtonStart onClick={() => nextStage(2)}> */}
            <ButtonStart>
              <button onClick={() => nextStage(2)}>
                <img
                  src='/image/penalty/button_round_red.png'
                  style={{ width: 400 }}
                />
                {/* <ButtonStartText>start</ButtonStartText> */}
              </button>
              <div>เริ่มเกม</div>
            </ButtonStart>
            {/* </div> */}
          </div>
        </FisrtShowImage>
        <FisrtShowImage>
          <Image
            src='/image/penalty/start_taker.png'
            layout='fill'
            objectFit='contain'
            objectPosition='right bottom'
          />
        </FisrtShowImage>
        {/* </div> */}
      </FisrtShow>
    </div>
  )
  const thirdPage = (
    <>
      <button onClick={() => nextStage(2)}>to 2</button>
    </>
  )
  const secondPage = (
    <>
      <div>money is {money}</div>
      choose money to bet
      <div>
        {moneyChoice.map((betPrice, index) => {
          return (
            <button key={index} onClick={() => setMoneyBet(betPrice)}>
              {' '}
              {betPrice} thb{' '}
            </button>
          )
        })}
      </div>
      <div>
        moneyBet :{' '}
        <input
          type='number'
          value={moneyBet}
          onChange={(e) => setMoneyBet(parseInt(e.target.value))}
        />{' '}
        thb
      </div>
      current position for keeper : {positionBet}
      <div>
        <button onClick={() => setPositionBet(1)}>1</button>
        <button onClick={() => setPositionBet(2)}>2</button>
        <button onClick={() => setPositionBet(3)}>3</button>
        <button onClick={() => setPositionBet(4)}>4</button>
        <button onClick={() => setPositionBet(5)}>5</button>
        <button onClick={() => setPositionBet(6)}>6</button>
      </div>
      <button onClick={() => nextStage(3)}>to 3</button>
    </>
  )
  return (
    <Body>
      <MainContent>
        <ImageBG>
          <Image
            src='/image/penalty/field.jpg'
            alt='Picture of the author'
            height={720}
            width={1280}
          />
        </ImageBG>
        <BetContent>
          {stage === 2 ? secondPage : stage === 3 ? thirdPage : firstPage}
        </BetContent>
      </MainContent>
    </Body>
  )
  //  {
  //   if (stage===2) {
  //     return (secondPage)
  //   }else if (stage===3){
  //     return (thirdPage)
  //   }else{
  //     return (firstPage)
  //   }
  //  }
}
