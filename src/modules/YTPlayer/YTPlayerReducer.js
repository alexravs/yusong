import { combineReducers } from 'redux'

import { YTPLAYER_FETCH_SUCCESS, SET_TIME } from './YTPlayerConstants'

const ready = (state = false, action) => {
  switch (action.type) {
    case YTPLAYER_FETCH_SUCCESS:
      return true
    default:
      return state
  }
}

const current = (state = 0, action) => {
  switch (action.type) {
    case SET_TIME:
      return action.current
    default:
      return state
  }
}

const total = (state = 0, action) => {
  switch (action.type) {
    case SET_TIME:
      return action.total
    default:
      return state
  }
}

export default combineReducers({
  ready,
  current,
  total
})