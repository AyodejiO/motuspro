import React from "react";
import { Icon, Table } from 'antd';

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

export const Items = ({items}) => (
  <Table dataSource={items} columns={columns} />
);