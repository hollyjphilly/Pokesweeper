import React from 'react';
import * as Minesweeper from "./minesweeper";
import Board from "./board";


class Game extends React.Component {
    constructor() {
        super()
        this.state = {
            board: new Minesweeper.Board(10, 12)
        }
        this.updateGame = this.updateGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
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
        if(this.state.board.lost()) {
            return (
                <div>
                    <Board gameBoard={this.state.board} updateGame={this.updateGame} />
                    <div className="modal">
                        <section className="modal-screen"></section>
                        <div className="modal-box">
                            <img src="./src/assets/loss.png"/>
                            <img onClick={this.restartGame} src="./src/assets/restart.png" />
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.board.won()) {
            return (
                <div>
                    <Board gameBoard={this.state.board} updateGame={this.updateGame} />
                    <div className="modal">
                        <section className="modal-screen"></section>
                        <div className="modal-box">
                            <img src="./src/assets/win.png" />
                            <img onClick={this.restartGame} src="./src/assets/restart.png" />
                            </div>
                    </div>
                </div>
            )
        } else {
            return (
                <Board gameBoard={this.state.board} updateGame={this.updateGame}/>
            )
        }
    }
}

export default Game;