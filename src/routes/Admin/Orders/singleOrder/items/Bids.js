/*jshint esversion: 9 */
import React from "react";
import {Link} from "react-router-dom";
import { Button, Modal, Table } from 'antd';
import NumberFormat from 'react-number-format';
const { Column } = Table;

export const Bids = ({bids, item, loading, onCancel, selectBid, visible}) => (
  <Modal
    visible={visible}
    onCancel={onCancel}
    title={`Bids - ${item.description}`}
    width="900px"
  >
    <Table 
      dataSource={bids} 
      loading={loading}
      rowKey={record => record.id}
    >
      <Column title="Vendor" dataIndex="vendor" key="vendor" width={200}
        render={(text, record) => (
          <span>
            <Link to={`/vendors`}>{record.vendor.slug}</Link>
          </span>
        )}
      />
      <Column 
        title="Unit Cost" 
        dataIndex="unit_cost" 
        key="unit_cost" 
        width={200} 
        render={(text) =>  <NumberFormat value={text} displayType={'text'} thousandSeparator={true} prefix={'₦'} />}
        // render={(text) =>  <span>{`₦${text}`}</span>}
      />
      <Column 
        title="Duration" 
        dataIndex="duration" 
        key="duration" 
        width={200} 
        render={(text, record) => <span>{`${text} ${record.duration_unit}`}</span>}
      />
      <Column title="Addtional Details" dataIndex="additional_details" key="additional_details" width={300} />
      <Column
        title="Action"
        key="action"
        width={200}
        render={(text, record) => (
          <span>
            <Button 
              className="gx-mb-0" 
              disabled={item.bid_id === record.id} 
              onClick={() => selectBid(record)}
              size="small" 
            >
              {item.bid_id === record.id? 'Selected Bid' : 'Select Bid'}
            </Button>
          </span>
        )}
      />
    </Table>
  </Modal>
);