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
      <Container
        innerRef={bar => {this.containerBar = bar}}
        onClick={(e) => {
          const percent = e.clientX / this.containerBar.getBoundingClientRect().right * 100
          const timeInSecond = (this.props.totalTime / 100) * percent
          this.props.onTimeChange(timeInSecond)
        }}
        onMouseMove={(e) => {
          const percent = e.clientX / this.containerBar.getBoundingClientRect().right * 100
          const timeInSecond = (this.props.totalTime / 100) * percent
          this.props.onTimeChange(timeInSecond)
        }}
      >
        <Filled
          innerRef={bar => {this.fillingBar = bar}}
          percent={this.props.percent}
        />
      </Container>
    )
  }
}

export default TimeHandler
