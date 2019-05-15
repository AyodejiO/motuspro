/*jshint esversion: 6 */

import "./index.less";
import React, {Component} from "react";
import {connect} from "react-redux";

import {Redirect} from "react-router-dom";
import {Button, Card, Form, Icon, Input, Tooltip, Spin, Row, Col, notification} from "antd";

import IntlMessages from "../../../../util/IntlMessages";
import {addOrder, addOrderForm} from "../../../../appRedux/actions/Orders";

import './index.less';

const FormItem = Form.Item;
const {TextArea} = Input;

class NewOrder extends Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };

    add = () => {
      const {form} = this.props;
      // can use data-binding to get
      const items = form.getFieldValue('items');
      const nextItems = items.concat({description: '', size: '', quantity: '', category: ''});
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        items: nextItems,
      });
    };

    remove = (i) => {
      const {form} = this.props;
      // can use data-binding to get
      const items = form.getFieldValue('items');
      // We need at least one passenger
      if (items.length === 1) {
        return;
      }
  
      // can use data-binding to set
      form.setFieldsValue({
        items: items.filter(item => item !== i),
      });
    };

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) { 
          this.props.addOrder(values);
        }
      });
    };

    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    openNotification = (type) => {
      notification[type]({
        message: 'Order Created',
        description: 'Order and User account created successfully.'
      });
    };

    goBack = () => {
      this.props.history.goBack();
    };

    GoBack = (
      <Button type="primary" size="default" icon="add" onClick={this.goBack}>
          <IntlMessages id="sidebar.cancel"/>
        </Button>
    );
  
    render() {
      const {getFieldDecorator, getFieldValue} = this.props.form;
      getFieldDecorator('items', {initialValue: [{description: '', size: '', quantity: '', category: ''}]});
      const items = getFieldValue('items');
      const {createSuccess, loading} = this.props;
      if (createSuccess) {
          this.openNotification('success');
          this.props.addOrderForm();
          return ( <Redirect to={'/orders'}/> );
      }
      const formItemLayout = {
        labelCol: {
          xs: {span: 24},
          sm: {span: 6},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 17},
        },
      };
      const formItemLayout2 = {
        labelCol: {
          xs: {span: 0},
          sm: {span: 0},
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
        <Spin spinning={loading}>
          <Card className="gx-card" title="New Order" extra={this.GoBack}>
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
              <div>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                    Reference No.&nbsp;
                      <Tooltip title="Use organization reference number. Must be unique?">
                      <Icon type="question-circle-o"/>
                    </Tooltip>
                  </span>
                  )}
                >
                  {getFieldDecorator('client_ref', {
                    rules: [{required: true, message: 'Please input a reference number!', whitespace: true}],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                      Description&nbsp;
                      <Tooltip title="What is the name of the primary user?">
                      <Icon type="question-circle-o"/>
                    </Tooltip>
                  </span>
                  )}
                >
                  {getFieldDecorator('order_desc', {
                    rules: [{required: true, message: 'You must enter a User!', whitespace: true}],
                  })(
                    <TextArea rows={4} columns={2}/>
                  )}
                </FormItem>
                <legend><h3>Items</h3></legend>
               { items.map((item, index) => 
                    (
                      <div className="pdynamic" key={index}>
                        <Row className="border">
                          <Col lg={12} md={12} sm={24} xs={24}>
                            <FormItem
                              {...formItemLayout2}
                              required={false}
                            >
                              {getFieldDecorator(`${item}.category`, {
                                rules: [{
                                  required: true,
                                  whitespace: true,
                                  message: "Please input passenger's name or delete this field.",
                                }],
                              })(
                                <Input placeholder="Category"/>
                              )}                       
                            </FormItem>
                          </Col>
                          <Col lg={12} md={12} sm={24} xs={24}>
                            <FormItem
                              {...formItemLayout2}
                              required={false}
                            >
                              {getFieldDecorator(`${item}.size`, {
                                rules: [{
                                  required: true,
                                  whitespace: true,
                                  message: "Please input passenger's name or delete this field.",
                                }],
                              })(
                                <Input placeholder="Size"/>
                              )}                       
                            </FormItem>
                          </Col>
                          <Col lg={12} md={12} sm={24} xs={24}>
                            <FormItem
                              {...formItemLayout2}
                              required={false}
                            >
                              {getFieldDecorator(`${item}.quantity`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                  required: true,
                                  whitespace: true,
                                  message: "Please input passenger's name or delete this field.",
                                }],
                              })(
                                <Input placeholder="Quantity"/>
                              )}                       
                            </FormItem>
                          </Col>
                          <Col lg={12} md={12} sm={24} xs={24}>
                            <FormItem
                              {...formItemLayout2}
                              required={false}
                            >
                              {getFieldDecorator(`${item}.description`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                  required: true,
                                  whitespace: true,
                                  message: "Please input passenger's name or delete this field.",
                                }],
                              })(
                                <Input placeholder="Description"/>
                              )}                       
                            </FormItem>
                          </Col>
                          <Col lg={24} md={24} sm={24} xs={24}>
                            {items.length > 1 ? (<FormItem {...formItemLayout}>
                              <Button type="dashed" onClick={this.add} style={{width: '40%'}}>
                                <Icon type="minus-circle-o"/> Remove Item
                              </Button>
                            </FormItem>) : null}
                          </Col>
                        </Row>
                      </div>
                  )
               )}
              </div>
              <br />
              <FormItem {...formItemLayout}>
                <Button type="dashed" onClick={this.add} style={{width: '40%'}}>
                  <Icon type="plus"/> Add Item
                </Button>
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Submit</Button>
              </FormItem>
            </Form>
          </Card>
        </Spin>
      );
    }
  }
  
const NewOrderForm = Form.create()(NewOrder);
// export default NewOrderForm;

const mapStateToProps = ({auth, orderData, commonData}) => {
  const {token} = auth;
  const {createSuccess} = orderData;
  const {loading} = commonData;
  return {token, createSuccess, loading};
};

export default connect(mapStateToProps, {addOrder, addOrderForm})(NewOrderForm);
