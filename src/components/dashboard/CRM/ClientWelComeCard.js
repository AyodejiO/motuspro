import React from "react";
import {Icon} from "antd";

const ClientWelComeCard = ({authUser}) => {

  return (
    <div className="gx-wel-ema gx-pt-xl-2">
      <h1 className="gx-mb-3">Welcome {authUser.display_name}!</h1>
      <p className="gx-fs-sm gx-text-uppercase">You Have</p>
      <ul className="gx-list-group">
        <li>
          <Icon type="mail"/>
          <span>2 Pending bids</span>
        </li>
        <li>
          <Icon type="profile"/>
          <span>7 Due tasks</span>
        </li>
        <li>
          <Icon type="bell"/>
          <span>3 Other notifications</span>
        </li>
      </ul>
    </div>

  );
};

export default ClientWelComeCard;
