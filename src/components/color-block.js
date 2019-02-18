import React, { Component } from 'react'
import Color from 'color'
import styled, { keyframes } from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const ColorBlockWrapper = styled.div`
`

const ColorBlockCode = styled.div`
  position: absolute;
  top: 100%;
  padding-top: 8px;
  padding-bottom: 16px;
  transition: .2s;
`

const ColorBlockContainer = styled.div`
  position: relative;
  height: 72px;
  max-width: ${props => props.wide ? 192 : 72}px;
  ${props => props.wide && 'min-width: 192px'};
  width: 100%;
  ${props => !props.hasValidColor && 'box-shadow: inset 0 0 0 2px #ddd'};
  flex-shrink: 1;
  cursor: pointer;

  &:not(:hover) .ColorBlockCode {
    opacity: 0;
    transition: .6s;
  }

  @media (max-width: 720px) {
    ${props => props.wide && 'min-width: 96px'};
  }
`

const copyAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  30% {
    opacity: 0.5;
  }
  70% {
    transform: translateY(0);
    opacity: 0.3;
  }
  100% {
    opacity: 0;
  }
`

const CopiedText = styled.div`
  animation: ${copyAnimation} 0.8s;
  opacity: 0;
`

class ColorBlock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      copied: false
    }
    this.handleCopied = this.handleCopied.bind(this)
  }

  handleCopied () {
    this.setState({
      copied: true
    })
    this.delayCopyFalseState()
  }

  delayCopyFalseState () {
    setTimeout(() => {
      this.setState({
        copied: false
      })
    }, 800)
  }

  render () {
    const { wide, hasValidColor, color, ...rest } = this.props

    return (
      <CopyToClipboard text={hasValidColor ? Color(color).hex() : null}>
        <ColorBlockContainer wide={wide} hasValidColor={hasValidColor} {...rest} onClick={this.handleCopied}>
          <ColorBlockWrapper {...rest} />

          <ColorBlockCode className='ColorBlockCode'>
            {hasValidColor ? Color(color).hex() : null}
            {this.state.copied && (
              <CopiedText copied={this.state.copied}>
                {Color(color).hex()}
              </CopiedText>
            )}
          </ColorBlockCode>
        </ColorBlockContainer>
      </CopyToClipboard>
    )
  }
}

export default ColorBlock
