import React from "react";
import PropTypes from "prop-types";

const Dropdown = ({ dropdown, setDropdown }) => {
  return (
    <div className="dropdown" onClick={() => setDropdown(!dropdown)}>
      <span
        className={`dropbar ${dropdown ? "bar-1-open" : ""}`}
        id="drop-1"
      ></span>
      <span
        className={`dropbar ${dropdown ? "hidden" : ""}`}
        id="drop-2"
      ></span>
      <span
        className={`dropbar ${dropdown ? "bar-3-open" : ""}`}
        id="drop-3"
      ></span>
    </div>
  );
};

Dropdown.propTypes = {
  dropdown: PropTypes.bool,
  setDropdown: PropTypes.func,
};

export default Dropdown;
