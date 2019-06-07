import React from "react";
import { Button, Icon, Table } from 'antd';
import IntlMessages from "../../../../util/IntlMessages";

const columns = [{
  title: 'Description',
  dataIndex: 'description',
  key: 'description',
  width: 200,
  render: text => <span className="gx-link">{text}</span>,
}, {
  title: 'Size',
  dataIndex: 'size',
  key: 'size',
  width: 250,
}, {
  title: 'Quantity',
  dataIndex: 'quantity',
  key: 'quantity',
},{
  title: 'Category',
  dataIndex: 'category',
  key: 'category',
}, {
  title: 'Action',
  key: 'action',
  width: 200,
  render: (text, record) => (
    <span>
      <span className="gx-link ant-dropdown-link">
        Actions <Icon type="down"/>
      </span>
    </span>
  ),
}];

const createNew = (callback, visible) => {
  if(visible) return (
  <Button type="primary" size="default" icon="add" className="g-float-right" onClick={callback}>
    <IntlMessages id="sidebar.items.new"/>
  </Button>);

  return null;
}

export const Items = ({items, callback, visible}) => (
  <div>
    {createNew(callback, visible)}
    <Table dataSource={items} columns={columns} />
  </div>
);