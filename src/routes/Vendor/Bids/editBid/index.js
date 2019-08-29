/*jshint esversion: 9 */
import React from "react";
import { Modal, Form, Input, InputNumber, Icon, Select, Tooltip } from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input;
const {Option} = Select;

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
      duration_unit: Form.createFormField({
        ...props.bid,
        value: props.bid.duration_unit,
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
      const selectAfterDuration = getFieldDecorator('duration_unit', {
        initialValue: 'days',
      })(
        <Select style={{ width: 120 }}>
          <Option value="days">day(s)</Option>
          <Option value="weeks">week(s)</Option>
          <Option value="months">month(s)</Option>
          <Option value="years">year(s)</Option>
        </Select>,
      );
      
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
                  // <InputNumber min={0} />
                  <Input 
                    type="number"
                    min={0} 
                    addonAfter={selectAfterDuration}  
                  />
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