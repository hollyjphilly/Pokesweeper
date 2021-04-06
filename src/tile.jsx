import React from 'react';

class Tile extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        let flag = false;
        if (e.shiftKey) { flag = true; };
        this.props.updateGame(this.props.myTile, flag);
    }

    render(){
        const tile = this.props.myTile;
        let text = "tile";
        let showNumber = (tile.explored && !tile.bombed) ? (tile.adjacentBombCount() ? tile.adjacentBombCount() : "") : "";
        if (tile.bombed && (tile.board.lost() || tile.board.won())) {text += " bombed"};
        if (tile.explored) {text += " explored"};
        if (tile.flagged) {text += " flagged"};
        return (
            <div className={text} onClick={this.handleClick}><div className="text">{showNumber}</div></div>
        )
    }

}

export default Tile;
