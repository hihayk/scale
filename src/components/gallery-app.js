import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Color from 'color'
import { galleryData } from './gallery-data'
import { hashToObject, numberToHex, errorColor, isValidHex } from '../utils'
import ColorBlocksRow from './color-blocks-row'
import ColorBlock from './color-block'

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

export default GalleryApp