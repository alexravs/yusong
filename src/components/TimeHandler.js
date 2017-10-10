import React, { Component } from 'react'
import styled from 'styled-components'
import ReactOutsideEvent from 'react-outside-event';

const Container = styled.div`
  width: 100%;
  height: 15px;
`

const Filled = styled.div.attrs({
  style: props => ({
    width: `${props.percent}%`,
  })
})`
  height: 15px;  
  background: red;
`

class TimeHandler extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fakeTime: null,
      mouseDown: false,
    }
  }

  onOutsideEvent = (e) => {
    if (e.type === 'mouseup') {
      this.handleMouseUp()
    } else if (e.type === 'mousemove') {
      this.handleMouseMove(e)
    }
  }

  getTimeInSeconds = () => {
    return (this.props.totalTime / 100) * this.state.fakeTime
  }

  handleMouseDown = () => {
    this.setState({
      mouseDown: true
    })
  }

  handleMouseUp = () => {
    this.setState({
      mouseDown: false
    })
    
    this.props.onTimeChange(this.getTimeInSeconds())    
  }

  handleMouseMove = (e) => {
    if (this.state.mouseDown) {
      const percent = e.clientX / this.containerBar.getBoundingClientRect().right * 100

      this.setState({
        fakeTime: percent
      })            
    }
  }

  handleOnClick = (e) => {
    const percent = e.clientX / this.containerBar.getBoundingClientRect().right * 100

    this.setState({
      fakeTime: percent
    }, () => this.props.onTimeChange(this.getTimeInSeconds()) )   
  }

  render() {
    console.log("fake time : ", this.props.fakeTime)
    console.log("show me the percent: ", this.props.percent)
    return (
      <Container
        innerRef={bar => {this.containerBar = bar}}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        onClick={this.handleOnClick}
      >
        <Filled
          innerRef={bar => {this.fillingBar = bar}}
          percent={this.state.fakeTime || this.props.percent || 0}
        />
      </Container>
    )
  }
}

export default ReactOutsideEvent(TimeHandler, ['mouseup', 'mousemove'])
