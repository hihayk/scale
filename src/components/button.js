import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  appearance: none;
  border: none;
  font: inherit;
  color: inherit;
  background-color: var(--bodyXDimmed);
  padding: 0.4em 0.75em;
  cursor: pointer;

  &:focus {
    outline: none;
    background-color: var(--bodyDimmed);
  }
  &:active {
    background-color: var(--bodyColor);
  }
`

export default Button