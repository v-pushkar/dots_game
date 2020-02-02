import React, { PureComponent } from "react";
import GameMatrix from "./../GameMatrix";
import { connect } from "react-redux";
import { onPlaygroundClick } from "./../../actions";
import "./PlayGround.scss";

class PlayGround extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      startGame: false
    };
  }

  onCellClick = e => {
    this.props.onCellClick(e.currentTarget.dataset.val);
  };
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    if (!this.props.gameMode) {
      return null;
    }
    if (this.props.gameMode) {
      return (
        <div className="PlayGroundWrapper">
          
          <GameMatrix
            matrix={this.props.playGroundArr}
            onCellClick={this.onCellClick}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  playGroundArr: state.playGround,
  gameMode: state.gameMode,
  isGameStart: state.isGameStart
});

const mapDispatchToProps = { onPlaygroundClick };

export default connect(mapStateToProps, mapDispatchToProps)(PlayGround);
