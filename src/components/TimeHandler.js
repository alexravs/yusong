import React, { Component } from 'react'
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

class TimeHandler extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <Filled
          innerRef={fillingBar => {this.fillingBar = fillingBar}}
          onMouseUp={(e) => console.log(this.fillingBar.getBoundingClientRect())}
          percent={this.props.percent}
        />
      </Container>
    )
  }
}

export default TimeHandler