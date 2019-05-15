/*jshint esversion: 6 */

import React, {Component} from "react";
import {Col, Row} from "antd";
import {Avatar} from "antd";
import placeholder from "assets/images/placeholder.jpg";
import {connect} from "react-redux";
import Widget from "components/Widget";

import IntlMessages from "../../../util/IntlMessages";
import Auxiliary from "../../../util/Auxiliary";
import {getUserProfile} from "appRedux/actions/Profile";
import {Button, Form, Input} from "antd";

const FormItem = Form.Item;

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
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 24},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 24},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 20,
        },
        sm: {
          span:24,
          offset: 20,
        },
      },
    };

    const {authUser} = this.props;
    return (
      <Auxiliary>
        <div className="gx-profile-banner">
          <div className="gx-profile-container">
            <div className="gx-profile-banner-top">
              <div className="gx-profile-banner-top-left">
                <div className="gx-profile-banner-avatar">
                  <Avatar className="gx-size-90" alt="..." src={authUser.avatar || placeholder}/>
                </div>
                <div className="gx-profile-banner-avatar-info">
                  <h2 className="gx-mb-2 gx-mb-sm-3 gx-fs-xxl gx-font-weight-light">{authUser.name}</h2>
                </div>
              </div>
            </div>
            <div className="gx-profile-banner-bottom"> 
              <span className="gx-link gx-profile-setting"> 
                <i className="icon icon-close-circle gx-fs-lg gx-mr-2 gx-mr-sm-3 gx-d-inline-flex gx-vertical-align-middle"/>
                <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">Cancel</span>
              </span>
            </div>
          </div>
        </div>
        <div className="gx-profile-content">
          <Row>
            <Col xl={12} lg={14} md={14} sm={24} xs={24}>
              <Widget title="Edit Personal Details " styleName="gx-card-profile-sm">
                <Form layout="vertical" className="gx-mt-4" onSubmit={this.handleChangePassword}>
                  <div>
                    <FormItem
                      {...formItemLayout}
                      label={(
                        <span>
                        Name&nbsp;
                      </span>
                      )}
                    >
                      {getFieldDecorator('name', {
                        rules: [{required: true, message: 'Please input your name!', whitespace: true}],
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label={(
                        <span>
                        Phone&nbsp;
                      </span>
                      )}
                    >
                      {getFieldDecorator('phone', {
                        rules: [{required: true, message: 'Please input your phone number!', whitespace: true}],
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                      <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>
                  </div>
                </Form>
              </Widget>
            </Col>

            <Col xl={12} lg={10} md={10} sm={24} xs={24}>
              <Widget title="Change Password" styleName="gx-card-profile-sm">
              <Form layout="vertical" className="gx-mt-4" onSubmit={this.handleChangePassword}>
                  <div>
                    <FormItem
                      {...formItemLayout}
                      label={(
                        <span>
                        Old Password&nbsp;
                      </span>
                      )}
                    >
                      {getFieldDecorator('old_password', {
                        rules: [{required: true, message: 'Please input your old password!', whitespace: true}],
                      })(
                        <Input type="password"/>
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label={(
                        <span>
                        New Password&nbsp;
                      </span>
                      )}
                    >
                      {getFieldDecorator('new_password', {
                        rules: [{required: true, message: 'Please input a new password!', whitespace: true}],
                      })(
                        <Input type="password"/>
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label={(
                        <span>
                        Confirm Password&nbsp;
                      </span>
                      )}
                    >
                      {getFieldDecorator('confirm_password', {
                        rules: [{required: true, message: 'Please confirm your new password!', whitespace: true}],
                      })(
                        <Input type="password"/>
                      )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                      <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>
                  </div>
                </Form>
              </Widget>
            </Col>
          </Row>
        </div>
      </Auxiliary>
    );
  }
}
const EditProfileForm = Form.create()(EditProfile);

const mapStateToProps = ({auth, profileData}) => {
  const {authUser} = auth;
  const {profile} = profileData;
  return {authUser, profile};
};

export default connect(mapStateToProps, {getUserProfile})(EditProfileForm);


