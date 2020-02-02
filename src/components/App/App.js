import React, { useEffect } from "react";
import WinnerListBox from "./../WinnersListBox";
import PlayGround from "./../PlayGroundBox";
import { connect } from "react-redux";
import GetData from "./../../dataServices";
import { winnersListToState, getGameSettings } from "./../../actions";
import "./App.scss";
const getData = new GetData();

const App = props => {

  const getDataFronServer = (url)=>{
    getData
    .getDataFromServer(url)
    .then(data => {
      if(url==="winners"){
        props.winnersListToState(data);
      }
      if(url==="game-settings"){
        props.getGameSettings(data)
      }
      
    })
    .then(() => {})
    .catch();

  }
  useEffect(() => {
    getDataFronServer("winners")
    getDataFronServer("game-settings")
  }, []);
  return (
    <div className="App">
      <h1>Game In Dots</h1>
      <div className="main-container">
        <PlayGround />
        <WinnerListBox />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  winnersList: state.winnersList,
  storeState: state
});

const mapDispatchToProps = {
  winnersListToState,getGameSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
