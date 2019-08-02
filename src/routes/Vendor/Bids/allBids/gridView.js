/*jshint esversion: 9 */

import React, {Component} from "react";
import {Button, Card,Descriptions, Tag} from "antd";
import _ from 'lodash';
import FileIcon, {defaultStyles} from 'react-file-icon';

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
            <Descriptions size={`small`} layout="horizontal" column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
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
            <Descriptions size={`small`} layout="horizontal" column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
              <Descriptions.Item label="Unit Cost">{`₦${bid.unit_cost}`}</Descriptions.Item>
              <Descriptions.Item label="Duration">{`${bid.duration} days`}</Descriptions.Item>
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
    };

    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };
  
  render() {
    const {bid, editBid, deleteBid} = this.props;
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
          <Button type="primary" ghost size="small" onClick={() => deleteBid(bid)}>Delete</Button>
          <Button type="primary" size="small" onClick={() => editBid(bid)}>Edit</Button>
        </div>
      </Card>
    );
  }
}

export default GridView;