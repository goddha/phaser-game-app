import styled, { createGlobalStyle, keyframes } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
 html {
      box-sizing: border-box;
      font-size: 10px;
   }
   *, *:before, *:after {
      box-sizing: inherit;
   }
   body {
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
    font-size: 14px;
    line-height: 1.43;
    color: #484848;
    background-color: #fff;
    margin: 0;
   }
`

export const Logo = styled.div`
  color: ${(props) => props.theme.colors.lighterGrey};
  cursor: pointer;
  @media ${(props) => props.theme.size.lg} {
    width: 15%;
  }
  @media ${(props) => props.theme.size.md} {
    width: 10%;
  }
  @media ${(props) => props.theme.size.sm} {
    display: flex;
    justify-content: flex-start;
  }
`

export const theme = {
  colors: {
    black: '#212121',
    white: '#fff',
    lightGrey: '#BDBDBD',
    lighterGrey: '#e0e0e0',
    teal: '#009688',
    darkTeal: '#00796B',
    fbBlue: '#466ab5',
    fbDarkBlue: '#3b5998',
    Red: '#FF5252',
    DarkRed: '#D32F2F',
  },
  fontColors: {
    primary: '#212121',
    secondary: '#757575',
    hover: '#009688',
  },
  backgroundColors: {
    main: '#009688',
  },
  radius: '4px',
  size: {
    sm: '(max-width: 600px)',
    md: '(max-width: 960px)',
    lg: '(max-width: 1025px)',
    xl: '(min-width: 1026px)',
  },
  width: '1000px',
  transition: '0.35s',
}

export const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
