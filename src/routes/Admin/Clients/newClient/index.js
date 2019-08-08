/*jshint esversion: 9 */
import React, {Component} from "react";
import {connect} from "react-redux";

import {Redirect} from "react-router-dom";
import {Button, Card, Form, Icon, Input, Tooltip, Spin, notification} from "antd";

import IntlMessages from "../../../../util/IntlMessages";
import {addClient, addClientForm} from "../../../../appRedux/actions/Clients";

const FormItem = Form.Item;

class NewClient extends Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) { 
          this.props.addClient(values);
        }
      });
    }
    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    openNotification = (type) => {
      notification[type]({
        message: 'Client Created',
        description: 'Client and User account created successfully.'
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
          this.openNotification('success');
          this.props.addClientForm();
          return ( <Redirect to={'/clients'}/> );
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
          <Card className="gx-card" title="New Client" extra={this.GoBack}>
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
              <div>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                    Client Name&nbsp;
                      <Tooltip title="What do you refer to this client as?">
                      <Icon type="question-circle-o"/>
                    </Tooltip>
                  </span>
                  )}
                >
                  {getFieldDecorator('client_name', {
                    rules: [{required: true, message: 'Please input the Client name!', whitespace: true}],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                      User Name&nbsp;
                      <Tooltip title="What is the name of the primary user?">
                      <Icon type="question-circle-o"/>
                    </Tooltip>
                  </span>
                  )}
                >
                  {getFieldDecorator('admin_name', {
                    rules: [{required: true, message: 'You must enter a User!', whitespace: true}],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="User E-mail"
                >
                  {getFieldDecorator('admin_email', {
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
                  {getFieldDecorator('admin_phone', {
                    rules: [{required: true, message: 'Please input user phone number!'}],
                  })(
                    <Input style={{width: '100%'}}/>
                  )}
                </FormItem>
              </div>
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
  
const RegistrationForm = Form.create()(NewClient);
// export default RegistrationForm;

const mapStateToProps = ({auth, clientData, commonData}) => {
  const {token} = auth;
  const {createSuccess} = clientData;
  const {loading} = commonData;
  return {token, createSuccess, loading};
};

export default connect(mapStateToProps, {addClient, addClientForm})(RegistrationForm);
