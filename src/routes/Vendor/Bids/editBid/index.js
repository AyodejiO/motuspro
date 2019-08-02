/*jshint esversion: 9 */
import React from "react";
import { Modal, Form, Input, InputNumber, Icon, Tooltip } from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input;

export const EditBidForm = Form.create({ 
  name: 'form_in_modal',
  mapPropsToFields(props) {
    return {
      unit_cost: Form.createFormField({
        ...props.bid,
        value: props.bid.unit_cost,
      }),
      duration: Form.createFormField({
        ...props.bid,
        value: props.bid.duration,
      }),
      additional_details: Form.createFormField({
        ...props.bid,
        value: props.bid.additional_details,
      }),
    };
  }
 })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onSave, bid, confirmLoading, form } = this.props;
      const { getFieldDecorator } = form;
      
      return (
        <Modal
          visible={visible}
          title={`Edit bid - ${bid.item.description}`}
          okText="Save"
          onCancel={onCancel}
          confirmLoading={confirmLoading}
          onOk={onSave}
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
                rules: [{required: true, message: 'Please input a unit cost!'}],
                })(
                <InputNumber 
                  min={0} step={0.01} 
                  formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  // eslint-disable-next-line
                  parser={value => value.replace(/\₦\s?|(,*)/g, '')}
                />
                )}
            </FormItem>
            <FormItem
                label={(
                <span>
                Duration <small>(in days)</small>&nbsp;   
                <Tooltip title="How long will it take to complete all?">
                    <Icon type="question-circle-o"/>
                </Tooltip>
                </span>
                )}
            >
                {getFieldDecorator('duration', {
                rules: [{required: true, message: 'Please input a duration!'}],
                })(
                  <InputNumber min={0} />
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