import React from "react";
import DropDown from "./../UI/DropDown";
import "./GameNav.scss";
import { connect } from "react-redux";
import { onUserNameEnter, onModeSelect, onGameStart } from "./../../actions";

const GameNav = props => {
  const onNameEnter = e => {
    const val = e.currentTarget.value;
    props.onUserNameEnter(val);
  };
  const onModeSelect = val => {
    props.onModeSelect(val);
  };
  const modeOptions = Object.keys(props.gameSettings).map(key => ({
    label: key,
    value: `${props.gameSettings[key].field}-${props.gameSettings[key].delay}`
  }));
  const buttonNameAdd = () => {
    const { isGameStart, gameResalt } = props;
    if (props.isGameStart) {
      return "STOP";
    } else if (!isGameStart && gameResalt.name) {
      return "PLAY AGAN";
    } else {
      return "PLAY";
    }
  };
  return (
    <nav className="game-nav">
      <div className="control-wrap">
        <DropDown options={modeOptions} onModeSelect={onModeSelect} />
      </div>
      <div className="control-wrap">
        <input
          value={props.userName}
          type="text"
          onChange={onNameEnter}
          placeholder={"enter name for start"}
        ></input>
      </div>
      <div className="control-wrap">
        <button
          className="start-game-btn"
          onClick={props.startGame}
          disabled={props.gameMode && props.userName.length >= 3 ? false : true}
        >
          {buttonNameAdd()}
        </button>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  gameSettings: state.gameSettings,
  userName: state.userName,
  isGameStart: state.isGameStart,
  gameMode: state.gameMode,
  gameResalt: state.gameResalt
});

const mapDispatchToProps = { onUserNameEnter, onModeSelect, onGameStart };

export default connect(mapStateToProps, mapDispatchToProps)(GameNav);
