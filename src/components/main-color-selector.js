import React from 'react'
import styled from 'styled-components'
import Slider from './slider'
import DynamicInput from './dynamic-input'
import { numberToHex } from '../utils'

const InputsRow = styled.div`
  display: flex;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`

const InputsRowItem = styled.div`
  margin-right: 40px;
  flex-shrink: 0;
  width: ${props => props.wide ? 192 : 96}px;
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

const MainColorSelector = ({
  mainColor,
  r,
  g,
  b,
  onInputChange,
  onInputBlur,
  onRChange,
  onGChange,
  onBChange,
}) => (
  <InputsRow>
    <InputsRowItem wide>
      <DynamicInput color={numberToHex(mainColor)} value={mainColor} onChange={onInputChange} onBlur={onInputBlur} prefix='#' label='Color' />

      <SliderWrapper>
        <SliderLabel>
          R
        </SliderLabel>
        <Slider type='range' min={0} max={255} color={numberToHex(mainColor)} value={r} onChange={onRChange} />
      </SliderWrapper>
      <SliderWrapper>
        <SliderLabel>
          G
        </SliderLabel>
        <Slider type='range' min={0} max={255} color={numberToHex(mainColor)} value={g} onChange={onGChange} />
      </SliderWrapper>
      <SliderWrapper>
        <SliderLabel>
          B
        </SliderLabel>
        <Slider type='range' min={0} max={255} color={numberToHex(mainColor)} value={b} onChange={onBChange} />
      </SliderWrapper>
    </InputsRowItem>
  </InputsRow>
)

export default MainColorSelector