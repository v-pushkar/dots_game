import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./DropDown.scss";

const DropDown = props => {
  const onSelect = e => {
    props.onModeSelect(e.value);
  };
  const options = props.options
  const defaultOption = options[0];
  const isDisabled = !options.length > 0;
  return (
    <Dropdown
      disabled={isDisabled}
      className="drop-control"
      options={options}
      onChange={onSelect}
      // value={defaultOption}
      placeholder="Pic game mode"
    />
  );
};

DropDown.propTypes = {
  // bla: PropTypes.string,
};

DropDown.defaultProps = {
  // bla: 'test',
};

export default DropDown;
