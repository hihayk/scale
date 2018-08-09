import styled, { css } from 'styled-components'

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

export default Slider
