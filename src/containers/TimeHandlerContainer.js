import React, { Component } from 'react'
import { connect } from 'react-redux'

import TimeHandler from '../components/TimeHandler'
import { getVideoTimeInPercent } from '../modules/YTPlayer/YTPlayerSelectors'

const mapStateToProps = (state) => ({
  percent: getVideoTimeInPercent(state)
})

export default connect(mapStateToProps)(TimeHandler)