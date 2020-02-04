import React from "react";
import WinnersListItem from "./../WinnersListItem";
import { connect } from "react-redux";
import "./WinnersListBox.scss";

const WinnersListBox = props => {
  return (
    <div className="winners-list-box">
      {props.winnersList ? (
        props.winnersList.map(it => (
          <WinnersListItem
            key={it.id}
            name={it.winner}
            date={it.date}
          ></WinnersListItem>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  winnersList: state.winnersList
});

export default connect(mapStateToProps, null)(WinnersListBox);
