import React from "react";
import PropTypes from "prop-types";
import "./GameMatrix.scss";

const GameMatrix = props => {
  return (
    <div className="GameMatrixWrapper">
      <table className="game-matrix">
        <tbody>
          {props.matrix.map((row, i) => (
            <tr key={"row" + i}>
              {row.map((cell, idx) => (
                <td
                  onClick={props.onCellClick}
                  key={i + "-" + idx}
                  data-val={i + "-" + idx}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameMatrix;
