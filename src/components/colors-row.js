import React from 'react'
import styled from "styled-components"
import ColorBlock from './color-block'
import { isValidHex, numberToHex, errorColor } from '../utils'
import Color from 'color'

const ColorBlocksRow = styled.div`
  display: flex;
  width: 100%;
  ${props => props.disabled && `pointer-events: none`};
`

const getColorsList = (colorsAmount, colorsShiftAmount, mixColor, rotate, saturation, mainColor) => {
  const colorsList = []
  const givenColor = isValidHex(numberToHex(mainColor)) ? numberToHex(mainColor) : errorColor

  let step
  for (step = 0; step < colorsAmount; step++) {
    if (isValidHex(numberToHex(mainColor))) {
      colorsList.push(Color(givenColor).rotate((step + 1) / colorsAmount * -rotate).saturate((step + 1) / colorsAmount * (saturation / 100)).mix(Color(mixColor), (colorsShiftAmount / 100) * (step + 1) / colorsAmount).string())
    } else {
      colorsList.push(errorColor)
    }
  }

  return colorsList
}

const ColorsRow = ({
  darkColorsAmount,
  darkestAmount,
  darkColorsMixRotate,
  lightColorsAmount,
  lightestAmount,
  lightColorsMixRotate,
  mainColor,
  lightSaturation,
  darkSaturation
}) => {
  return(
  <ColorBlocksRow style={{marginBottom: 88}}>
    {getColorsList(darkColorsAmount, darkestAmount, 'black', darkColorsMixRotate, darkSaturation, mainColor).reverse().map((color, index) => (
      <ColorBlock style={{ background: color }} hasValidColor={isValidHex(numberToHex(mainColor))} color={color} key={index} />
    ))}

    <ColorBlock
      wide
      style={{ background: isValidHex(numberToHex(mainColor)) ? numberToHex(mainColor) : errorColor }}
      hasValidColor={isValidHex(numberToHex(mainColor))}
      color={numberToHex(mainColor)}
    />

    {getColorsList(lightColorsAmount, lightestAmount, 'white', lightColorsMixRotate, lightSaturation, mainColor).map((color, index) => (
      <ColorBlock style={{ background: color }} hasValidColor={isValidHex(numberToHex(mainColor))} color={color} key={index} />
    ))}
  </ColorBlocksRow>
)}

export default ColorsRow