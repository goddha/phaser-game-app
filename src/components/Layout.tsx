import React from 'react'
import Head from 'next/head'
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from '../styles/styled'
import { useRouter } from 'next/router'

const StyledPage = styled.div`
  background: white;
  color: ${(props) => props.theme.fontColors.primary};
`

const Container = styled.div`
  width: 100%;
  canvas {
    height: auto;
    width: 100%;
  }
`

const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledPage>
        <Head>
          <title>{pathname === '/' ? 'DUCKGAME' : pathname.split('/')[1].toUpperCase()}</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link href='https://fonts.googleapis.com/css2?family=Kanit:wght@200;500;700&display=swap' rel='stylesheet' />
        </Head>
        <Container id='root'>{children}</Container>
      </StyledPage>
    </ThemeProvider>
  )
}
export default Layout
