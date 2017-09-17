import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 15px;
`

const Filled = styled.div`
  width: ${props => props.percent}%;
  height: 15px;  
  background: red;
`

export default ({ percent }) => (
  <Container>
    <Filled onClick={(e) => console.log(e.pageX)} percent={percent} />
  </Container>
)

