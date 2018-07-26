import React, { Component } from 'react'
import './App.css'
import Color from 'color'
import styled, { injectGlobal } from 'styled-components'

const errorColor = 'transparent'

const MainWrapper = styled.div`
  color: ${props => {
    const givenColor = isValidHex(props.color) ? props.color : errorColor
    console.log(givenColor)
    return Color(givenColor).mix(Color('black'), 0.5).string()
  }};
`

const ColorBlocksRow = styled.div`
  display: flex;
`

const InputsRow = styled.div`
  display: flex;
  margin-bottom: 64px;
`

const ColorBlock = styled.div`
  height: 72px;
  width: ${props => props.wide ? 192 : 72}px;
  ${props => !props.hasValidColor && 'box-shadow: inset 0 0 0 2px #ddd'};
`

const Input = styled.input`
  color: inherit;
  font-size: 72px;
  padding: 0;
  border: 0;
  width: ${props => props.width}px;

  &:focus {
    outline: none;
  }
`

const isValidHex = (color) => {
  if (!color || typeof color !== 'string') return false

  if (color.substring(0, 1) === '#') color = color.substring(1)

  switch (color.length) {
    case 3: return /^[0-9A-F]{3}$/i.test(color)
    case 6: return /^[0-9A-F]{6}$/i.test(color)
    case 8: return /^[0-9A-F]{8}$/i.test(color)
    default: return false
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      darkColorsAmount: 3,
      darkestAmount: 50,

      mainColor: '#CAA119',

      lightColorsAmount: 4,
      lightestAmount: 80
    }
    this.handleDarkColorsAmountChange = this.handleDarkColorsAmountChange.bind(this)
    this.handleDarkestAmountChange = this.handleDarkestAmountChange.bind(this)

    this.handleMainColorChange = this.handleMainColorChange.bind(this)

    this.handleLightColorsAmountChange = this.handleLightColorsAmountChange.bind(this)
    this.handleLightestAmountChange = this.handleLightestAmountChange.bind(this)
  }

  handleMainColorChange (e) {
    this.setState({
      mainColor: e.target.value
    })
  }

  handleLightColorsAmountChange (e) {
    this.setState({
      lightColorsAmount: e.target.value
    })
  }

  handleLightestAmountChange (e) {
    this.setState({
      lightestAmount: e.target.value
    })
  }

  handleDarkColorsAmountChange (e) {
    this.setState({
      darkColorsAmount: e.target.value
    })
  }

  handleDarkestAmountChange (e) {
    this.setState({
      darkestAmount: e.target.value
    })
  }

  lightColorsList () {
    const colorsList = []
    const givenColor = isValidHex(this.state.mainColor) ? this.state.mainColor : errorColor

    let step
    for (step = 0; step < this.state.lightColorsAmount; step++) {
      if (isValidHex(this.state.mainColor)) {
        colorsList.push(Color(givenColor).mix(Color('white'), (this.state.lightestAmount / 100) * (step + 1) / this.state.lightColorsAmount).string())
      } else {
        colorsList.push(errorColor)
      }
    }

    return colorsList
  }

  darkColorsList () {
    const colorsList = []
    const givenColor = isValidHex(this.state.mainColor) ? this.state.mainColor : errorColor

    let step
    for (step = 0; step < this.state.darkColorsAmount; step++) {
      if (isValidHex(this.state.mainColor)) {
        colorsList.push(Color(givenColor).mix(Color('black'), (this.state.darkestAmount / 100) * (step + 1) / this.state.darkColorsAmount).string())
      } else {
        colorsList.push(errorColor)
      }
    }

    return colorsList.reverse()
  }

  render () {
    return (
      <MainWrapper color={this.state.mainColor}>
        <InputsRow>
          <Input width={72} value={this.state.darkColorsAmount} onChange={this.handleDarkColorsAmountChange} type='number' />
          <Input width={128} value={this.state.darkestAmount} onChange={this.handleDarkestAmountChange} type='number' />

          <Input width={370} value={this.state.mainColor} onChange={this.handleMainColorChange} />

          <Input width={72} value={this.state.lightColorsAmount} onChange={this.handleLightColorsAmountChange} type='number' />
          <Input width={128} value={this.state.lightestAmount} onChange={this.handleLightestAmountChange} type='number' />
        </InputsRow>

        <ColorBlocksRow>
          {this.darkColorsList().map((color, index) => (
            <ColorBlock style={{ background: color }} hasValidColor={isValidHex(this.state.mainColor)} />
          ))}

          <ColorBlock
            wide
            style={{ background: isValidHex(this.state.mainColor) ? this.state.mainColor : errorColor }}
            hasValidColor={isValidHex(this.state.mainColor)} />

          {this.lightColorsList().map((color, index) => (
            <ColorBlock style={{ background: color }} hasValidColor={isValidHex(this.state.mainColor)} />
          ))}
        </ColorBlocksRow>
      </MainWrapper>
    )
  }
}

export default App
