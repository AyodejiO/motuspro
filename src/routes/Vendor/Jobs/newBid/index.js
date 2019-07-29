import React from "react";
import { Modal, Form, Input, InputNumber, Icon, Tooltip } from 'antd';
import './index.less';

const FormItem = Form.Item;
const {TextArea} = Input;

export const NewBidForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, item, confirmLoading, form } = this.props;
      const { getFieldDecorator } = form;
 
      return (
        <Modal
          visible={visible}
          title="Place a bid"
          okText="Create"
          onCancel={onCancel}
          confirmLoading={confirmLoading}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem
                label={(
                <span>
                Unit Cost&nbsp;
                    <Tooltip title="How much will one unit cost?">
                    <Icon type="question-circle-o"/>
                </Tooltip>
                </span>
                )}
            >
                {getFieldDecorator('unit_cost', {
                rules: [{required: true, message: 'Please input a unit cost!', whitespace: true}],
                })(
                <InputNumber 
                  min={0} step={0.1} 
                  formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
                )}
            </FormItem>
            <FormItem
                label={(
                <span>
                Duration&nbsp;
                    <Tooltip title="How long will it take to complete all?">
                    <Icon type="question-circle-o"/>
                </Tooltip>
                </span>
                )}
            >
                {getFieldDecorator('unit_cost', {
                rules: [{required: true, message: 'Please input a duration!', whitespace: true}],
                })(
                  <InputNumber  min={0} />
                )}
            </FormItem>
            <FormItem
                label={(
                <span>
                    Additional details&nbsp;
                    <Tooltip title="Anything you'd like to add?">
                    <Icon type="question-circle-o"/>
                </Tooltip>
                </span>
                )}
            >
                {getFieldDecorator('additional_details', {
                rules: [],
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