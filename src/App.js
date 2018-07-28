import React, { Component } from 'react'
import './App.css'
import Color from 'color'
import styled from 'styled-components'

const errorColor = 'transparent'

const MainWrapper = styled.div`
  color: ${props => {
    const givenColor = isValidHex(props.color) ? props.color : errorColor
    return Color(givenColor).mix(Color('black'), 0.3).string()
  }};
  padding: 40px 128px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  & > *::selection {
    background: ${props => {
    const givenColor = isValidHex(props.color) ? props.color : errorColor
    return Color(givenColor).mix(Color('white'), 0.8).string()
  }};
  }
`

const ColorsSection = styled.div`
  width: 100%;
`

const TopSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const FooterSection = styled.div`
  a {
    color: inherit;
  }
`

const ColorBlocksRow = styled.div`
  display: flex;
  width: 100%;
`

const InputsRow = styled.div`
  display: flex;
  margin-bottom: 64px;
  width: 100%;

  & > * {
    margin-right: 24px;
  }
`

const InputSeparator = styled.div`
  color: inherit;
  font-size: 72px;
  line-height: 1;
  opacity: 0.4;
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

const numberToHex = (number) => '#' + number

const InputWrapper = styled.div`
  position: relative;
  width: auto;
  height: 100%;
`

const DynamicInputField = styled.input`
  color: inherit;
  font-size: 72px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1;
  padding: 0;
  border: 0;
  width: 100%;
  margin-right: 16px;
  position: absolute;
  top: 0;
  height: 100%;
  background-color: transparent;

  &:focus {
    outline: none;
  }

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &::selection {
    background: ${props => {
    const givenColor = isValidHex(props.color) ? props.color : '#666'
    return Color(givenColor).mix(Color('white'), 0.8).string()
  }};
  }
`

const DynamicInputValue = styled.div`
  font-size: 72px;
  font-weight: inherit;
  line-height: 1;
  opacity: 1;
  height: 1px;
  overflow: hidden;
`

const DynamicInputPrefix = styled.div`
  font-size: 72px;
  line-height: 1;
  opacity: 0.4;
  left: 0;
  top: 0;
  height: 100%;
`

const DynamicInputSufix = styled.div`
  font-size: 72px;
  line-height: 1;
  opacity: 0.4;
  right: 0;
  position: absolute;
  top: 0;
  height: 100%;
`

const DynamicInputRoot = styled.div`
  display: flex;
`

const ColorBlockWrapper = styled.div`
`

const ColorBlockCode = styled.div`
  position: absolute;
  top: 100%;
  padding-top: 8px;
  padding-bottom: 16px;
  transition: .2s;
`

const ColorBlockContainer = styled.div`
  position: relative;
  height: 72px;
  max-width: ${props => props.wide ? 192 : 72}px;
  width: 100%;
  ${props => !props.hasValidColor && 'box-shadow: inset 0 0 0 2px #ddd'};
  flex-shrink: 1;

  &:not(:hover) .ColorBlockCode {
    opacity: 0;
    transition: .6s;
  }
`

const ColorBlock = ({ wide, hasValidColor, color, ...rest }) => (
  <ColorBlockContainer wide={wide} hasValidColor={hasValidColor} {...rest}>
    <ColorBlockWrapper {...rest} />

    <ColorBlockCode className='ColorBlockCode'>
      {hasValidColor ? Color(color).hex() : null}
    </ColorBlockCode>
  </ColorBlockContainer>
)

const DynamicInput = ({ value, onChange, color, prefix, sufix, ...rest }) => {
  return (
    <DynamicInputRoot>
      <DynamicInputPrefix>
        {prefix}
      </DynamicInputPrefix>
      <InputWrapper color={color}>
        <DynamicInputField color={color} value={value} onChange={onChange} {...rest} />
        <DynamicInputValue>
          {value}{sufix}
        </DynamicInputValue>
        <DynamicInputSufix>
          {sufix}
        </DynamicInputSufix>
      </InputWrapper>
    </DynamicInputRoot>
  )
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      darkColorsAmount: 4,
      darkestAmount: 50,

      mainColor: '1D9A6C',

      lightColorsAmount: 6,
      lightestAmount: 80
    }
    this.handleDarkColorsAmountChange = this.handleDarkColorsAmountChange.bind(this)
    this.handleDarkestAmountChange = this.handleDarkestAmountChange.bind(this)

    this.handleMainColorChange = this.handleMainColorChange.bind(this)
    this.handleMainColorBlur = this.handleMainColorBlur.bind(this)

    this.handleLightColorsAmountChange = this.handleLightColorsAmountChange.bind(this)
    this.handleLightestAmountChange = this.handleLightestAmountChange.bind(this)

    this.handleDarkColorsAmountBlur = this.handleDarkColorsAmountBlur.bind(this)
    this.handleDarkestAmountBlur = this.handleDarkestAmountBlur.bind(this)
    this.handleLightColorsAmountBlur = this.handleLightColorsAmountBlur.bind(this)
    this.handleLightestAmountBlur = this.handleLightestAmountBlur.bind(this)
  }

  handleMainColorChange (e) {
    let typedColorFiltered
    const typedColor = e.target.value

    if (typedColor[0] === '#') {
      typedColorFiltered = typedColor.substr(1, typedColor.length)
    } else {
      typedColorFiltered = typedColor
    }

    this.setState({
      mainColor: typedColorFiltered
    })
  }

  handleMainColorBlur (e) {
    if (!e.target.value) {
      this.setState({
        mainColor: '666'
      })
    }
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

  handleDarkColorsAmountBlur (e) {
    if (!e.target.value) {
      this.setState({
        darkColorsAmount: 0
      })
    }
  }

  handleDarkestAmountBlur (e) {
    if (!e.target.value) {
      this.setState({
        darkestAmount: 0
      })
    }
  }

  handleLightColorsAmountBlur (e) {
    if (!e.target.value) {
      this.setState({
        lightColorsAmount: 0
      })
    }
  }

  handleLightestAmountBlur (e) {
    if (!e.target.value) {
      this.setState({
        lightestAmount: 0
      })
    }
  }

  getColorsList (colorsAmount, colorsShiftAmount, mixColor) {
    const colorsList = []
    const givenColor = isValidHex(numberToHex(this.state.mainColor)) ? numberToHex(this.state.mainColor) : errorColor

    let step
    for (step = 0; step < colorsAmount; step++) {
      if (isValidHex(numberToHex(this.state.mainColor))) {
        colorsList.push(Color(givenColor).mix(Color(mixColor), (colorsShiftAmount / 100) * (step + 1) / colorsAmount).string())
      } else {
        colorsList.push(errorColor)
      }
    }

    return colorsList
  }

  render () {
    return (
      <MainWrapper color={numberToHex(this.state.mainColor)}>
        <TopSection>
          <ColorsSection>
            <InputsRow>
              <DynamicInput color={numberToHex(this.state.mainColor)} value={this.state.darkColorsAmount} onChange={this.handleDarkColorsAmountChange} type='number' min={0} onBlur={this.handleDarkColorsAmountBlur} />
              <DynamicInput color={numberToHex(this.state.mainColor)} value={this.state.darkestAmount} onChange={this.handleDarkestAmountChange} type='number' sufix='%' min={0} max={99} onBlur={this.handleDarkestAmountBlur} />

              <InputSeparator>·</InputSeparator>

              <DynamicInput color={numberToHex(this.state.mainColor)} value={this.state.mainColor} onChange={this.handleMainColorChange} onBlur={this.handleMainColorBlur} prefix='#' />

              <InputSeparator>·</InputSeparator>

              <DynamicInput color={numberToHex(this.state.mainColor)} value={this.state.lightColorsAmount} onChange={this.handleLightColorsAmountChange} min={0} onBlur={this.handleLightColorsAmountBlur} type='number' />
              <DynamicInput color={numberToHex(this.state.mainColor)} value={this.state.lightestAmount} onChange={this.handleLightestAmountChange} onBlur={this.handleLightestAmountBlur} min={0} max={99} type='number' sufix='%' />
            </InputsRow>

            <ColorBlocksRow>
              {this.getColorsList(this.state.darkColorsAmount, this.state.darkestAmount, 'black').reverse().map((color, index) => (
                <ColorBlock style={{ background: color }} hasValidColor={isValidHex(numberToHex(this.state.mainColor))} color={color} key={index} />
              ))}

              <ColorBlock
                wide
                style={{ background: isValidHex(numberToHex(this.state.mainColor)) ? numberToHex(this.state.mainColor) : errorColor }}
                hasValidColor={isValidHex(numberToHex(this.state.mainColor))}
                color={numberToHex(this.state.mainColor)}
              />

              {this.getColorsList(this.state.lightColorsAmount, this.state.lightestAmount, 'white').map((color, index) => (
                <ColorBlock style={{ background: color }} hasValidColor={isValidHex(numberToHex(this.state.mainColor))} color={color} key={index} />
              ))}
            </ColorBlocksRow>
          </ColorsSection>
        </TopSection>

        <FooterSection>
          Scale &nbsp; · &nbsp; made by <a href='http://hihayk.com' target='_blank' rel='noopener noreferrer'>Hayk</a>
        </FooterSection>
      </MainWrapper>
    )
  }
}

export default App
