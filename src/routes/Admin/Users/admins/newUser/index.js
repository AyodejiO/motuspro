/*jshint esversion: 9 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Button, Card, Form, Icon, Input, Tooltip, Spin, notification} from "antd";

import IntlMessages from "../../../../../util/IntlMessages";
import {addAdminUser} from "../../../../../appRedux/actions/Users";

const FormItem = Form.Item;

class NewUser extends Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) { 
          this.props.addAdminUser(values);
        }
      });
    }
    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    openNotification = (type) => {
      notification[type]({
        message: 'Admin User Created',
        description: 'User created and has been notified.'
      });
    };

    goBack = () => {
      this.props.history.goBack()
    };

    GoBack = (
      <Button type="primary" size="default" icon="add" onClick={this.goBack}>
          <IntlMessages id="sidebar.cancel"/>
        </Button>
    );
  
    render() {
      const {getFieldDecorator} = this.props.form;
      const {createSuccess, loading} = this.props;
      if (createSuccess) {
          this.openNotification('success')
          return ( <Redirect to={'/users'}/> );
      }
      const formItemLayout = {
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 14},
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
        <Spin spinning={loading}>
          <Card className="gx-card" title="New User" extra={this.GoBack}>
            <br />
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
              {/* <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    Type&nbsp;
                    <Tooltip title="Admin?, Client? or Vendor?">
                    <Icon type="question-circle-o"/>
                  </Tooltip>
                </span>
                )}
              >
                {getFieldDecorator('user_type', {
                  rules: [{required: true, message: 'You must select a user type!', whitespace: true}],
                })(
                  <Select
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value="jack">Client</Option>
                    <Option value="lucy">Vendor</Option>
                    <Option value="tom">Admin</Option>
                  </Select>
                )}
              </FormItem> */}
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    Name&nbsp;
                    <Tooltip title="What is the name of the primary user?">
                    <Icon type="question-circle-o"/>
                  </Tooltip>
                </span>
                )}
              >
                {getFieldDecorator('name', {
                  rules: [{required: true, message: 'You must enter a name!', whitespace: true}],
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="E-mail"
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: true, message: 'Please input user E-mail!',
                  }],
                })(
                  <Input id="email1"/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Phone Number"
              >
                {getFieldDecorator('phone', {
                  rules: [{required: true, message: 'Please input user phone number!'}],
                })(
                  <Input style={{width: '100%'}}/>
                )}
              </FormItem>
              <br />
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Submit</Button>
              </FormItem>
            </Form>
          </Card>
        </Spin>
      );
    }
  
  }
  
const RegistrationForm = Form.create()(NewUser);
// export default RegistrationForm;

const mapStateToProps = ({auth, userData, commonData}) => {
  const {token} = auth;
  const {createSuccess} = userData;
  const {loading} = commonData;
  return {token, createSuccess, loading};
};

export default connect(mapStateToProps, {addAdminUser})(RegistrationForm);
