import styled, { css } from 'styled-components'

const sliderThumbStyles = css`
  height: 10px;
  width: 10px;
  transform: scale(var(--thumbScale));
  border-radius: 50%;
  color: inherit;
  background: var(--bodyColor);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -4px;
`

const sliderTrackStyles = css`
  width: 100%;
  height: 2px;
  cursor: pointer;
  background: var(--bodyDimmed);
  border-radius: 2px;
`

const Slider = styled.input`
  --thumbScale: 1;

  width: 96px;
  height: 12px;
  -webkit-appearance: none;
  margin: 0;
  display: block;
  cursor: pointer;
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: transparent;

  &:focus {
    outline: none;
    --thumbScale: 1.2;
  }
  &::-webkit-slider-runnable-track {
    ${sliderTrackStyles}
  }
  &::-webkit-slider-thumb {
    ${sliderThumbStyles}
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
