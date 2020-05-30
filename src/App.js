import React, { Component } from 'react'
import './App.css'
import Color from 'color'
import styled from 'styled-components'
import DynamicInput from './components/dynamic-input.js'
import Slider from './components/slider.js'
import Footer from './components/footer.js'
import { isValidHex, numberToHex, hexToNumber, errorColor, defaultState } from './utils.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import GalleryApp from './components/gallery-app'
import ColorsRow from './components/colors-row'
import MainColorSelector from './components/main-color-selector'

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

const ColorsSection = styled.div`
  width: 100%;
`

const TopSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
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
  flex-shrink: 0;
  width: ${props => props.wide ? 192 : 96}px;
`

const InputsRowItemSeparataor = styled.div`
  margin-right: 48px;
  display: block;
  width: 1px;
  flex-shrink: 0;
`

class ScaleApp extends Component {
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

  render () {
    return (
      <MainWrapper color={numberToHex(this.state.mainColor)}>
        <TopSection>
          <ColorsSection>
            <MainColorSelector
              onInputChange={this.handleMainColorChange}
              onInputBlur={this.handleMainColorBlur}
              onRChange={this.handleRChange}
              onGChange={this.handleGChange}
              onBChange={this.handleBChange}
              mainColor={this.state.mainColor}
              r={this.state.r}
              g={this.state.g}
              b={this.state.b}
            />

            <ColorsRow
              darkColorsAmount={this.state.darkColorsAmount}
              darkestAmount={this.state.darkestAmount}
              darkColorsMixRotate={this.state.darkColorsMixRotate}
              lightColorsAmount={this.state.lightColorsAmount}
              lightestAmount={this.state.lightestAmount}
              lightColorsMixRotate={this.state.lightColorsMixRotate}
              mainColor={this.state.mainColor}
              lightSaturation={this.state.lightSaturation}
              darkSaturation={this.state.darkSaturation}
            />

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

        <Footer />
      </MainWrapper>
    )
  }
}

const App = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <div>
      <Route exact path="/" component={ScaleApp} />
      <Route exact path="/gallery" component={GalleryApp} />
    </div>
  </Router>
)

export default App
