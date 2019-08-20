import React from "react";
// eslint-disable-next-line
import { Divider, Table, InputNumber, Button, Form } from 'antd';
import './index.less';
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<InputNumber 
          min={0} 
          ref={node => (this.input = node)} 
          onPressEnter={this.save} onBlur={this.save} 
          // formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          // eslint-disable-next-line
          // parser={value => value.replace(/\₦\s?|(,*)/g, '')}
        />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

export default class Items extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      render: text => <span className="">{text}</span>,
    }, {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      width: 100,
    }, {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
    },{
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
    },{
      title: 'Files',
      dataIndex: 'files_count',
      key: 'files_count',
      width: 100,
    },{
      title: 'Unit Cost',
      dataIndex: 'unit_cost',
      key: 'unit_cost',
      width: 150,
      className: 'gx-text-center',
      editable: true
    }, {
        title: 'Bids',
        key: 'bid',
        width: 200,
        className: 'gx-text-center',
        render: (text, record) => {
          if(record.open) {
            // if(record.bid_id) {

            // }
            return (
              <Button className="gx-mb-0" type="link" onClick={() => this.props.callback(record)}>
                {`View ${record.bids_count} Bid(s)`}
                {/* {record.bid_id && (
                  <>
                    <Divider type="vertical" />
                    <span>{record.bid_id }</span>
                  </>
                )} */}
              </Button>
            );
          }
          return (
            <Button className="gx-mb-0" type="link" onClick={() => this.props.updateItem(record.id, {'open': 1})}>
              Create Bid
            </Button>
          );
        }
    }];
  }

  handleSave = row => {
    console.log(row.id);
    const {updateItem} = this.props;
    // const newData = [...this.state.dataSource];
    // const index = newData.findIndex(item => row.key === item.key);
    // const item = newData[index];
    // newData.splice(index, 1, {
    //   ...item,
    //   ...row,
    // });
    // this.setState({ dataSource: newData });
    updateItem(row.id, {unit_cost: row.unit_cost})
  };

  render() {
    const { items, loading} = this.props;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Table
          rowKey={record => record.id}
          components={components}
          loading={loading}
          rowClassName={() => 'editable-row'}
          dataSource={items}
          columns={columns}
          size="middle"
        />
      </div>
    );
  }
}