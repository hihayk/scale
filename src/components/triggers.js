import React from 'react'
import styled from 'styled-components'
import Button from './button'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Color from 'color'
import { numberToHex } from '../utils.js'

const Title = styled.div`
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  margin-bottom: 16px;
  min-height: 32px;
`

const ButtonsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  & > * {
    margin-right: 4px;
    
    @media (max-width: 720px) {
      margin-top: 4px;
    }
  }
`

const getSvg = (darkColors, mainColor, lightColors) => {
  const svgWidth = darkColors.length * 72 + 192 + lightColors.length * 72
  const darkRects = darkColors.map((color, index) => (
    `<rect x="${72 * index}" width="72" height="72" fill="${color}"/>`
  ))
  const mainRect = `<rect x="${darkColors.length * 72}" width="192" height="72" fill="${numberToHex(mainColor)}"/>`
  const lightRects = lightColors.map((color, index) => (
    `<rect x="${72 * index + 192 + darkColors.length * 72}" width="72" height="72" fill="${color}"/>`
  ))
  
  return `<svg width="${svgWidth}" height="72" viewBox="0 0 ${svgWidth} 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    ${darkRects.join(``)}
    ${mainRect}
    ${lightRects.join(``)}
  </svg>`
}

const getColorsListText = (darkColors, mainColor, lightColors) => {
  const darks = darkColors.map((color) => Color(color).hex())
  const lights = lightColors.map((color) => Color(color).hex())
  
  return `${darks.join(`
`)}
${numberToHex(mainColor)}
${lights.join(`
`)}`
}

const randomNumber = (min, max) => {  
  return Math.floor(Math.random() * (max - min) + min)
}

const Triggers = ({
  darkColors,
  mainColor,
  lightColors,
  setR,
  setG,
  setB,
  setDarkColorsAmount,
  setDarkestAmount,
  setDarkColorsMixRotate,
  setLightColorsAmount,
  setLightestAmount,
  setLightColorsMixRotate,
  setLightSaturation,
  setDarkSaturation,
  rgbToMainColor,
}) => {
  const randomState = () => {
    setR(randomNumber(0, 255))
    setG(randomNumber(0, 255))
    setB(randomNumber(0, 255))

    setDarkColorsAmount(randomNumber(2, 8))
    setLightColorsAmount(randomNumber(2, 8))
    
    setDarkestAmount(randomNumber(40, 80))
    setLightestAmount(randomNumber(40, 80))
    
    setLightSaturation(randomNumber(0, 25))
    setDarkSaturation(randomNumber(0, 55))
    
    setDarkColorsMixRotate(randomNumber(0, 70))
    setLightColorsMixRotate(randomNumber(0, 70))
    rgbToMainColor()
  }
  
  const randomColor = () => {
    setR(randomNumber(0, 255))
    setG(randomNumber(0, 255))
    setB(randomNumber(0, 255))
    rgbToMainColor()
  }

  return (
    <React.Fragment>
      <Title>Triggers</Title>

      <ButtonsRow>
        <CopyToClipboard
          text={getSvg(darkColors, mainColor, lightColors)}
        >
          <Button>Copy SVG</Button>
        </CopyToClipboard>
        
        <CopyToClipboard
          text={getColorsListText(darkColors, mainColor, lightColors)}
        >
          <Button>Copy colors</Button>
        </CopyToClipboard>

        <Button onClick={() => randomState()}>Randomize all</Button>
        <Button onClick={() => randomColor()}>Randomize color</Button>
      </ButtonsRow>
    </React.Fragment>
  )
}

export default Triggers