import React from "react";
import { Modal, Form, Input, Icon, Tooltip } from 'antd';
import './index.less';

const FormItem = Form.Item;
const {TextArea} = Input;

export const NewOrderForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, confirmLoading, form } = this.props;
      const { getFieldDecorator } = form;
 
      return (
        <Modal
          visible={visible}
          title="Create an order"
          okText="Create"
          onCancel={onCancel}
          confirmLoading={confirmLoading}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem
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
          </Form>
        </Modal>
      );
    }
  },
);