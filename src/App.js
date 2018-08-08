import React, { Component } from 'react'
import './App.css'
import Color from 'color'
import styled, { css, keyframes } from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const errorColor = 'transparent'

const MainWrapper = styled.div`
  color: ${props => {
    const givenColor = isValidHex(props.color) ? props.color : errorColor
    return Color(givenColor).mix(Color('black'), 0.3).string()
  }};
  padding: 40px 96px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 720px) {
    padding: 32px;
    min-height: calc(100vh - 40px);
  }
`

const sliderThumbStyles = css`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: #666;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -4px;
`

const sliderTrackStyles = css`
  width: 100%;
  height: 2px;
  cursor: pointer;
  animate: 0.2s;
  background: #D8D8D8;
  border-radius: 2px;
`

const Slider = styled.input`
  width: 96px;
  height: 12px;
  -webkit-appearance: none;
  margin: 0;
  display: block;
  cursor: pointer;
  margin-top: 8px;
  margin-bottom: 8px;

  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    ${sliderTrackStyles}
  }
  &::-webkit-slider-thumb {
    ${sliderThumbStyles}
  }
  &:focus::-webkit-slider-runnable-track {
    background: #aaa;
  }
  &::-moz-range-track {
    ${sliderTrackStyles}
  }
  &::-moz-range-thumb {
    ${sliderThumbStyles}
  }
  &::-ms-track {
    ${sliderTrackStyles}
  }
  &::-ms-fill-lower {
    background: #D8D8D8;
    border-radius: 2px;
  }
  &::-ms-fill-upper {
    background: #D8D8D8;
    border-radius: 2px;
  }
  &::-ms-thumb {
    ${sliderThumbStyles}
  }
  &:focus::-ms-fill-lower {
    background: #D8D8D8;
  }
  &:focus::-ms-fill-upper {
    background: #D8D8D8;
  }
`

const SliderLabel = styled.div`
  margin-right: 12px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  position: relative;
  top: 2px;
`

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
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

  h1 {
    font-size: inherit;
    line-height: inherit;
    font-weight: normal;
    display: inline-block;
  }
`

const ColorBlocksRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 88px;
`

const InputsRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 64px;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`

const InputsRowItem = styled.div`
  margin-right: 48px;
  width: ${props => props.wide ? 192 : 96}px;
  flex-shrink: 0;
`

const InputsRowItemSeparataor = styled.div`
  margin-right: 48px;
  display: block;
  width: 1px;
  background-color: red;
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
const hexToNumber = (number) => number.substr(1, number.length)

const InputWrapper = styled.div`
  position: relative;
  width: auto;
  height: 100%;
`

const DynamicInputField = styled.input`
  color: inherit;
  font-size: 40px;
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
  appearance: textfield;
  margin: 0;
  ${props => props.isDisabled && `
    user-select: none;
    opacity: 0.4;
  `};

  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::-moz-selection {
    background: ${props => isValidHex(props.color) ? Color(props.color).mix(Color('white'), 0.8).string() : '#666'};
  }

  &::selection {
    background: ${props => isValidHex(props.color) ? Color(props.color).mix(Color('white'), 0.8).string() : '#666'};
  }
`

const DynamicInputValue = styled.div`
  font-size: 40px;
  font-weight: inherit;
  line-height: 1;
  opacity: 0;
  transform: translateY(236px) scale(0);
`

const DynamicInputLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  margin-bottom: 16px;
  min-height: 32px;
`

const DynamicInputRoot = styled.div`
  display: flex;
  margin-bottom: 16px;
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
  ${props => props.wide && 'min-width: 192px'};
  width: 100%;
  ${props => !props.hasValidColor && 'box-shadow: inset 0 0 0 2px #ddd'};
  flex-shrink: 1;
  cursor: pointer;

  &:not(:hover) .ColorBlockCode {
    opacity: 0;
    transition: .6s;
  }

  @media (max-width: 720px) {
    ${props => props.wide && 'min-width: 144px'};
  }
`

const copyAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  30% {
    opacity: 0.5;
  }
  70% {
    transform: translateY(0);
    opacity: 0.3;
  }
  100% {
    opacity: 0;
  }
`

const CopiedText = styled.div`
  animation: ${copyAnimation} 0.8s;
  opacity: 0;
`

class ColorBlock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      copied: false
    }
    this.handleCopied = this.handleCopied.bind(this)
  }

  handleCopied () {
    this.setState({
      copied: true
    })
    this.delayCopyFalseState()
  }

  delayCopyFalseState () {
    setTimeout(() => {
      this.setState({
        copied: false
      })
    }, 800)
  }

  render () {
    const { wide, hasValidColor, color, ...rest } = this.props

    return (
      <CopyToClipboard text={hasValidColor ? Color(color).hex() : null}>
        <ColorBlockContainer wide={wide} hasValidColor={hasValidColor} {...rest} onClick={this.handleCopied}>
          <ColorBlockWrapper {...rest} />

          <ColorBlockCode className='ColorBlockCode'>
            {hasValidColor ? Color(color).hex() : null}
            {this.state.copied && (
              <CopiedText copied={this.state.copied}>
                {Color(color).hex()}
              </CopiedText>
            )}
          </ColorBlockCode>
        </ColorBlockContainer>
      </CopyToClipboard>
    )
  }
}

const DynamicInput = ({ value, onChange, color, prefix, sufix, withSlider, withRgbSlider, label, min, max, ...rest }) => {
  return (
    <div>
      <DynamicInputLabel>
        {label}
      </DynamicInputLabel>

      <DynamicInputRoot>
        <InputWrapper color={color}>
          <DynamicInputField color={color} value={prefix} type='text' readOnly isDisabled tabIndex={-1} />
          <DynamicInputValue>
            {prefix}
          </DynamicInputValue>
        </InputWrapper>

        <InputWrapper color={color}>
          <DynamicInputField color={color} value={value} onChange={onChange} {...rest} min={min} max={max} />
          <DynamicInputValue>
            {value}
          </DynamicInputValue>
        </InputWrapper>

        <InputWrapper color={color}>
          <DynamicInputField color={color} value={sufix} type='text' readOnly isDisabled tabIndex={-1} />
          <DynamicInputValue>
            {sufix}
          </DynamicInputValue>
        </InputWrapper>
      </DynamicInputRoot>

      {withSlider && (
        <Slider type='range' color={color} value={value} onChange={onChange} min={min} max={max}  />
      )}
    </div>
  )
}

const initialColor = '1D9A6C'

class App extends Component {
  constructor (props) {
    super(props)
    const defaultState = {
      darkColorsAmount: 4,
      darkestAmount: 50,
      darkColorsMixRotate: -51,

      mainColor: initialColor,
      r: Color(numberToHex(initialColor)).rgb().red(),
      g: Color(numberToHex(initialColor)).rgb().green(),
      b: Color(numberToHex(initialColor)).rgb().blue(),

      lightColorsAmount: 6,
      lightestAmount: 80,
      lightColorsMixRotate: 67,

      lightSaturation: 0,
      darkSaturation: 0
    }
    const hashState = this.getHashObject()

    this.state = hashState || defaultState

    this.handleDarkColorsAmountChange = this.handleDarkColorsAmountChange.bind(this)
    this.handleDarkestAmountChange = this.handleDarkestAmountChange.bind(this)
    this.handleDarkColorsMixRotate = this.handleDarkColorsMixRotate.bind(this)

    this.handleMainColorChange = this.handleMainColorChange.bind(this)
    this.handleMainColorBlur = this.handleMainColorBlurhandleMainColorBlur.bind(this)

    this.handleLightColorsAmountChange = this.handleLightColorsAmountChange.bind(this)
    this.handleLightestAmountChange = this.handleLightestAmountChange.bind(this)
    this.handleLightColorsMixRotate = this.handleLightColorsMixRotate.bind(this)

    this.handleDarkColorsAmountBlur = this.handleDarkColorsAmountBlur.bind(this)
    this.handleDarkestAmountBlur = this.handleDarkestAmountBlur.bind(this)
    this.handleLightColorsAmountBlur = this.handleLightColorsAmountBlur.bind(this)
    this.handleLightestAmountBlur = this.handleLightestAmountBlur.bind(this)
    this.handleLightColorsMixRotateBlur = this.handleLightColorsMixRotateBlur.bind(this)
    this.handleDarkColorsMixRotateBlur = this.handleDarkColorsMixRotateBlur.bind(this)

    this.handleRChange = this.handleRChange.bind(this)
    this.handleGChange = this.handleGChange.bind(this)
    this.handleBChange = this.handleBChange.bind(this)
    
    this.handleLightSaturationChange = this.handleLightSaturationChange.bind(this)
    this.handleDarkSaturationChange = this.handleDarkSaturationChange.bind(this)
    
    this.handleLightSaturationBlur = this.handleLightSaturationBlur.bind(this)
    this.handleDarkSaturationBlur = this.handleDarkSaturationBlur.bind(this)
  }

  componentDidUpdate () {
    this.updateHash()
    this.updateThemeColor()
  }

  componentDidMount () {
    this.updateThemeColor()
  }

  updateThemeColor () {
    document.getElementById('themeMetaTag').setAttribute('content', numberToHex(this.state.mainColor))
  }

  updateHash () {
    window.location.hash = encodeURI(JSON.stringify(this.state))
  }

  getHash () {
    const hash = decodeURI(window.location.hash)

    if (hash) {
      return hash.substr(1, hash.length)
    }

    return null
  }

  getHashObject () {
    return JSON.parse(this.getHash())
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

    this.updateRgbWithMainColor(typedColorFiltered)
  }

  handleMainColorBlurhandleMainColorBlur (e) {
    if (!e.target.value) {
      this.setState({
        mainColor: 666
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

  handleLightColorsMixRotate (e) {
    this.setState({
      lightColorsMixRotate: e.target.value
    })
  }

  handleDarkColorsMixRotate (e) {
    this.setState({
      darkColorsMixRotate: e.target.value
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

  handleLightColorsMixRotateBlur (e) {
    if (!e.target.value) {
      this.setState({
        lightColorsMixRotate: 0
      })
    }
  }

  handleDarkColorsMixRotateBlur (e) {
    if (!e.target.value) {
      this.setState({
        darkColorsMixRotate: 0
      })
    }
  }

  handleLightSaturationBlur (e) {
    if (!e.target.value) {
      this.setState({
        lightSaturation: 0
      })
    }
  }

  handleDarkSaturationBlur (e) {
    if (!e.target.value) {
      this.setState({
        darkSaturation: 0
      })
    }
  }

  rgbToMainColor () {
    setTimeout(() => {
      this.setState({
        mainColor: hexToNumber(Color(`rgb(${this.state.r}, ${this.state.g}, ${this.state.b})`).hex())
      })
    }, 0)
  }

  updateRgbWithMainColor (color) {
    if (isValidHex(numberToHex(color))) {
      this.setState({
        r: Color(numberToHex(color)).rgb().red(),
        g: Color(numberToHex(color)).rgb().green(),
        b: Color(numberToHex(color)).rgb().blue()
      })
    }
  }

  handleRChange (e) {
    this.setState({
      r: e.target.value
    })
    this.rgbToMainColor()
  }

  handleGChange (e) {
    this.setState({
      g: e.target.value
    })
    this.rgbToMainColor()
  }

  handleBChange (e) {
    this.setState({
      b: e.target.value
    })
    this.rgbToMainColor()
  }

  handleLightSaturationChange (e) {
    this.setState({
      lightSaturation: e.target.value
    })
  }

  handleDarkSaturationChange (e) {
    this.setState({
      darkSaturation: e.target.value
    })
  }

  getColorsList (colorsAmount, colorsShiftAmount, mixColor, rotate, saturation) {
    const colorsList = []
    const givenColor = isValidHex(numberToHex(this.state.mainColor)) ? numberToHex(this.state.mainColor) : errorColor

    let step
    for (step = 0; step < colorsAmount; step++) {
      if (isValidHex(numberToHex(this.state.mainColor))) {
        colorsList.push(Color(givenColor).rotate((step + 1) / colorsAmount * -rotate).saturate((step + 1) / colorsAmount * (saturation / 100)).mix(Color(mixColor), (colorsShiftAmount / 100) * (step + 1) / colorsAmount).string())
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
              <InputsRowItem wide>
                <DynamicInput color={numberToHex(this.state.mainColor)} value={this.state.mainColor} onChange={this.handleMainColorChange} onBlur={this.handleMainColorBlurhandleMainColorBlur} prefix='#' label='Color' />

                <SliderWrapper>
                  <SliderLabel>
                    R
                  </SliderLabel>
                  <Slider type='range' min={0} max={255} color={numberToHex(this.state.mainColor)} value={this.state.r} onChange={this.handleRChange} />
                </SliderWrapper>
                <SliderWrapper>
                  <SliderLabel>
                    G
                  </SliderLabel>
                  <Slider type='range' min={0} max={255} color={numberToHex(this.state.mainColor)} value={this.state.g} onChange={this.handleGChange} />
                </SliderWrapper>
                <SliderWrapper>
                  <SliderLabel>
                    B
                  </SliderLabel>
                  <Slider type='range' min={0} max={255} color={numberToHex(this.state.mainColor)} value={this.state.b} onChange={this.handleBChange} />
                </SliderWrapper>
              </InputsRowItem>
            </InputsRow>

            <ColorBlocksRow>
              {this.getColorsList(this.state.darkColorsAmount, this.state.darkestAmount, 'black', this.state.darkColorsMixRotate, this.state.darkSaturation).reverse().map((color, index) => (
                <ColorBlock style={{ background: color }} hasValidColor={isValidHex(numberToHex(this.state.mainColor))} color={color} key={index} />
              ))}

              <ColorBlock
                wide
                style={{ background: isValidHex(numberToHex(this.state.mainColor)) ? numberToHex(this.state.mainColor) : errorColor }}
                hasValidColor={isValidHex(numberToHex(this.state.mainColor))}
                color={numberToHex(this.state.mainColor)}
              />

              {this.getColorsList(this.state.lightColorsAmount, this.state.lightestAmount, 'white', this.state.lightColorsMixRotate, this.state.lightSaturation).map((color, index) => (
                <ColorBlock style={{ background: color }} hasValidColor={isValidHex(numberToHex(this.state.mainColor))} color={color} key={index} />
              ))}
            </ColorBlocksRow>

            <InputsRow>
              <InputsRowItem>
                <DynamicInput color={numberToHex(this.state.mainColor)} value={this.state.darkColorsAmount} onChange={this.handleDarkColorsAmountChange} type='number' min={0} onBlur={this.handleDarkColorsAmountBlur} label='Dark colors amount' />
              </InputsRowItem>
              <InputsRowItem>
                <DynamicInput color={numberToHex(this.state.mainColor)} value={this.state.darkestAmount} onChange={this.handleDarkestAmountChange} type='number' sufix='%' min={0} max={99} onBlur={this.handleDarkestAmountBlur} withSlider label='Darkness' />
              </InputsRowItem>
              <InputsRowItem>
                <DynamicInput color={numberToHex(this.state.mainColor)} value={this.state.darkColorsMixRotate} onChange={this.handleDarkColorsMixRotate} onBlur={this.handleDarkColorsMixRotateBlur} min={-360} max={360} type='number' sufix='º' withSlider label='Dark colors hue angle' />
              </InputsRowItem>
              <InputsRowItem>
                <DynamicInput color={numberToHex(this.state.mainColor)} value={this.state.darkSaturation} onChange={this.handleDarkSaturationChange} onBlur={this.handleDarkSaturationBlur} min={-100} max={100} type='number' sufix='%' withSlider label='Dark colors saturation' />
              </InputsRowItem>

              <InputsRowItemSeparataor
                style={{
                  background: isValidHex(numberToHex(this.state.mainColor)) ? Color(numberToHex(this.state.mainColor)).mix(Color('black'), 0.3).fade(0.7).string() : '#ddd'
                }}
              />

              <InputsRowItem>
                <DynamicInput color={numberToHex(this.state.mainColor)} value={this.state.lightColorsAmount} onChange={this.handleLightColorsAmountChange} min={0} onBlur={this.handleLightColorsAmountBlur} type='number' label='Light colors amount' />
              </InputsRowItem>
              <InputsRowItem>
                <DynamicInput color={numberToHex(this.state.mainColor)} value={this.state.lightestAmount} onChange={this.handleLightestAmountChange} onBlur={this.handleLightestAmountBlur} min={0} max={99} type='number' sufix='%' withSlider label='Lightness' />
              </InputsRowItem>
              <InputsRowItem>
                <DynamicInput color={numberToHex(this.state.mainColor)} value={this.state.lightColorsMixRotate} onChange={this.handleLightColorsMixRotate} onBlur={this.handleLightColorsMixRotateBlur} min={-360} max={360} type='number' sufix='º' withSlider label='Light colors hue angle' />
              </InputsRowItem>
              <InputsRowItem>
                <DynamicInput color={numberToHex(this.state.mainColor)} value={this.state.lightSaturation} onChange={this.handleLightSaturationChange} onBlur={this.handleLightSaturationBlur} min={-100} max={100} type='number' sufix='%' withSlider label='Light colors saturation' />
              </InputsRowItem>
            </InputsRow>
          </ColorsSection>
        </TopSection>

        <FooterSection>
          <a href='/scale'><h1>Scale</h1></a>&nbsp; · &nbsp;made by <a href='http://hihayk.com' target='_blank' rel='noopener noreferrer'>Hayk</a>&nbsp; · &nbsp;<a href='https://github.com/hihayk/scale' target='_blank' rel='noopener noreferrer'>Github</a>
        </FooterSection>
      </MainWrapper>
    )
  }
}

export default App
