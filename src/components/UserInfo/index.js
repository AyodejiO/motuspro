import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {Link} from "react-router-dom";
import {userSignOut} from "appRedux/actions/Auth";
import placeholder from "assets/images/placeholder.jpg";

class UserInfo extends Component {

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
      <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions}
               trigger="click">
        <Avatar src={authUser.avatar || placeholder}
                className="gx-avatar gx-pointer" alt=""/>
      </Popover>
    )

  }
}

const mapStateToProps = ({auth}) => {
  const {authUser} = auth;
  return {authUser}
};

export default connect(mapStateToProps, {userSignOut})(UserInfo);
