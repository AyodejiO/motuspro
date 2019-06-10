import React from "react";
import { Button, Col,  Divider, Row, Table } from 'antd';
import FileIcon, {defaultStyles} from 'react-file-icon';
import IntlMessages from "../../../../util/IntlMessages";
const { Column } = Table;

const attachLabel = {
  verticalAlign: 'top'
};

const extension = fname => {
  return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
};

const columns = [{
  title: 'Description',
  dataIndex: 'description',
  key: 'description',
  width: 300,
  render: text => <span className="gx-link">{text}</span>,
}, {
  title: 'Size',
  dataIndex: 'size',
  key: 'size',
  width: 100,
}, {
  title: 'Quantity',
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
  dataIndex: 'files-count',
  key: 'files-count',
  width: 100,
}, {
  title: 'Action',
  key: 'action',
  width: 200,
  render: (text, record) => (
    <span>
      <Button type="link">Edit</Button>
      <Divider type="vertical" />
      <Button type="link">Delete</Button>
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

export const Items = ({items, callback, edit, visible}) => (
  <div>
    {createNew(callback, visible)}
    <Table 
      dataSource={items} 
      rowKey={record => record.id}
      expandedRowRender={record => (
        <Row style={{ margin: 0 }}>
          <Col span={12}>
            <p>
              <span className='gx-text-primary'>Additional Details: </span> 
              <span className='gx-text-info'>{record.additional_details}</span>
            </p>
            
          </Col>
          <Col span={12}>
            <p>
              <span className='gx-text-primary' style={attachLabel}>Files: </span>
                <span className='gx-text-info'>
                  {record.files.map(file => (
                    <FileIcon 
                      size={50} 
                      extension={extension(file.name)} 
                      {...defaultStyles[extension(file.name)]} />
                  ))}
                </span>
            </p>
          </Col>
        </Row>
      )}
    >
      <Column title="Description" dataIndex="description" key="description" width={300} render={text => <span className="gx-link">{text}</span>} />
      <Column title="Size" dataIndex="size" key="size" width={100} />
      <Column title="Quantity" dataIndex="quantity" key="quantity" width={100} />
      <Column title="Category" dataIndex="category" key="category" width={150} />
      <Column title="Files" dataIndex="files-count" key="files-count" width={100} />
      <Column
        title="Action"
        key="action"
        width={200}
        render={(text, record) => (
          <span>
            <Button type="link" onClick={console.log(record)}>Edit</Button>
            <Divider type="vertical" />
            <Button type="link">Delete</Button>
          </span>
        )}
      />
    </Table>
  </div>
);