/*jshint esversion: 6 */

import React, {Component} from "react";
import {connect} from "react-redux";
import Widget from "components/Widget";

import {getUserProfile} from "appRedux/actions/Profile";
import {Button, Form, Input} from "antd";

const FormItem = Form.Item;

class EditPersonalDetails extends Component {

  handleEditProfile = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) { 
        this.props.addClient(values);
      }
    });
  }

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

    // const {authUser} = this.props;
    return (
      <Widget title="Edit Personal Details " styleName="gx-card-profile-sm">
        <Form layout="vertical" className="gx-mt-4" onSubmit={this.handleEditProfile}>
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
    );
  }
}
const EditPersonalDetailsForm = Form.create({
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.authUser.name,
        value: props.authUser.name,
      }),
      phone: Form.createFormField({
        ...props.authUser.phone,
        value: props.authUser.phone,
      }),
    };
  }
})(EditPersonalDetails);

const mapStateToProps = ({auth}) => {
  const {authUser} = auth;
  return {authUser};
};

export default connect(mapStateToProps, {getUserProfile})(EditPersonalDetailsForm);


