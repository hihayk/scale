import styled from "styled-components"

const ColorBlocksRow = styled.div`
  display: flex;
  width: 100%;
  ${props => props.disabled && `pointer-events: none`};
`

export default ColorBlocksRow
