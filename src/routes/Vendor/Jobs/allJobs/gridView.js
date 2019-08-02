/*jshint esversion: 9 */

import React, {Component} from "react";
import {Button, Card,Descriptions, Tag} from "antd";
import _ from 'lodash';
import Moment from 'react-moment';
import 'moment-timezone';
import FileIcon, {defaultStyles} from 'react-file-icon';

const extension = fname => {
  return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
};

class GridView extends Component {
  constructor(props) {
    super(props);

    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };
  
  render() {
    const {item, addBid, skipItem} = this.props;

    return (
      <Card className="gx-card"
                hoverable 
                title={item.description}
                extra={<Tag color="#038fdd">{item.category}</Tag>}
              >
                <div className="gx-mb-2">
                  <div>
                    <Descriptions size={`small`} layout="horizontal" column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
                      <Descriptions.Item label="Size/Type">{item.size}</Descriptions.Item>
                      <Descriptions.Item label="Quantity">{item.quantity}</Descriptions.Item>
                      <Descriptions.Item label="Details">{item.additional_details}</Descriptions.Item>
                    </Descriptions>
                  </div>
                  <div>
                    {!_.isEmpty(item.files)? 
                      (<div>
                        {
                          item.files.map(file => (
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
                <div className="gx-mt-4">
                  <Button type="primary" ghost size="small" onClick={() => skipItem(item)}>Skip</Button>
                  <Button type="primary" size="small" onClick={() => addBid(item)}>Place Bid</Button>
                </div>
                <small className="gx-text-light gx-float-right">
                  Updated <i><Moment fromNow>{item.updated_at}</Moment></i>
                </small>
              </Card>
    );
  }
}

export default GridView;