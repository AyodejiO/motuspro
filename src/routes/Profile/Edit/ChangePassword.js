/*jshint esversion: 6 */

import React, {Component} from "react";
import {connect} from "react-redux";
import Widget from "components/Widget";

import IntlMessages from "../../../util/IntlMessages";
import {changePasswd} from "appRedux/actions/Auth";
import {Alert, Button, Form, Input} from "antd";

const FormItem = Form.Item;

class ChangePassword extends Component {

  handleChangePassword = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) { 
        this.props.changePasswd(values);
      }
    });
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
    const {authUser, loading} = this.props;
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

    return (
        <Widget title="Change Password" styleName="gx-card-profile-sm">
          {authUser && authUser.account_verified_at? null : 
              (<Alert className="gx-my-3" message="You must change your default password to proceed" banner/>)
          }
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
                <Button type="primary" loading={loading} htmlType="submit">Submit</Button>
              </FormItem>
            </div>
          </Form>
        </Widget>
    );
  }
}
const ChangePasswordForm = Form.create()(ChangePassword);

const mapStateToProps = ({auth, commonData}) => {
  const {authUser} = auth;
  const {loading} = commonData;
  return {authUser, loading};
};

export default connect(mapStateToProps, {changePasswd})(ChangePasswordForm);


