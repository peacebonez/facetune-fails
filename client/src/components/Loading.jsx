import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color }) => (
  <ReactLoading
    type={type}
    color={color}
    style={{ width: 50, margin: "25px", display: "block" }}
    alt="Loading..."
  />
);
export default Loading;
