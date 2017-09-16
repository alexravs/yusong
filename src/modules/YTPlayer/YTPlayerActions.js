import { YTPLAYER_FETCH_SUCCESS, SET_TIME } from './YTPlayerConstants'

export const YTPlayerFetchSuccess = () => ({ type: YTPLAYER_FETCH_SUCCESS }) 

export const setTime = ({ current, total }) => ({
  type: SET_TIME,
  current,
  total
})