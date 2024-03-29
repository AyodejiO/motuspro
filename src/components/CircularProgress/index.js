/*jshint esversion: 9 */

import React from "react";
import loader from "../../assets/images/loader.gif";

const CircularProgress = ({className}) => (
  <div className={`loader ${className}`}>
    <img src={loader} alt="loader"/>
  </div>
);

export default CircularProgress;
