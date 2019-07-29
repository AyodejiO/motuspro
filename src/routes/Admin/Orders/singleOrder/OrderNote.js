/*jshint esversion: 9 */
import React from "react";
import { Modal, Form} from 'antd';
import CKEditor from "react-ckeditor-component-4";

const FormItem = Form.Item;

export const OrderNoteForm = Form.create({ 
  name: 'edit_item_form' ,
  mapPropsToFields: (props) => {
    return {
      note: Form.createFormField({
        ...props.order,
        value: props.order.note,
      }),
    };
  }
})(
  // eslint-disable-next-line
  class extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        note: ''
      };
    }

    onChange(evt) {
      const { form } = this.props;
      const note = evt.editor.getData();
      form.setFieldsValue({
        note,
      });
    }

    componentDidMount() {
      const {note} = this.props.order;
      this.setState({
        note,
      });
    }

    componentDidUpdate() {
      const { form, order } = this.props;
      const {note} = order;
      const tempNote = this.state.note;
      const formNote = form.getFieldValue('note');
      if(note !== tempNote) {
        console.log(this.state.note, formNote, this.props.order.note);
        this.setState({
          note,
        });
        form.setFieldsValue({
          note,
        }, () => {
          console.log("form updated");
          console.log(form.getFieldValue('note'));
        });
      }
    }
    
    render() {
      const { visible, onCancel, onCreate, confirmLoading, form } = this.props;
      const { getFieldDecorator } = form;
      let config = {
        toolbar: [
          { name: 'basicstyles', items: [ 'Underline', 'Italic', 'Bold', 'Strike', ] },
          { name: 'clipboard',   items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
          { name: 'editing',     items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
          { name: 'links', items: [ 'Link', 'Unlink' ] },
          { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'SpecialChar', 'PageBreak', 'Iframe' ] },
          { name: 'paragraph',   items: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
          { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ]  },
          { name: 'colors', items: [ 'TextColor', 'BGColor' ] }
        ],
        removeButtons: 'Subscript,Superscript',
        removePlugins: "elementspath",
      };
      const note = form.getFieldValue('note');

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
      return (
        <Modal
          visible={visible}
          title="Note"
          width="700px"
          okText="Save"
          onCancel={onCancel}
          confirmLoading={confirmLoading}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('note', {
              rules: [],
              })(
              // <Input/>
              <CKEditor
                activeClass="p10"
                config={config}
                content={note}
                events={{
                  'change': this.onChange.bind(this)
                }}
              />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  },
);