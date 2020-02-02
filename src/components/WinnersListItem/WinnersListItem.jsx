import React from "react";
import "./WinnersListItem.scss";

const WinnersListItem = props => (
  <div className="winners-list-item">
    <div className="winner-name">{props.name}</div>
    <div className="winner-date">{props.date}</div>
  </div>
);

export default WinnersListItem;
