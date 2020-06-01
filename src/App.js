import React, { useState, useEffect } from 'react'
import './App.css'
import Color from 'color'
import styled from 'styled-components'
import DynamicInput from './components/dynamic-input.js'
import Footer from './components/footer.js'
import { isValidHex, numberToHex, hexToNumber, errorColor, defaultState, getColorsList } from './utils.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import GalleryApp from './components/gallery-app'
import ColorsRow from './components/colors-row'
import MainColorSelector from './components/main-color-selector'
import BackgroundSelector from './components/background-selector'
import Triggers from './components/triggers'

const MainWrapper = styled.div`
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

const GlobalConfigSection = styled.div`
  display: flex;
  margin-bottom: 64px;

  flex-wrap: wrap;
    @media (max-width: 1100px) {
  }
`

const InputsRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: var(--space-xl);

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
  background-color: var(--border);
`

const BackgroundSelectorSection = styled.div`
  border-left: 1px solid var(--border);
  padding: 0 48px;
  height: 160px;
  
  @media (max-width: 720px) {
    padding: 16px 0;
    margin-top: 16px;
    border-left: 0;
    border-top: 1px solid var(--border);
  }
`

const TriggersSection = styled.div`
  border-left: 1px solid var(--border);
  padding: 0 48px;
  
  @media (max-width: 720px) {
    padding: 16px 0;
    margin-top: 16px;
    border-left: 0;
    border-top: 1px solid var(--border);
  }
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

  const [bgColor, setBgColor] = useState(initialState.bgColor)

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
    b,
    bgColor,
  }

  if(getHash()) {
    window.location.hash = encodeURI(Object.values(getHash()).join('/'))
  }

  const updateHash = () => {
    window.location.hash = encodeURI(Object.values(currentState).join('/'))
  }
  
  const updateThemeColor = () => {
    document.getElementById('themeMetaTag').setAttribute('content', numberToHex(mainColor))
  }

  const updateRgbWithMainColor = (color) => {
    if (isValidHex(numberToHex(color))) {
      setR(Color(numberToHex(color)).rgb().red())
      setG(Color(numberToHex(color)).rgb().green())
      setB(Color(numberToHex(color)).rgb().blue())
    }
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

  const handleRChange = (value) => {
    setR(value)
    rgbToMainColor()
  }
  const handleGChange = (value) => {
    setG(value)
    rgbToMainColor()
  }
  const handleBChange = (value) => {
    setB(value)
    rgbToMainColor()
  }
  
  const bgRefToNumber = (ref) => {
    if(ref.includes('l-')) {
      return ref.substring(2, ref.length)
    }
    if(ref.includes('d-')) {
      return ref.substring(2, ref.length)
    }
  }

  const darkColors = getColorsList(darkColorsAmount, darkestAmount, 'black', darkColorsMixRotate, darkSaturation, mainColor).reverse().map((color) => (color))
  const lightColors = getColorsList(lightColorsAmount, lightestAmount, 'white', lightColorsMixRotate, lightSaturation, mainColor).map((color) => (color))
  
  const setBgColorVar = () => {
    let color = ''

    if(bgColor === undefined) {
      color = defaultState.bgColor
      setBgColor(defaultState.bgColor)
    } else {
      if(bgColor === 'white' || bgColor === 'black') {
        color = bgColor
      }
      
      if(bgColor.includes('l-')) {
        color = lightColors[lightColorsAmount - bgRefToNumber(bgColor)]
      }
      
      if(bgColor.includes('d-')) {
        color = darkColors[bgRefToNumber(bgColor)]
      }
    }

    document.documentElement.style.setProperty('--bodyBg', color)
  }
  setBgColorVar()

  useEffect(() => {
    updateHash()
    updateThemeColor()
  });

  const setBodyColorVar = () => {
    const givenColor = isValidHex(numberToHex(mainColor)) ? numberToHex(mainColor) : errorColor
    
    const getMixColor = () => {
      if(bgColor) {
        if(bgColor.includes('l-') || bgColor.includes('white')) {
          return 'black'
        } else {
          return 'white'
        }
      } else {
        return 'white'
      }
    }
    const bodyColor = Color(givenColor).mix(Color(getMixColor()), 0.5).string()
    const bodyDimmed = Color(givenColor).mix(Color(getMixColor()), 0.5).fade(0.7).string()
    const bodyXDimmed = Color(givenColor).mix(Color(getMixColor()), 0.5).fade(0.9).string()

    document.documentElement.style.setProperty('--bodyColor', bodyColor)
    document.documentElement.style.setProperty('--bodyDimmed', bodyDimmed)
    document.documentElement.style.setProperty('--bodyXDimmed', bodyXDimmed)
    document.documentElement.style.setProperty(
      '--border',
      isValidHex(numberToHex(mainColor)) ? Color(numberToHex(mainColor)).mix(Color(getMixColor()), 0.3).fade(0.85).string() : '#ddd'
    )
  }

  setBodyColorVar()
  
  return (
    <MainWrapper>
      <TopSection>
        <ColorsSection>
          <GlobalConfigSection>
            <MainColorSelector
              onInputChange={handleMainColorChange}
              onInputBlur={(e) => !e.target.value && setMainColor(666)}
              onRChange={(e) => handleRChange(e.target.value)}
              onGChange={(e) => handleGChange(e.target.value)}
              onBChange={(e) => handleBChange(e.target.value)}
              mainColor={mainColor}
              r={r}
              g={g}
              b={b}
            />
            <BackgroundSelectorSection>
              <BackgroundSelector
                setBgColor={setBgColor}
                darkColors={darkColors}
                lightColors={lightColors}
                lightColorsAmount={lightColorsAmount}
              />
            </BackgroundSelectorSection>
            <TriggersSection>
              <Triggers
                mainColor={mainColor}
                darkColors={darkColors}
                lightColors={lightColors}
                setR={setR}
                setG={setG}
                setB={setB}
                setDarkColorsAmount={setDarkColorsAmount}
                setDarkestAmount={setDarkestAmount}
                setDarkColorsMixRotate={setDarkColorsMixRotate}
                setLightColorsAmount={setLightColorsAmount}
                setLightestAmount={setLightestAmount}
                setLightColorsMixRotate={setLightColorsMixRotate}
                setLightSaturation={setLightSaturation}
                setDarkSaturation={setDarkSaturation}
                rgbToMainColor={rgbToMainColor}
              />
            </TriggersSection>
          </GlobalConfigSection>

          <ColorsRow
            mainColor={mainColor}
            darkColors={darkColors}
            lightColors={lightColors}
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

            <InputsRowItemSeparataor />

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
