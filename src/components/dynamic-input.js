import React from 'react'
import Color from 'color'
import styled from 'styled-components'
import { isValidHex } from '../utils.js'
import Slider from './slider.js'

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
        <Slider type='range' color={color} value={value} onChange={onChange} min={min} max={max} />
      )}
    </div>
  )
}

export default DynamicInput
