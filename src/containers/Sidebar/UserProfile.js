/*jshint esversion: 9 */

import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {Link} from "react-router-dom";
import {userSignOut} from "appRedux/actions/Auth";
import placeholder from "../../assets/images/placeholder.jpg";

class UserProfile extends Component {

  render() {
    const {authUser} = this.props;
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li><Link to="/profile"> My Account </Link></li>
        <li onClick={() => this.props.userSignOut()}>Logout
        </li>
      </ul>
    );

    return (

      <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
        <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
          <Avatar 
            src={authUser && authUser.avatar? authUser.avatar : placeholder}
            className="gx-size-40 gx-pointer gx-mr-3" alt=""
          />
          <span className="gx-avatar-name gx-vertical-align-middle">
            <span className="gx-d-inline-block">
              {authUser ? authUser.display_name : "Loading"}
              <br />
              <span className="gx-text-white">{authUser ? authUser.role : null}</span>
            </span>
            {/* <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2  gx-vertical-align-bottom"/>  */}
          </span>
        </Popover>
      </div>

    )

  }
}

const mapStateToProps = ({auth}) => {
  const {authUser} = auth;
  return {authUser}
};

export default connect(mapStateToProps, {userSignOut})(UserProfile);
