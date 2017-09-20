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

    this.state = {
      fakeTime: null
    }
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
          //const timeInSecond = (this.props.totalTime / 100) * percent
          {/* console.log(timeInSecond) */}
          //this.props.onTimeChange(timeInSecond)
          this.setState({
            fakeTime: percent
          })
        }}
      >
        <Filled
          innerRef={bar => {this.fillingBar = bar}}
          percent={this.state.fakeTime || this.props.percent}
        />
      </Container>
    )
  }
}

export default TimeHandler
