import React from "react";
import GameNav from "./../GameNav";
import PlayGround from "./../PlayGround";
import { connect } from "react-redux";
import {
  onPlaygroundClick,
  onGameStart,
  changePlayground,
  activeCellToState
} from "./../../actions";
import { createRandomNum, selectRumdomCell } from "./../../util";
import "./PlayGroundBox.scss";

class PlayGroundBox extends React.Component {
  runGame = (delay = 2000) => {
    this.gametimer = setInterval(this.myTimer, this.props.gameMode[1]);
  };
  myTimer = () => {
    const { activCell, clickedCell } = this.props;
    const arr = [...this.props.playGroundArr];
    if (activCell && clickedCell != activCell) {
      arr[activCell.split("-")[0]][activCell.split("-")[1]] = -2
      console.log(arr);
    }else if(activCell && clickedCell ===activCell){
      arr[activCell.split("-")[0]][activCell.split("-")[1]] = 1
    }
    const cell = selectRumdomCell(this.props.gameMode[0]);
    const { x, y } = cell;

    if (arr[y][x] === 0) {
      this.props.activeCellToState(`${y}-${x}`);
      arr[y][x] = -1;
      console.log("CELL", cell);
      this.props.changePlayground(arr);
    } else {
      this.myTimer();
    }
  };
  stopTimer = () => {
    clearInterval(this.gametimer);
  };
  onGameStart = () => {
    if (!this.props.isGameStart) {
      this.runGame();
    } else {
      this.stopTimer();
    }

    this.props.onGameStart();
  };
  onCellClick = val => {
    this.props.onPlaygroundClick(val);
  };
  render() {
    return (
      <div className="play-ground-box">
        <GameNav startGame={this.onGameStart} />
        <div>
          <div>activCell: {this.props.activCell}</div>
          <div>clickedCell: {this.props.clickedCell}</div>
          <div>catch: {this.props.clickedCell === this.props.activCell? "true":"false"}</div>
        </div>
        <PlayGround onCellClick={this.onCellClick} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playGroundArr: state.playGround,
  gameMode: state.gameMode,
  isGameStart: state.isGameStart,
  activCell: state.activCell,
  clickedCell: state.clickedCell
});

const mapDispatchToProps = {
  onPlaygroundClick,
  onGameStart,
  changePlayground,
  onPlaygroundClick,
  activeCellToState
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayGroundBox);
