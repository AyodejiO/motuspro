import React from "react";
import { Button, Col,  Divider, Icon,  Row, Table } from 'antd';
import FileIcon, {defaultStyles} from 'react-file-icon';
import IntlMessages from "../../../../util/IntlMessages";
const { Column } = Table;

const attachLabel = {
  verticalAlign: 'top'
};

const extension = fname => {
  return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
};

const createNew = (callback, status, visible) => {
  if(visible && status === 'inactive') return (
  <Button type="primary" size="default" icon="add" className="g-float-right" onClick={callback}>
    <IntlMessages id="sidebar.items.new"/>
  </Button>);

  return null;
}

export const Items = ({callback, deleteItem, edit, items, loading, status, visible}) => (
  <div>
    {createNew(callback, status, visible)}
    <Table 
      dataSource={items} 
      loading={loading}
      title={() => <span className="ant-card-head-title"><Icon type="unordered-list" /> Items</span>}
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
      <Column title="Description" dataIndex="description" key="description" width={200} />
      <Column title="Size" dataIndex="size" key="size" width={100} />
      <Column title="Quantity" dataIndex="quantity" key="quantity" width={100} />
      <Column title="Category" dataIndex="category" key="category" width={150} />
      <Column title="Files" dataIndex="files_count" key="files_count" width={100} />
      {status === 'inactive'? 
        (<Column
          title="Action"
          key="action"
          width={200}
          render={(text, record) => (
            <span>
              {
                // eslint-disable-next-line
                <a href="JavaScript:Void(0);" onClick={() => edit(record)}>Edit</a>
              }
              <Divider type="vertical" />
              {
                // eslint-disable-next-line
                <a href="JavaScript:Void(0);" onClick={() => deleteItem(record)}>Delete</a>
              }
            </span>
          )}
        />) : 
      null}
    </Table>
  </div>
);