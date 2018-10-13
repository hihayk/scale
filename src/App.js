import React, { Component } from 'react'
import './App.css'
import Color from 'color'
import styled from 'styled-components'
import DynamicInput from './components/dynamic-input.js'
import Slider from './components/slider.js'
import ColorBlock from './components/color-block.js'
import { isValidHex } from './utils.js'

const errorColor = 'transparent'

const MainWrapper = styled.div`
  color: ${props => {
    const givenColor = isValidHex(props.color) ? props.color : errorColor
    return Color(givenColor).mix(Color('black'), 0.3).string()
  }};
  padding: 40px 80px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 720px) {
    padding: 32px;
    min-height: calc(100vh - 40px);
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
  margin-right: 40px;
  width: ${props => props.wide ? 192 : 96}px;
  flex-shrink: 0;
`

const InputsRowItemSeparataor = styled.div`
  margin-right: 48px;
  display: block;
  width: 1px;
  flex-shrink: 0;
`

const numberToHex = (number) => '#' + number
const hexToNumber = (number) => number.substr(1, number.length)

const initialColor = '1D9A6C'

const defaultState = {
  darkColorsAmount: 4,
  lightColorsAmount: 6,

  darkestAmount: 50,
  lightestAmount: 80,

  darkColorsMixRotate: -51,
  lightColorsMixRotate: 67,

  lightSaturation: 20,
  darkSaturation: 14,

  mainColor: initialColor,
  r: Color(numberToHex(initialColor)).rgb().red(),
  g: Color(numberToHex(initialColor)).rgb().green(),
  b: Color(numberToHex(initialColor)).rgb().blue()
}

class App extends Component {
  constructor (props) {
    super(props)

    this.state = this.getHash() || defaultState

    this.handleDarkColorsAmountChange = this.handleDarkColorsAmountChange.bind(this)
    this.handleDarkestAmountChange = this.handleDarkestAmountChange.bind(this)
    this.handleDarkColorsMixRotate = this.handleDarkColorsMixRotate.bind(this)

    this.handleMainColorChange = this.handleMainColorChange.bind(this)
    this.handleMainColorBlur = this.handleMainColorBlur.bind(this)

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

  updateHash () {
    window.location.hash = encodeURI(Object.values(this.state).join('/'))
  }

  getHash () {
    const hash = decodeURI(window.location.hash)

    if (hash) {
      const stateKeysArray = Object.keys(defaultState)
      const hashValuesArray = hash.substr(1, hash.length).split(['/'])

      const getHashObject = () => {
        var hashObject = {}
        stateKeysArray.forEach((key, i) => hashObject[key] = hashValuesArray[i])

        return hashObject
      }

      return getHashObject()
    }

    return null
  }

  updateThemeColor () {
    document.getElementById('themeMetaTag').setAttribute('content', numberToHex(this.state.mainColor))
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

  handleMainColorBlur (e) {
    if (!e.target.value) {
      this.setState({
        mainColor: 666
      })
    }
  }

  
  handleDarkColorsAmountChange(e) {
    if (e.target.value && e.target.value.length > 3) {
      e.target.value = 999;
    }
    if (e.target.value && e.target.value < 0) {
      e.target.value = 0;
    }
    this.setState({
      darkColorsAmount: e.target.value
    })
  }

  handleDarkestAmountChange(e) {
    if (e.target.value && e.target.value > 99) {
      e.target.value = 99;
    }
    if (e.target.value && e.target.value < 0) {
      e.target.value = 0;
    }
    this.setState({
      darkestAmount: e.target.value
    })
  }

  handleLightColorsAmountChange(e) {
    if (e.target.value && e.target.value.length > 3) {
      e.target.value = 999;
    }
    if (e.target.value && e.target.value < 0) {
      e.target.value = 0;
    }
    this.setState({
      lightColorsAmount: e.target.value
    })
  }

  handleLightestAmountChange(e) {
    if (e.target.value && e.target.value > 99) {
      e.target.value = 99;
    }
    if (e.target.value && e.target.value < 0) {
      e.target.value = 0;
    }
    this.setState({
      lightestAmount: e.target.value
    })
  }

  handleLightColorsMixRotate(e) {
    if (e.target.value && e.target.value > 360) {
      e.target.value = 360;
    }
    if (e.target.value && e.target.value < -360) {
      e.target.value = -360;
    }
    this.setState({
      lightColorsMixRotate: e.target.value
    })
  }

  handleDarkColorsMixRotate(e) {
    if (e.target.value && e.target.value > 360) {
      e.target.value = 360;
    }
    if (e.target.value && e.target.value < -360) {
      e.target.value = -360;
    }
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
    if (e.target.value && e.target.value > 100) {
      e.target.value = 100;
    }
    if (e.target.value && e.target.value < -100) {
      e.target.value = -100;
    }
    this.setState({
      lightSaturation: e.target.value
    })
  }

  handleDarkSaturationChange (e) {
    if (e.target.value && e.target.value > 100) {
      e.target.value = 100;
    }
    if (e.target.value && e.target.value < -100) {
      e.target.value = -100;
    }
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
                <DynamicInput color={numberToHex(this.state.mainColor)} value={this.state.mainColor} onChange={this.handleMainColorChange} onBlur={this.handleMainColorBlur} prefix='#' label='Color' />

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
                  background: isValidHex(numberToHex(this.state.mainColor)) ? Color(numberToHex(this.state.mainColor)).mix(Color('black'), 0.3).fade(0.85).string() : '#ddd'
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
          <a href='/scale'><h1>Scale</h1></a>&nbsp; · &nbsp;made by <a href='http://hihayk.com' target='_blank' rel='noopener noreferrer'>Hayk</a>&nbsp; · &nbsp;<a href='https://github.com/hihayk/scale' target='_blank' rel='noopener noreferrer'>GitHub</a>
        </FooterSection>
      </MainWrapper>
    )
  }
}

export default App
