import React from "react";
import { Button, Card, Checkbox, Col, Form, Input, Icon, Row, Select } from 'antd';
import './filter.less';

const { Option } = Select;

export const OrderFilterForm = Form.create({ 
  name: 'order_filter',
  mapPropsToFields(props) {
    return {
      client: Form.createFormField({
        ...props.filter,
        value: props.filter.client,
      }),
      client_ref: Form.createFormField({
        ...props.filter,
        value: props.filter.client_ref,
      }),
      closed: Form.createFormField({
        ...props.filter,
        value: props.filter.closed,
      }),
      desc: Form.createFormField({
        ...props.filter,
        value: props.filter.desc,
      }),
      motus_ref: Form.createFormField({
        ...props.filter,
        value: props.filter.motus_ref,
      }),
      note: Form.createFormField({
        ...props.filter,
        value: props.filter.note,
      }),
      status: Form.createFormField({
        ...props.filter,
        value: props.filter.status,
      }),
      quoted: Form.createFormField({
        ...props.filter,
        value: props.filter.quoted,
      }),
    };
  }
})(
  // eslint-disable-next-line
  class extends React.Component {
    state = {
      expand: false,
    };

    handleReset = () => {
      this.props.form.resetFields();
    };
  
    toggle = () => {
      const { expand } = this.state;
      this.setState({ expand: !expand });
    };

    render() {
      const { handleFilter, form, loading } = this.props;
      const { getFieldDecorator } = form;
      const {expand} = this.state;

      const formItemLayout = {
        labelCol: {
          xs: {span: 6},
          sm: {span: 6},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 24},
        },
      };
 
      return (
        <Card
          className="gx-card gx-card-no-tb-padding"
          title="Filter"
          // loading={loading}
          extra={
            <Button className="gx-mb-0" type="link" onClick={this.toggle}>
              Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
            </Button>
          }
        >
          <Form onSubmit={handleFilter} style={{ display: expand? 'block' : 'none' }}>
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  // label="Motus Ref"
                >
                  {getFieldDecorator('motus_ref', {
                  })(
                    <Input placeholder="Motus Reference" />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  // label="Client Ref"
                >
                  {getFieldDecorator('client_ref', {
                  })(
                    <Input placeholder="Client Reference" />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  // label="Client"
                >
                  {getFieldDecorator('client', {
                  })(
                    <Input placeholder="Client" />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  // label="Client"
                >
                  {getFieldDecorator('desc', {
                  })(
                    <Input placeholder="Description Excerpt" />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  {...formItemLayout}
                  // label="Status"
                >
                  {getFieldDecorator('status', {
                  })(
                    <Select
                      mode="multiple"
                      placeholder="Order Status"
                      onChange={this.handleChange}
                      style={{ width: '100%' }}
                    >
                      <Option key={`active`}>Active</Option>
                      <Option key={`inactive`}>Inactive</Option>
                      <Option key={`ended`}>Ended</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item {...formItemLayout}>
                  {getFieldDecorator('closed', {
                    valuePropName: 'checked',
                  })(
                    <Checkbox>
                      Closed 
                    </Checkbox>,
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item {...formItemLayout}>
                  {getFieldDecorator('quoted', {
                    valuePropName: 'checked',
                  })(
                    <Checkbox indeterminate>
                      Quoted
                    </Checkbox>,
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item {...formItemLayout}>
                  {getFieldDecorator('note', {
                    valuePropName: 'checked',
                  })(
                    <Checkbox>
                      Has Note 
                    </Checkbox>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Button size="small" type="primary" loading={loading} htmlType="submit">
                  Search
                </Button>
                <Button size="small" onClick={this.handleReset}>
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      );
    }
  },
);