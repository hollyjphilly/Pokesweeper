import React from 'react';
import Tile from './tile';

class Board extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                {this.props.gameBoard.grid.map((row, idx) => {
                    return (
                        <div className="row" key={idx}>
                        {row.map( (tile, idx2) => {
                        return <Tile updateGame={this.props.updateGame} myTile={tile} key={idx2}/>
                        })}
                        </div>
                    )
                })}
            </div>



        )
    }

}

export default Board;
