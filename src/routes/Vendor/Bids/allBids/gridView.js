/*jshint esversion: 9 */

import React, {Component} from "react";
import {Button,Card,Descriptions,Popconfirm,Tag} from "antd";
import _ from 'lodash';
import Moment from 'react-moment';
import 'moment-timezone';
import FileIcon, {defaultStyles} from 'react-file-icon';
import NumberFormat from 'react-number-format';

const extension = fname => {
  return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
};

const tabList = [
  {
    key: 'job',
    tab: 'Job',
  },
  {
    key: 'bid',
    tab: 'Bid',
  },
];

const contentList = (key, bid) => {
  switch(key) {
    case 'job':
      return (
        <div className="gx-mb-2">
          <div>
            <Descriptions size={`small`} layout="horizontal" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
              <Descriptions.Item label="Size/Type">{bid.item.size}</Descriptions.Item>
              <Descriptions.Item label="Quantity">{bid.item.quantity}</Descriptions.Item>
              <Descriptions.Item label="Details">{bid.item.additional_details}</Descriptions.Item>
            </Descriptions>
          </div>
          <div>
            {!_.isEmpty(bid.item.files)? 
              (<div>
                {
                  bid.item.files.map(file => (
                    <FileIcon 
                      size={50} 
                      key={file.id} 
                      extension={extension(file.name)} 
                      {...defaultStyles[extension(file.name)]} />
                  ))
                }
              </div>)
              : null
            }
          </div>
          
        </div>
      );
    case 'bid':
      return (
        <div className="gx-mb-2">
          <div>
            <Descriptions size={`small`} layout="horizontal" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
              <Descriptions.Item label="Unit Cost">
                {/* {`₦${bid.unit_cost}`} */}
                <NumberFormat value={bid.unit_cost} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
              </Descriptions.Item>
              <Descriptions.Item label="Duration">{`${bid.duration} ${bid.duration_unit}`}</Descriptions.Item>
              <Descriptions.Item label="Details">{bid.additional_details}</Descriptions.Item>
            </Descriptions>
          </div>
          <div>
            {!_.isEmpty(bid.item.files)? 
              (<div>
                {
                  bid.item.files.map(file => (
                    <FileIcon 
                      size={50} 
                      key={file.id} 
                      extension={extension(file.name)} 
                      {...defaultStyles[extension(file.name)]} />
                  ))
                }
              </div>)
              : null
            }
          </div>
          
        </div>
      );
    default:
      return;
  };
};

class GridView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: 'job',
      loading: false
    };

    this.confirm = this.confirm.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      loading: false
    });
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  confirm() {
    const {bid,deleteBid} = this.props;
    this.setState({
      loading: true
    });
    deleteBid(bid.id);
  }
  
  render() {
    const {bid, editBid} = this.props;
    const {key} = this.state;

    return (
      <Card className="gx-card"
        hoverable 
        title={bid.item.description}
        extra={<Tag color="#038fdd">{bid.item.category}</Tag>}
        tabList={tabList}
        activeTabKey={key}
        onTabChange={key => {
          this.onTabChange(key, 'key');
        }}
      >
        {contentList(key, bid)}
        <div className="gx-mt-4">
          <Popconfirm
            title="Are you sure you want to delete this bid?"
            onConfirm={this.confirm}
            okText="Yes, forever"
            cancelText="No, wait"
          >
            <Button type="primary" ghost size="small">Delete</Button>
          </Popconfirm>
          <Button type="primary" size="small" onClick={() => editBid(bid)}>Edit</Button>
        </div>
        <small className="gx-text-light gx-float-right">
          updated <i><Moment fromNow>{bid.updated_at}</Moment></i>
        </small>
      </Card>
    );
  }
}

export default GridView;