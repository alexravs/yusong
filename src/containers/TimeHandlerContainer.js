import React, { Component } from 'react'
import { connect } from 'react-redux'

import TimeHandler from '../components/TimeHandler'
import { getVideoTimeInPercent } from '../modules/YTPlayer/YTPlayerSelectors'

class TimeHandlerContainer extends Component {

  render() {
    return (
      <TimeHandler percent={this.props.percent} />
    )
  }
}

const mapStateToProps = (state) => ({
  YTIframeFetched: state.YTPlayer.ready,
  percent: getVideoTimeInPercent(state)
})

export default connect(mapStateToProps)(TimeHandlerContainer)