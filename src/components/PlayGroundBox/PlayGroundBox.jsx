import React from "react";
import GameNav from "./../GameNav";
import PlayGround from "./../PlayGround";
import { connect } from "react-redux";
import {
  onPlaygroundClick,
  onGameStart,
  changePlayground,
  activeCellToState,
  onGameStop,
  onGetWinner
} from "./../../actions";
import { selectRumdomCell } from "./../../util";
import "./PlayGroundBox.scss";

class PlayGroundBox extends React.Component {
  runGame = (delay = 2000) => {
    this.props.onGameStart();
    this.gametimer = setInterval(this.gameIntervalStep, this.props.gameMode[1]);
  };
  gameIntervalStep = () => {
    const { activCell, clickedCell, playGroundArr, gameMode } = this.props;
    const arr = [...playGroundArr];
    this.isWinnerGet(arr);
    if (activCell && clickedCell != activCell) {
      arr[activCell.split("-")[0]][activCell.split("-")[1]] = -2;
    }
    const cell = selectRumdomCell(gameMode[0]);
    const { x, y } = cell;

    if (arr[y][x] === 0) {
      this.props.activeCellToState(`${y}-${x}`);
      arr[y][x] = -1;
      this.props.changePlayground(arr);
    } else {
      this.gameIntervalStep();
    }
    this.isWinnerGet(arr);
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
  isWinnerGet = arr => {
    const checkedArr = arr.reduce((acc, it) => [...acc, ...it]);
    const minWinPoints = Math.ceil(checkedArr.length / 2);
    let userWins = 0;
    let computerWins = 0;
    checkedArr.forEach(it => {
      if (it === 1) {
        userWins += 1;
      }
      if (it === -2) {
        computerWins += 1;
      }
    });
    if (userWins >= minWinPoints || computerWins >= minWinPoints) {
      this.stopGame();
    }
  };
  onCellClick = val => {
    const { activCell, playGroundArr } = this.props;
    const arr = [...playGroundArr];
    if (activCell === val) {
      arr[activCell.split("-")[0]][activCell.split("-")[1]] = 1;
      this.props.changePlayground(arr);
    }
    this.props.onPlaygroundClick(val);
    this.isWinnerGet(arr);
  };
  render() {
    return (
      <div className="play-ground-box">
        <GameNav startGame={this.onGameStart} />
        <div className="info">
          *select game mode and enter you name for start
        </div>
        <div className="message-row">
          {this.props.gameResalt && (
            <h3>
              {this.props.gameResalt.winner === this.props.gameResalt.name
                ? `congratulations ${this.props.gameResalt.name},you are the winner!!!`
                : "Sorry, you lost. Try again"}
            </h3>
          )}
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
  clickedCell: state.clickedCell,
  gameResalt: state.gameResalt
});

const mapDispatchToProps = {
  onPlaygroundClick,
  onGameStart,
  changePlayground,
  onPlaygroundClick,
  activeCellToState,
  onGameStop,
  onGetWinner
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayGroundBox);
