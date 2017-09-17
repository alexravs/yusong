import { YTPLAYER_FETCH_SUCCESS, SET_TIME, SET_TIMER_ID, CLEAR_TIMER_ID } from './YTPlayerConstants'

export const YTPlayerFetchSuccess = () => ({ type: YTPLAYER_FETCH_SUCCESS }) 

export const setTime = ({ current, total }) => ({
  type: SET_TIME,
  current,
  total
})

export const setTimerID = (timerID) => ({
  type: SET_TIMER_ID,
  timerID
})

export const clearTimerID = () => ({ type: CLEAR_TIMER_ID })