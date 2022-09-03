import styled from 'styled-components'

const StyledBackdrop = styled.div`
  background-color: black;
  opacity: 0.3;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`

export default function Backdrop({ onClick }) {
  return <StyledBackdrop onClick={onClick} />
}
