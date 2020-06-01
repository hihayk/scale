import Color from "color"

export const numberToHex = (number) => '#' + number
export const hexToNumber = (number) => number.substr(1, number.length)

export const initialColor = '1D9A6C'

export const defaultState = {
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
  b: Color(numberToHex(initialColor)).rgb().blue(),

  bgColor: 'white',
}

export const errorColor = 'transparent'

export const isValidHex = (color) => {
  if (!color || typeof color !== 'string') return false

  if (color.substring(0, 1) === '#') color = color.substring(1)

  switch (color.length) {
    case 3: return /^[0-9A-F]{3}$/i.test(color)
    case 6: return /^[0-9A-F]{6}$/i.test(color)
    case 8: return /^[0-9A-F]{8}$/i.test(color)
    default: return false
  }
}

export const hashToObject = (hash) => {
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

export const getColorsList = (colorsAmount, colorsShiftAmount, mixColor, rotate, saturation, mainColor) => {
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
