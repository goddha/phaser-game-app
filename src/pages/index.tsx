// import dynamic from 'next/dynamic'
import Link from 'next/link'
import styled from 'styled-components'

const LinkEdit = styled(Link)`
  display: block;
  :hover {
    animation: glow 0.5s ease-in-out infinite alternate;
  }
`
const IMG = styled.img`
  margin: 20px;
  max-width: 300px;
  min-height: 150px;
  object-fit: contain;
`
const Main = styled.div`
  html,
  body,
  #app {
    margin: 0px;
    padding: 0px;
  }
  ,
  #app > div {
    /* height: 100%; */
  }
  background-color: black;
  /* min-height: 100vh; */
  /* min-width: 100vw; */
  font-size: 30px;
  font-family: 'Kanit';
`
const Text = styled.div`
  text-align: center;
  color: #ffffff;
  padding: 5px;
`
const ShowDiv = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .upcoming {
    outline: none;
    background: linear-gradient(270deg, #0392a5, #015c68);
    background-size: 400% 400%;
    animation: gradient 1.5s ease-in-out infinite;
    @keyframes gradient {
      0% {
        background-position: 0% 26%;
      }
      50% {
        background-position: 100% 5%;
      }
      100% {
        background-position: 0% 26%;
      }
    }
    :hover {
      cursor: default;
      /* animation: gradient 1.5s ease-in-out infinite; */
      animation: none;
    }
  }
`
const GameBtn = styled.div`
  @keyframes glow {
    from {
      box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #015c68, 0 0 30px #015c68, 0 0 40px #015c68, 0 0 50px #015c68, 0 0 60px #015c68;
    }
    to {
      box-shadow: 0 0 10px #fff, 0 0 20px #b0f0f8, 0 0 30px #b0f0f8, 0 0 40px #b0f0f8, 0 0 50px #b0f0f8, 0 0 60px #b0f0f8, 0 0 70px #b0f0f8;
    }
  }
  font-size: clamp(20px, 1.5vw, 35px);
  text-transform: capitalize;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  padding-bottom: 30px;
  outline: 1px outset #a7eff8;
  width: 350px;
  height: 300px;
  box-shadow: 1px -1px 5px 1px #a7eff8;
`
const gameList = ['duckbetTicket', 'easyPuzzle', 'grandmaTicket', 'keeperChallenge', 'wanted', 'pirateTreasure']
export default function App() {
  return (
    <Main>
      <Text>Ready</Text>
      <ShowDiv>
        {gameList.map((game, index) => {
          return (
            <LinkEdit key={index} href={`/test/game-${game}`}>
              <GameBtn>
                <IMG src={`../assets/${game}/logo.png`} />
                {game}
              </GameBtn>
            </LinkEdit>
          )
        })}
      </ShowDiv>
      <Text>Next</Text>
      <ShowDiv>
        <GameBtn className='upcoming'>
          <IMG src={`/assets/global/duckbetLogoWhite.png`} />
          DefuzeFrenzy
        </GameBtn>
      </ShowDiv>
    </Main>
  )
}
