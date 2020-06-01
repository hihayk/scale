import React from 'react'
import styled from 'styled-components'

const DotsWrapper = styled.div`
  display: flex;
`

const DotsColumn = styled.div`
  & + .DotsColumn {
    margin-left: 4px;
  }
  
  .Dot + .Dot {
    margin-top: 4px;
  }
`

const Dot = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background-color: ${props => props.color};
  cursor: pointer;
`

const BackgroundSelector = ({
  setBgColor,
  darkColors,
  lightColors,
  lightColorsAmount,
}) => {

  return (
    <div>
      <DotsWrapper>
        <DotsColumn className="DotsColumn">
          <Dot className="Dot" color='white' onClick={() => setBgColor('white')} />
          <Dot className="Dot" color='black' onClick={() => setBgColor('black')} />
        </DotsColumn>
        <DotsColumn className="DotsColumn">
          {darkColors.map((color, index) => {
            if(index < 2) {
              return(
                <Dot className="Dot" key={index} color={color} onClick={() => setBgColor(`d-${index}`)} />
              )
            }
          })}
        </DotsColumn>
        <DotsColumn className="DotsColumn">
          {lightColors.map((color, index) => {
            if(index > lightColorsAmount - 3) {
              return(
                <Dot className="Dot" key={index} color={color} onClick={() => setBgColor(`l-${lightColorsAmount - index}`)} />
              )
            }
          })}
        </DotsColumn>
      </DotsWrapper>
    </div>
  )
}

export default BackgroundSelector