import React, { Component } from 'react'
import { connect } from 'react-redux'

import TimeHandlerContainer from './TimeHandlerContainer'
import { YTPlayerFetchSuccess, setTime } from '../modules/YTPlayer/YTPlayerActions'

const IFRAME_API = "https://www.youtube.com/iframe_api"

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
        window.onYouTubeIframeAPIReady = () => {            
            this.player = new window.YT.Player('player', {
                height: '360',
                width: '640',
                videoId: 'M7lc1UVf-VE',
                events: {
                    onReady: () => {
                        this.props.YTPlayerFetchSucess()
                        window.setInterval(() => {
                            this.props.setTime({
                                current: this.player.getCurrentTime(),
                                total: this.player.getDuration()
                            })
                          }, 250)
                    }
                }
            })            
        }
    }

    componentDidMount() {
        loadIframePlayer()
    }

    render() {
        return (
            <div>
                <div id="player" />
                <TimeHandlerContainer />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    YTPlayerFetchSucess: () => dispatch(YTPlayerFetchSuccess()),
    setTime: ({ current, total }) => dispatch(setTime({ current, total }))
})

export default connect(null, mapDispatchToProps)(YTPlayer)