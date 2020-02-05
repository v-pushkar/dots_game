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
  onGetWinner,
  winnersListToState
} from "./../../actions";
import { selectRumdomCell, checkGameStatus, getDate } from "./../../util";
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
    if (activCell && clickedCell !== activCell) {
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
    const { onGetWinner, userName, isGameStart } = this.props;
    const startus = checkGameStatus(arr);
    if (startus && isGameStart) {
      onGetWinner(startus);
      const winnerName = startus === "user" ? userName : "Computer";
      this.saveGameResalt(winnerName);
      this.stopGame();
    } else {
      return;
    }
  };
  saveGameResalt = winnerName => {
    fetch("https://starnavi-frontend-test-task.herokuapp.com/winners", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        winner: winnerName,
        date: getDate()
      })
    })
      .then(res => res.json())
      .then(data => {
        this.props.winnersListToState(data);
      })
      .catch(err => {
        console.log("ERROR:", err);
      });
  };
  onCellClick = val => {
    if (this.props.isGameStart) {
      const { activCell, playGroundArr } = this.props;
      const arr = [...playGroundArr];
      if (activCell === val) {
        arr[activCell.split("-")[0]][activCell.split("-")[1]] = 1;
        this.props.changePlayground(arr);
      }
      this.props.onPlaygroundClick(val);
      this.isWinnerGet(arr);
    } else {
      return;
    }
  };

  render() {
    return (
      <div className="play-ground-box">
        <GameNav startGame={this.onGameStart} />
        <div className="info">
          *select game mode and enter you name for start
        </div>
        <div className="message-row">
          {this.props.winner && (
            <h3>
              {this.props.winner === "user"
                ? `Congratulations ${this.props.gameResalt.name},you are the winner!!!`
                : "Sorry, you lost. You can try again"}
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
  gameResalt: state.gameResalt,
  userName: state.userName,
  winner: state.winner
});

const mapDispatchToProps = {
  onPlaygroundClick,
  onGameStart,
  changePlayground,
  activeCellToState,
  onGameStop,
  onGetWinner,
  winnersListToState
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayGroundBox);
