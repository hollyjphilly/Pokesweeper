import React from 'react';
import * as Minesweeper from "./minesweeper";
import Board from "./board";
import Stopwatch from './stopwatch';


class Game extends React.Component {
    constructor() {
        super()
        this.state = {
            board: new Minesweeper.Board(10, 12),
            startedPlaying: false,
            currentTime: 0,
            startTime: 0,
        }
        this.updateGame = this.updateGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.startGame = this.startGame.bind(this);
        this.handleTime = this.handleTime.bind(this);
    }

    handleTime(currentTimeValue, startTimeValue) {
        this.setState({
            currentTime: currentTimeValue,
            startTime: startTimeValue,
        })
    }

    startGame() {
        this.setState({
            startedPlaying: true,
        })
    }

    restartGame() {
        this.setState({
            board: new Minesweeper.Board(10, 12)
        })
    }

    updateGame(tile, flag) {
        if (!flag) { 
            tile.explore();
        } else {
            tile.toggleFlag();
        }
        this.setState({
            board: this.state.board
        })
    }

    render() {
        const { currentTime } = this.state;
        let centiseconds = ("0" + (Math.floor(currentTime / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(currentTime / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(currentTime / 60000) % 60)).slice(-2);
        if(this.state.board.lost()) {
            return (
                <div>
                    <Board gameBoard={this.state.board} updateGame={this.updateGame} />
                    <div className="stopwatch">
                        {minutes}:{seconds}:{centiseconds}
                    </div>
                    <div className="modal">
                        <section className="modal-screen"></section>
                        <div className="modal-box">
                            <img src="./src/assets/loss.png"/>
                            <img onClick={this.restartGame} src="./src/assets/restart.png" />
                            <div className="stopwatch-after" id="loss-time">
                                {minutes}:{seconds}:{centiseconds}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.board.won()) {
            return (
                <div>
                    <Board gameBoard={this.state.board} updateGame={this.updateGame} />
                    <div className="stopwatch">
                        {minutes}:{seconds}:{centiseconds}
                    </div>
                    <div className="modal">
                        <section className="modal-screen"></section>
                        <div className="modal-box">
                            <img src="./src/assets/win.png" />
                            <img onClick={this.restartGame} src="./src/assets/restart.png" />
                            <div className="stopwatch-after">
                                {minutes}:{seconds}:{centiseconds}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            const startScreen = 
                <div className="modal-start">
                    <img src="./src/assets/openingScreen.png" />
                    <img onClick={this.startGame} src="./src/assets/playbutton.png" />
                </div>
            const timer = 
                <Stopwatch autoStart={true} onTimeAdjust={this.handleTime} />
            return (<>
                <Board gameBoard={this.state.board} updateGame={this.updateGame}/>
                {this.state.startedPlaying ? timer : startScreen}
            </>)
        }
    }
}

export default Game;