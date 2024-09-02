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
  height: 150px;
  width: 250px;
  object-fit: contain;
`
const Main = styled.div`
  /* #app, */
  /* html, */
  /* body, */
  margin: 0px;
  font-size: 20px;
  height: 100vh;
  color: black;
  font-family: 'Kanit';
  @keyframes glow {
    from {
      box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #015c68, 0 0 30px #015c68, 0 0 40px #015c68, 0 0 50px #015c68, 0 0 60px #015c68;
    }
    to {
      box-shadow: 0 0 10px #fff, 0 0 20px #b0f0f8, 0 0 30px #b0f0f8, 0 0 40px #b0f0f8, 0 0 50px #b0f0f8, 0 0 60px #b0f0f8, 0 0 70px #b0f0f8;
    }
  }
`
const Text = styled.div`
  text-align: center;
  /* color: #ffffff; */
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
  font-size: clamp(20px, 1.5vw, 35px);
  text-transform: capitalize;
  color: black;
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
const FooterDiv = styled.div`
  text-align: right;
  font-size: 14px;
  position: fixed;
  right: 10px;
  bottom: 10px;
  /* font-family: 'Kanit'; */
  /* padding-right: 10px; */
  > a {
    font-size: 20px;
  }
  > p {
    margin: 0;
  }
`
const gameList = ['duckbetTicket', 'easyPuzzle', 'grandmaTicket', 'keeperChallenge', 'wanted', 'pirateTreasure']
export default function App() {
  return (
    <Main>
      <Text>just some games with plenty of bugs </Text>
      <ShowDiv>
        {gameList.map((game, index) => {
          return (
            <LinkEdit key={index} href={`/test/game-${game}`}>
              {/* <GameBtn> */}
              <IMG src={`../assets/${game}/logo.png`} />
              {/* {game} */}
              {/* </GameBtn> */}
            </LinkEdit>
          )
        })}
      </ShowDiv>
      <FooterDiv>
        <p>first build 2 sep 24</p>
        <p>
          get this repo on <a href='https://github.com/goddha/phaser-game-app'>github</a>
        </p>
        <p>this personal project is bug-free ( It give you plenty of bugs for free !! )</p>
      </FooterDiv>
    </Main>
    // <div style={{ margin: 0 }}>asdasd</div>
  )
}
{
  /* <Text>Next</Text>
<ShowDiv>
  <GameBtn className='upcoming'>
    <IMG src={`/assets/global/duckbetLogoWhite.png`} />
    DefuzeFrenzy
  </GameBtn>
</ShowDiv> */
}
