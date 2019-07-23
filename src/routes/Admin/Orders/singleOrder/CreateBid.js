import React from "react";
import { Col, Modal, Form, Icon, Input, Row, Select, Upload, message} from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input;
const { Option } = Select;
const Dragger = Upload.Dragger;

export const CreateBidForm = Form.create({ 
  name: 'edit_item_form' ,
  mapPropsToFields(props) {
    return {
      description: Form.createFormField({
        ...props.item,
        value: props.item.description,
      }),
      size: Form.createFormField({
        ...props.item,
        value: props.item.size,
      }),
      quantity: Form.createFormField({
        ...props.item,
        value: props.item.quantity,
      }),
      category: Form.createFormField({
        ...props.item,
        value: props.item.category,
      }),
      additional_details: Form.createFormField({
        ...props.item,
        value: props.item.additional_details,
      }),
      attachment: Form.createFormField({
        ...props.item,
        value: props.item.files,
      }),
    };
  }
})(
  // eslint-disable-next-line
  class extends React.Component {
    state = {
      fileList: [],
      uploading: false,
    };
    render() {
      const { cats, visible, onCancel, onCreate, confirmLoading, form } = this.props;
      const { getFieldDecorator, getFieldValue } = form;
      getFieldDecorator('attachment', {initialValue: []});
      const attachment = getFieldValue('attachment');
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 24 },
          offset: 12,
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
          md: { span: 24 },
        }
      };
      const uploadProps = {
        name: 'attachment',
        accept: ".png,.jpg,.jpeg,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        multiple: true,
        onRemove: file => {
          const attachment = getFieldValue('attachment');
          const index = attachment.indexOf(file);
          const newFileList = attachment.slice();
          newFileList.splice(index, 1);
          form.setFieldsValue({
            attachment: newFileList,
          });
        },
        beforeUpload: file => {
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            message.error('File must smaller than 2MB!');
            return;
          }
          const attachment = form.getFieldValue('attachment');
          const files = attachment.concat(file);
          form.setFieldsValue({
            attachment: files.slice(-3),
          });
          return false;
        },
        fileList: attachment,
      };
      return (
        <Modal
          visible={visible}
          title="Add Item"
          width="900px"
          okText="Add"
          onCancel={onCancel}
          confirmLoading={confirmLoading}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Row type="flex">
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label={(
                    <span>
                    Description&nbsp;
                    </span>
                    )}
                  >
                    {getFieldDecorator('description', {
                    rules: [{required: true, message: 'Please enter an item description!', whitespace: true}],
                    })(
                    <Input/>
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                      label={(
                      <span>
                          Size&nbsp;
                      </span>
                      )}
                  >
                      {getFieldDecorator('size', {
                      rules: [{required: true, message: 'You must enter a size specification!', whitespace: true}],
                      })(
                        <Input/>
                      )}
                  </FormItem>
                </Col>
            </Row>
            <Row type="flex">
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label={(
                  <span>
                      Quantity&nbsp;
                  </span>
                  )}
                >
                  {getFieldDecorator('quantity', {
                  rules: [
                    {
                      type: 'integer', 
                      required: true, 
                      transform: (value) => {
                        return Number(value);
                      },
                      message: 'You must enter the required amount of units!', 
                      whitespace: true
                    }
                  ],
                  })(
                    <Input min={1} />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                    label={(
                    <span>
                        Category&nbsp;
                    </span>
                    )}
                >
                    {getFieldDecorator('category', {
                    rules: [{required: true, message: 'You must select a category for this item!', whitespace: true}],
                    })(
                      <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {cats.map(c => (
                          <Option key={c.name}>{c.name}</Option>
                        ))}
                      </Select>
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={24}>
                <FormItem
                  {...formItemLayout}
                    label={(
                    <span>
                        Additional Details&nbsp;
                    </span>
                    )}
                >
                    {getFieldDecorator('additional_details', {
                    })(
                    <TextArea rows={4} columns={2}/>
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={24}>
                <FormItem 
                  {...formItemLayout}
                  label={(
                  <span>
                      Upload files&nbsp;
                  </span>
                  )}
                >
                  <Dragger 
                    {...uploadProps}
                  >
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file(s) to this area to upload</p>
                    <p className="ant-upload-hint">
                      Kindly ensure files are visible and explanatory. 
                      Supported files include pdfs, msword, excel, png, jpeg.
                    </p>
                  </Dragger>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      );
    }
  },
);