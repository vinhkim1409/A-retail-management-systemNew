import React, { useState } from "react";
import "./TagShowTotal.scss";
import { Divider } from "@mui/material";
import { color } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
const namez = " Customers";
const TagShowTotal = (props) => {
  return (
    <div className="TagShowTotal-container">
      <div className="circle"></div>
      <div className="infor">
        <div className="name">Total {props.name}</div>
        <div className="num">{props.number}</div>
        <div className="more">{props.per} This month</div>
      </div>
      <div className="icon">
        <FontAwesomeIcon icon={faUserGroup} />
      </div>
    </div>
  );
};
export default TagShowTotal;
