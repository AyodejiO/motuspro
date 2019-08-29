/*jshint esversion: 9 */
import React from "react";
import { Modal, Form, Input, InputNumber, Icon, Select, Tooltip } from 'antd';
// import NumericInput from 'components/NumericInput';
import './index.less';

const FormItem = Form.Item;
const {TextArea} = Input;
const {Option} = Select;



export const NewBidForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    
    render() {
      const { visible, onCancel, onCreate, item, confirmLoading, form } = this.props;
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
          title={`Place a bid - ${item.description}`}
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
                rules: [{required: true, message: 'Please input a unit cost!'}],
                })(
                  <InputNumber 
                    min={0} step={0.01} 
                    formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/₦\s?|(,*)/g, '')}
                  />
                  // <Input 
                  //   type="number" 
                  //   min={0} step={0.01} 
                  //   prefix="₦" 
                  // />
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
                {getFieldDecorator('duration', {
                rules: [{required: true, message: 'Please input a duration!'}],
                })(
                  // <NumericInput />
                  <Input 
                    type="number"
                    min={0} 
                    addonAfter={selectAfterDuration}  
                  />
                  // <InputNumber min={0} addonAfter={selectAfterDuration} />
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