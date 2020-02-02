import React from "react";
import GameNav from "./../GameNav";
import PlayGround from "./../PlayGround";
import { connect } from "react-redux";
import {
  onPlaygroundClick,
  onGameStart,
  changePlayground,
  activeCellToState,
  onGameStop
} from "./../../actions";
import { createRandomNum, selectRumdomCell } from "./../../util";
import "./PlayGroundBox.scss";

class PlayGroundBox extends React.Component {
  runGame = (delay = 2000) => {
    this.props.onGameStart();
    this.gametimer = setInterval(this.gameIntervalStep, this.props.gameMode[1]);
  };
  gameIntervalStep = () => {
    const { activCell, clickedCell, playGroundArr } = this.props;
    const arr = [...playGroundArr];
    if (activCell && clickedCell != activCell) {
      arr[activCell.split("-")[0]][activCell.split("-")[1]] = -2;
    }
    const cell = selectRumdomCell(this.props.gameMode[0]);
    const { x, y } = cell;

    if (arr[y][x] === 0) {
      this.props.activeCellToState(`${y}-${x}`);
      arr[y][x] = -1;
      this.props.changePlayground(arr);
    } else {
      this.gameIntervalStep();
    }
  };
  stopGame = () => {
    clearInterval(this.gametimer);
    this.props.onGameStop();
  };
  onGameStart = () => {
    if (!this.props.isGameStart) {
      this.runGame();
    } else {
      this.stopGame();
    }
  };
  onCellClick = val => {
    const { activCell, playGroundArr } = this.props;

    if (activCell === val) {
      const arr = [...playGroundArr];
      arr[activCell.split("-")[0]][activCell.split("-")[1]] = 1;
      this.props.changePlayground(arr);
    }
    this.props.onPlaygroundClick(val);
  };
  render() {
    return (
      <div className="play-ground-box">
        <GameNav startGame={this.onGameStart} />
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
  activeCellToState,
  onGameStop
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayGroundBox);
