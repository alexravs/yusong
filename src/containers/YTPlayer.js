import React, { Component } from 'react'
import { connect } from 'react-redux'

import TimeHandlerContainer from './TimeHandlerContainer'
import { YTPlayerFetchSuccess, setTime, setTimerID, clearTimerID } from '../modules/YTPlayer/YTPlayerActions'

const IFRAME_API = "https://www.youtube.com/iframe_api"

const VIDEO_STATE = {
    started: 1
}

const loadIframePlayer = () => {
    const tag = document.createElement('script')
    tag.src = IFRAME_API
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
}

class YTPlayer extends Component {
    constructor (props) {
        super(props)
        this.player
        this.handleTimeChange = this.handleTimeChange.bind(this)
        window.onYouTubeIframeAPIReady = () => {            
            this.player = new window.YT.Player('player', {
                height: '360',
                width: '640',
                videoId: 'M7lc1UVf-VE',
                events: {
                    onReady: () => {
                        this.props.YTPlayerFetchSucess()
                    },
                    onStateChange: (e) => { 
                        // -1 : non démarré
                        // 0 : arrêté
                        // 1 : en lecture
                        // 2 : en pause
                        // 3 : en mémoire tampon
                        // 5 : en file d'attente
                        const pausedOrStopped = this.player.getPlayerState() === 2
                        if (e.data === VIDEO_STATE.started || (e.data === 3)) {
                            const timerID = window.setInterval(() => {
                                this.props.setTime({
                                    current: this.player.getCurrentTime(),
                                    total: this.player.getDuration()
                                })
                            }, 250)
                            this.props.setTimerID(timerID)
                        }

                        if (e.data === 0 || e.data === 2) {
                            this.props.timerID.forEach((id) => {
                                clearInterval(id)
                            })
                            this.props.clearTimerID()
                        }

                    }
                }
            })            
        }
    }

    componentDidMount() {
        loadIframePlayer()
    }

    handleTimeChange(timeInSecond) {
        this.player.seekTo(timeInSecond)
    }

    render() {
        return (
            <div>
                <div id="player" />
                <TimeHandlerContainer onTimeChange={this.handleTimeChange} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    timerID: state.YTPlayer.timerID
})

const mapDispatchToProps = (dispatch) => ({
    YTPlayerFetchSucess: () => dispatch(YTPlayerFetchSuccess()),
    setTime: ({ current, total }) => dispatch(setTime({ current, total })),
    setTimerID: (timerID) => dispatch(setTimerID(timerID)),
    clearTimerID: () => dispatch(clearTimerID())
})

export default connect(mapStateToProps, mapDispatchToProps)(YTPlayer)