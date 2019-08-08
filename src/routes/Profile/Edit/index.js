/*jshint esversion: 9 */

import React, {Component} from "react";
import {Col, Row} from "antd";
// import {Avatar} from "antd";
// import placeholder from "assets/images/placeholder.jpg";
import {connect} from "react-redux";

import IntlMessages from "../../../util/IntlMessages";
import Auxiliary from "../../../util/Auxiliary";
import {Button} from "antd";

import ChangePassword from "./ChangePassword";
import EditAvatar from "./EditAvatar";
import EditPersonalDetails from "./EditPersonalDetails";
import SweetAlert from "react-bootstrap-sweetalert";
import {userSignOut} from "appRedux/actions/Auth";
import {changeAvatar} from "appRedux/actions/Auth";
import {getUserProfile} from "appRedux/actions/Profile";

class EditProfile extends Component {

  componentDidMount () {
    this.props.getUserProfile();
  }

  goBack = () => {
    this.props.history.goBack();
  };

  GoBack = (
    <Button type="primary" size="small" icon="add" onClick={this.goBack}>
        <IntlMessages id="sidebar.cancel"/>
      </Button>
  );

  render() {
    const {authUser, passwdChanged} = this.props;
    return (
      <Auxiliary>
        <div className="gx-profile-banner">
          <div className="gx-profile-container">
            <div className="gx-profile-banner-top">
              <div className="gx-profile-banner-top-left">
                <div className="gx-profile-banner-avatar">
                  <EditAvatar upload={this.props.changeAvatar} />
                  {/* <Upload name="logo" action="/upload.do" listType="picture">
                    <Avatar className="gx-size-90" alt="..." src={authUser.avatar || placeholder}/>
                  </Upload> */}
                </div>
                <div className="gx-profile-banner-avatar-info">
                  <h2 className="gx-mb-1 gx-mb-sm-2 gx-fs-xxl gx-font-weight-light">{authUser.name}</h2>
                  <p className="gx-mb-0 gx-fs-lg gx-text-secondary">{authUser.email}</p>
                </div>
              </div>
            </div>
            <div className="gx-profile-banner-bottom"> 
              <span className="gx-link gx-profile-setting" onClick={this.goBack}> 
                <i className="icon icon-close-circle gx-fs-lg gx-mr-2 gx-mr-sm-3 gx-d-inline-flex gx-vertical-align-middle"/>
                <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">Cancel</span>
              </span>
            </div>
          </div>
        </div>
        <div className="gx-profile-content">
        <SweetAlert show={passwdChanged} success title="Password Changed"
                    onConfirm={this.props.userSignOut}>
          <span>You will be logged out.</span>
        </SweetAlert>
          <Row>
            {!authUser.account_verified_at? null : 
              (<Col xl={12} lg={14} md={14} sm={24} xs={24}>
                <EditPersonalDetails />
              </Col>)
            }
            <Col xl={12} lg={10} md={10} sm={24} xs={24}>
              <ChangePassword />
            </Col>
          </Row>
        </div>
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({auth, profileData}) => {
  const {authUser, passwdChanged} = auth;
  const {profile} = profileData;
  return {authUser, passwdChanged, profile};
};

export default connect(mapStateToProps, {changeAvatar, getUserProfile, userSignOut})(EditProfile);


