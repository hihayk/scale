import React, { Component } from 'react'
import './App.css'
import Color from 'color'
import styled from 'styled-components'
import DynamicInput from './components/dynamic-input.js'
import Slider from './components/slider.js'
import ColorBlock from './components/color-block.js'
import { isValidHex } from './utils.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


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
  ${props => props.disabled && `pointer-events: none`};
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

const getColorsList = (colorsAmount, colorsShiftAmount, mixColor, rotate, saturation, colorsObject) => {
  const colorsList = []
  const givenColor = isValidHex(numberToHex(hashToObject(colorsObject.scaleValue).mainColor)) ? numberToHex(hashToObject(colorsObject.scaleValue).mainColor) : errorColor

  let step
  for (step = 0; step < colorsAmount; step++) {
    if (isValidHex(numberToHex(hashToObject(colorsObject.scaleValue).mainColor))) {
      colorsList.push(Color(givenColor).rotate((step + 1) / colorsAmount * -rotate).saturate((step + 1) / colorsAmount * (saturation / 100)).mix(Color(mixColor), (colorsShiftAmount / 100) * (step + 1) / colorsAmount).string())
    } else {
      colorsList.push(errorColor)
    }
  }

  return colorsList
}

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

            <ColorBlocksRow style={{marginBottom: 88}}>
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
          <a href='https://hihayk.github.io/scale'><h1>Scale</h1></a>&nbsp; · &nbsp;made by <a href='http://hihayk.com' target='_blank' rel='noopener noreferrer'>Hayk</a>&nbsp; · &nbsp;<a href='https://github.com/hihayk/scale' target='_blank' rel='noopener noreferrer'>GitHub</a>
          &nbsp; · &nbsp;<Link to="/gallery">Gallery</Link>
        </FooterSection>
      </MainWrapper>
    )
  }
}

const galleryData = [
  {
    scaleValue: '#8/0/0/0/-53/-193/0/-100/0098FF/0/152/255',
    authorName: 'Hayk',
    authorLink: 'https://hihayk.com',
  },
  {
    scaleValue: '#4/6/62/91/0/17/-36/14/3E83FF/62/131/255',
    authorName: 'StrowBeary',
    authorLink: 'https://remicaillot.fr/',
  },
  {
    scaleValue: '#4/6/10/87/-103/146/39/-100/FFB177/255/177/119',
    authorName: 'Kyle Hall',
    authorLink: 'https://github.com/kyle-hall',
  },
  {
    scaleValue: '#4/4/70/89/0/0/0/4/0859fC/8/89/252',
    authorName: 'LizS',
  },
  {
    scaleValue: '#4/6/51/83/-8/-8/74/77/269AC9/38/154/201',
    authorName: 'Hum',
    authorLink: 'https://vk.com/hummanoid',
  },
  {
    scaleValue: '#2/6/25/80/8/-33/-7/47/F16334/241/99/52',
    authorName: 'David Kariuki',
    authorLink: 'https://www.behance.net/davellykariuki',
  },
  {
    scaleValue: '#4/6/65/80/82/11/41/-1/A39A6C/163/154/108',
    authorName: 'TheXCodeSeeker',
  },
  {
    scaleValue: '#4/6/50/80/-12/77/33/-10/23A9CF/35/169/207',
    authorName: 'Don',
    authorLink: 'http://thinkrepeat.com/',
  },
  {
    scaleValue: '#3/0/50/80/-51/67/20/14/C0DE58/192/222/88',
    authorName: 'Pinki',
    authorLink: 'https://dribbble.com/Pinki',
  },
  {
    scaleValue: '#2/2/50/25/-50/-150/25/-50/E05040/224/80/64',
    authorName: 'Dan Pontes',
    authorLink: 'https://danpontes.webflow.io',
  },
  {
    scaleValue: '#4/6/80/97/-51/-3/0/14/7d61dc/125/97/220',
    authorName: 'Accessible Visual',
    authorLink: 'https://www.freshworks.com/agile-project-management-software/?source=fworks&medium=referral&campaign=fworks_product_nav',
  },
  {
    scaleValue: '#5/5/62/40/118/-172/-46/14/FFE64A/255/230/74',
    authorName: 'Crshlab',
    authorLink: 'http://crashlab.be',
  },
  {		
    scaleValue: '#6/8/32/80/-31/67/5/100/1D9AFF/29/154/255',
    authorName: 'Michael Andreuzza ',
    authorLink: 'https://dribbble.com/MichaelAndreuzza',
  },
  {		
    scaleValue: '#4/6/50/61/-51/17/63/14/1DBDC3/29/189/195',
    authorName: 'Ali Rahmani',
    authorLink: 'https://www.instagram.com/rahmaniali.ir/',
  },     
  {		
    scaleValue: '#2/4/50/80/-51/67/20/14/a5b0feff/165/176/254',
    authorName: 'Siar',
  },   
  {
    scaleValue: '#2/4/31/82/-8/-48/34/31/6a67b1/106/103/177',
    authorName: 'Hayk',
    authorLink: 'https://hihayk.com',
  },
  {
    scaleValue: '#0/9/0/95/0/0/0/0/444/68/68/68',
    authorName: 'Hayk',
    authorLink: 'https://hihayk.com',
  },
  {
    scaleValue: '#0/9/42/83/72/-55/60/50/9E3E3C/158/62/60',
    authorName: 'Hayk',
    authorLink: 'https://hihayk.com',
  },
  {
    scaleValue: '#3/6/42/83/72/-76/60/50/824479/130/68/121',
    authorName: 'Hayk',
    authorLink: 'https://hihayk.com',
  },
  {
    scaleValue: '#0/5/44/70/-51/116/100/14/45397F/69/57/127',
    authorName: 'Hayk',
    authorLink: 'https://hihayk.com',
  },
]

const hashToObject = (hash) => {
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

const GalleryWrapper = styled.div`
  padding: 80px;

  @media (max-width: 720px) {
    padding: 32px;
  }
`

const GalleryItem = styled.div`
  padding: 80px 0 40px 0;
  border-bottom: 1px solid ${props => Color(props.color.mainColor).alpha(0.1).string()};
`

const ItemAuthor = styled.a`
  margin-top: 24px;
  color: ${props => props.color};
  display: inline-block;
  text-decoration: none;
  font-size: 12px;
  line-height: 16px;
`

const GalleryHeader = styled.header`
  display: inline-block;
  text-decoration: none;
  font-size: 34px;
  line-height: 34px;
  border-bottom: 1px solid #ddd;
  width: 100%;
  padding: calc(50vh - 240px) 0 80px 0;
  color: #222;
  display: flex;

  a {
    color: #aaa;
    text-decoration: none;
  }

  @media (max-width: 720px) {
    font-size: 18px;
    line-height: 28px;
  }
`

const SubmitLink = styled.a`
  margin-left: auto;
`

const GalleryApp = () => (
  <GalleryWrapper>
    <GalleryHeader>
      <Link to="/">scale/</Link>gallery

      <SubmitLink
        href="https://hayk15.typeform.com/to/mVHrni"
        data-mode="drawer_right"
        data-hide-headers={true}
        data-hide-footer={true}
        data-submit-close-delay="5"
        className="typeform-share"
      >
        +submit
      </SubmitLink>
    </GalleryHeader>
    {Object.entries(galleryData).map(([key, value]) => {
      const getColorsObject = () => hashToObject(value.scaleValue)

      return (
        <GalleryItem color={numberToHex(getColorsObject())}>
          <a href={`https://hihayk.github.io/scale/${value.scaleValue}`}>
            <ColorBlocksRow disabled>
              {getColorsList(getColorsObject().darkColorsAmount, getColorsObject().darkestAmount, 'black', getColorsObject().darkColorsMixRotate, getColorsObject().darkSaturation, value).reverse().map((color, index) => (
                <ColorBlock style={{ background: color }} hasValidColor={isValidHex(numberToHex(getColorsObject().mainColor))} color={color} key={index} />
              ))}

              <ColorBlock
                wide
                style={{ background: isValidHex(numberToHex(getColorsObject().mainColor)) ? numberToHex(getColorsObject().mainColor) : errorColor }}
                hasValidColor={isValidHex(numberToHex(getColorsObject().mainColor))}
                color={numberToHex(getColorsObject().mainColor)}
              />

              {getColorsList(getColorsObject().lightColorsAmount, getColorsObject().lightestAmount, 'white', getColorsObject().lightColorsMixRotate, getColorsObject().lightSaturation, value).map((color, index) => (
                <ColorBlock style={{ background: color }} hasValidColor={isValidHex(numberToHex(getColorsObject().mainColor))} color={color} key={index} />
              ))}
            </ColorBlocksRow>

            <ItemAuthor href={value.authorLink} target='_blank' color={numberToHex(getColorsObject().mainColor)}>
              by {value.authorName}
            </ItemAuthor>
          </a>
        </GalleryItem>
      )
    })}
  </GalleryWrapper>
)

const App = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <div>
      <Route exact path="/" component={ScaleApp} />
      <Route exact path="/gallery" component={GalleryApp} />
    </div>
  </Router>
)

export default App
