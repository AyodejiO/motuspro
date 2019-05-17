/*jshint esversion: 6 */

import React, {Component} from "react";
import {Col, Row} from "antd";
import {connect} from "react-redux";
import Client from "components/profile/Client/index";
import Contact from "components/profile/Contact/index";

import {friendList} from '../data';
import Team from "components/profile/Team/index";
import Auxiliary from "../../../util/Auxiliary";
import {getUserProfile} from "appRedux/actions/Profile";
import ProfileHeader from "components/profile/ProfileHeader/index";

class MainProfile extends Component {

  componentDidMount () {
    this.props.getUserProfile();
  }

  render() {
    const {authUser} = this.props;
    return (
      <Auxiliary>
        <ProfileHeader user={authUser} />
        <div className="gx-profile-content">
          <Row>
            <Col xl={16} lg={14} md={14} sm={24} xs={24}>
              <Client/>
            </Col>

            <Col xl={8} lg={10} md={10} sm={24} xs={24}>
              <Contact user={authUser} />
              <Row>
                <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                  <Team friendList={friendList}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({auth, profileData}) => {
  const {authUser} = auth;
  const {profile} = profileData;
  return {authUser, profile};
};

export default connect(mapStateToProps, {getUserProfile})(MainProfile);


