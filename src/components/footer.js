import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FooterSection = styled.div`
  a {
    color: inherit;
    text-underline-position: under;
    text-decoration-color: var(--bodyDimmed);
  }

  h1 {
    font-size: inherit;
    line-height: inherit;
    font-weight: normal;
    display: inline-block;
  }
`

const Footer = () => (
  <FooterSection>
    <a href='https://hihayk.github.io/scale'><h1>Scale</h1></a>&nbsp; · &nbsp;made by <a href='http://hihayk.com' target='_blank' rel='noopener noreferrer'>Hayk</a>&nbsp; · &nbsp;<a href='https://github.com/hihayk/scale' target='_blank' rel='noopener noreferrer'>GitHub</a>
    &nbsp; · &nbsp;<Link to="/gallery">Gallery</Link>
  </FooterSection>
)

export default Footer