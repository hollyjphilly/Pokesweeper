import React, { Component } from 'react'

export default class Stopwatch extends Component {
    constructor (props) {
        super(props)
        this.state = {
            on: false,
            currentTime: 0,
            startTime: 0,
        };
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
    }
    
    start() {
        this.setState({
            on: true,
            currentTime: this.state.currentTime,
            startTime: Date.now() - this.state.currentTime
        });
        this.ticker = setInterval(() => {
            this.setState({
                currentTime: Date.now() - this.state.startTime
            })
        }, 10)
    }

    stop() {
        this.setState({ on: false });
        clearInterval(this.ticker);
    }

    reset() {
        this.setState({
            startTime: 0,
            currentTime: 0,
        });
    }

    componentDidMount() {
        this.props.autoStart ? this.start() : null;
    }

    componentWillUnmount() {
        this.props.onTimeAdjust(this.state.currentTime, this.state.startTime)
    }

    render() {
        const { currentTime } = this.state;
        let centiseconds = ("0" + (Math.floor(currentTime / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(currentTime / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(currentTime / 60000) % 60)).slice(-2);
        return (
            <div className="stopwatch">
                {minutes}:{seconds}:{centiseconds}
            </div>
        )
    }
}
