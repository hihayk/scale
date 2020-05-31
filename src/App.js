import React, { useState, useEffect } from 'react'
import './App.css'
import Color from 'color'
import styled from 'styled-components'
import DynamicInput from './components/dynamic-input.js'
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

const ScaleApp = () => {  
  const getHash = () => {
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

  const initialState = getHash() || defaultState
  const [mainColor, setMainColor] = useState(initialState.mainColor)
  const [r, setR] = useState(initialState.r)
  const [g, setG] = useState(initialState.g)
  const [b, setB] = useState(initialState.b)

  const [darkColorsAmount, setDarkColorsAmount] = useState(initialState.darkColorsAmount)
  const [darkestAmount, setDarkestAmount] = useState(initialState.darkestAmount)
  const [darkColorsMixRotate, setDarkColorsMixRotate] = useState(initialState.darkColorsMixRotate)
  const [lightColorsAmount, setLightColorsAmount] = useState(initialState.lightColorsAmount)
  const [lightestAmount, setLightestAmount] = useState(initialState.lightestAmount)
  const [lightColorsMixRotate, setLightColorsMixRotate] = useState(initialState.lightColorsMixRotate)
  const [lightSaturation, setLightSaturation] = useState(initialState.lightSaturation)
  const [darkSaturation, setDarkSaturation] = useState(initialState.darkSaturation)

  const currentState = {
    darkColorsAmount,
    lightColorsAmount,
    darkestAmount,
    lightestAmount,
    darkColorsMixRotate,
    lightColorsMixRotate,
    lightSaturation,
    darkSaturation,
    mainColor,
    r,
    g,
    b
  }

  if(getHash()) {
    window.location.hash = encodeURI(Object.values(getHash()).join('/'))
  }

  const updateHash = () => {
    console.log('updating')
    window.location.hash = encodeURI(Object.values(currentState).join('/'))
  }

  useEffect(() => {
    updateHash()
    updateThemeColor()
    rgbToMainColor()
  });
  
  const updateThemeColor = () => {
    document.getElementById('themeMetaTag').setAttribute('content', numberToHex(mainColor))
  }

  const handleMainColorChange = (e) => {
    let typedColorFiltered
    const typedColor = e.target.value

    if (typedColor[0] === '#') {
      typedColorFiltered = typedColor.substr(1, typedColor.length)
    } else {
      typedColorFiltered = typedColor
    }

    setMainColor(typedColorFiltered)

    updateRgbWithMainColor(typedColorFiltered)
  }

  const rgbToMainColor = () => {
    setTimeout(() => {
      setMainColor(hexToNumber(Color(`rgb(${r}, ${g}, ${b})`).hex()))
    }, 0)
  }

  const updateRgbWithMainColor = (color) => {
    if (isValidHex(numberToHex(color))) {
      setR(Color(numberToHex(color)).rgb().red())
      setG(Color(numberToHex(color)).rgb().green())
      setB(Color(numberToHex(color)).rgb().blue())
    }
  }
  
  return (
    <MainWrapper color={numberToHex(mainColor)}>
      <TopSection>
        <ColorsSection>
          <MainColorSelector
            onInputChange={handleMainColorChange}
            onInputBlur={(e) => !e.target.value && setMainColor(666)}
            onRChange={(e) => setR(e.target.value)}
            onGChange={(e) => setG(e.target.value)}
            onBChange={(e) => setB(e.target.value)}
            mainColor={mainColor}
            r={r}
            g={g}
            b={b}
          />

          <ColorsRow
            darkColorsAmount={darkColorsAmount}
            darkestAmount={darkestAmount}
            darkColorsMixRotate={darkColorsMixRotate}
            lightColorsAmount={lightColorsAmount}
            lightestAmount={lightestAmount}
            lightColorsMixRotate={lightColorsMixRotate}
            lightSaturation={lightSaturation}
            darkSaturation={darkSaturation}
            mainColor={mainColor}
          />

          <InputsRow>
            <InputsRowItem>
              <DynamicInput
                color={numberToHex(mainColor)}
                value={darkColorsAmount}
                onChange={(e) => setDarkColorsAmount(e.target.value)}
                onBlur={(e) => !e.target.value && setDarkColorsAmount(0)}
                type='number' 
                min={0}
                label='Dark colors amount'
              />
            </InputsRowItem>
            <InputsRowItem>
              <DynamicInput
                color={numberToHex(mainColor)}
                value={darkestAmount}
                onChange={(e) => setDarkestAmount(e.target.value)}
                onBlur={(e) => !e.target.value && setDarkestAmount(0)}
                type='number' 
                sufix='%' 
                min={0}
                max={99}
                withSlider
                label='Darkness'
              />
            </InputsRowItem>
            <InputsRowItem>
              <DynamicInput
                color={numberToHex(mainColor)}
                value={darkColorsMixRotate}
                onChange={(e) => setDarkColorsMixRotate(e.target.value)}
                onBlur={(e) => !e.target.value && setDarkColorsMixRotate(0)}
                min={-360}
                max={360}
                type='number'
                sufix='º'
                withSlider
                label='Dark colors hue angle'
              />
            </InputsRowItem>
            <InputsRowItem>
              <DynamicInput
                color={numberToHex(mainColor)}
                value={darkSaturation}
                onChange={(e) => setDarkSaturation(e.target.value)}
                onBlur={(e) => !e.target.value && setDarkSaturation(0)}
                min={-100}
                max={100}
                type='number'
                sufix='%'
                withSlider
                label='Dark colors saturation'
              />
            </InputsRowItem>

            <InputsRowItemSeparataor
              style={{
                background: isValidHex(numberToHex(mainColor)) ? Color(numberToHex(mainColor)).mix(Color('black'), 0.3).fade(0.85).string() : '#ddd'
              }}
            />

            <InputsRowItem>
              <DynamicInput
                color={numberToHex(mainColor)}
                value={lightColorsAmount}
                onChange={(e) => setLightColorsAmount(e.target.value)}
                onBlur={(e) => !e.target.value && setLightColorsAmount(0)}
                min={0} 
                type='number' 
                label='Light colors amount'
              />
            </InputsRowItem>
            <InputsRowItem>
              <DynamicInput
                color={numberToHex(mainColor)}
                value={lightestAmount}
                onChange={(e) => setLightestAmount(e.target.value)}
                onBlur={(e) => !e.target.value && setLightestAmount(0)}
                min={0} 
                max={99} 
                type='number'
                sufix='%'
                withSlider
                label='Lightness'
              />
            </InputsRowItem>
            <InputsRowItem>
              <DynamicInput
                color={numberToHex(mainColor)}
                value={lightColorsMixRotate}
                onChange={(e) => setLightColorsMixRotate(e.target.value)}
                onBlur={(e) => !e.target.value && setLightColorsMixRotate(0)}
                min={-360} 
                max={360} 
                type='number'
                sufix='º'
                withSlider
                label='Light colors hue angle'
              />
            </InputsRowItem>
            <InputsRowItem>
              <DynamicInput
                color={numberToHex(mainColor)}
                value={lightSaturation}
                onChange={(e) => setLightSaturation(e.target.value)}
                onBlur={(e) => !e.target.value && setLightSaturation(0)}
                min={-100} 
                max={100} 
                type='number'
                sufix='%'
                withSlider
                label='Light colors saturation'
              />
            </InputsRowItem>
          </InputsRow>
        </ColorsSection>
      </TopSection>

      <Footer />
    </MainWrapper>
  )
  
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
