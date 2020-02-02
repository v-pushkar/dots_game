import React from "react";
import PropTypes from "prop-types";
import "./GameMatrix.scss";

const GameMatrix = props => {
  const colorClassAdd = cell => {
    if (cell === -1) {
      return "blue";
    }
    if (cell === -2) {
      return "red";
    }
    if (cell === 1) {
      return "green";
    }
  };
  return (
    <div className="GameMatrixWrapper">
      <table className="game-matrix">
        <tbody>
          {props.matrix.map((row, i) => (
            <tr key={"row" + i}>
              {row.map((cell, idx) => (
                <td
                  className={colorClassAdd(cell)}
                  onClick={props.onCellClick}
                  key={i + "-" + idx}
                  data-val={i + "-" + idx}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameMatrix;
