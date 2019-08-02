/*jshint esversion: 9 */

import React, {Component} from "react";
import {Button, Card,Descriptions, List, Tag} from "antd";
import _ from 'lodash';
import {connect} from "react-redux";
import Moment from 'react-moment';
import 'moment-timezone';
import FileIcon, {defaultStyles} from 'react-file-icon';

import {NewBidForm} from "../newBid";
import InfoView from "components/InfoView";

// import IntlMessages from "../../../../util/IntlMessages";

import {getItems} from "../../../../appRedux/actions/Items";
import {addBid, addBidModal, cancelBidModal} from "../../../../appRedux/actions/Bids";

const showHeader = true;
const scroll = {y: 440};
const pagination = {position: 'bottom'};

const extension = fname => {
  return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
};

class AllJobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination,
      size: 'middle',
      showHeader,
      visible: false,
      item: null,
      rowSelection: {},
      scroll,
    };

    this.createBid = this.createBid.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreateBid = this.handleCreateBid.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
  }

  componentDidMount() {
    this.props.getItems();
  }

  createBid(item) {
    this.setState({ 
      item,
      visible: true 
    });
    return;
  }

  handleCancel(){
    this.setState({ 
      item: null,
      visible: false 
    });
    return;
  }

  handleCreateBid(){
    const form = this.formRef.props.form;
    const {item} = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.addBid(item.id, values);
        // console.log('Received values of form: ', values);
        // this.setState({ visible: false });
        return;
      }
    });
  }

  CreateNew = loading => (
    // <Button type="primary" disabled={loading} size="default" icon="add" onClick={this.showModal}>
    //   <IntlMessages id="sidebar.orders.new"/>
    // </Button>
    <></>
  );
  
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const {addBidModal, cancelBidModal, bidLoading, item, items, loading, visible} = this.props;

    return (
      <div>
        <List
          dataSource={items}
          itemLayout="horizontal"
          grid={{ gutter: 15, column: 3 }}
          loading={loading}
          renderItem={item => (
            <List.Item>
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
                  <Button type="primary" ghost size="small" onClick={() => addBidModal(item)}>Skip</Button>
                  <Button type="primary" size="small" onClick={() => addBidModal(item)}>Place Bid</Button>
                </div>
                <small className="gx-text-light gx-float-right">
                  Updated <i><Moment fromNow>{item.updated_at}</Moment></i>
                </small>
              </Card>
            </List.Item>
          )}
        />
        {item && <NewBidForm
          wrappedComponentRef={this.saveFormRef}
          item={item}
          visible={visible}
          onCancel={cancelBidModal}
          onCreate={this.handleCreateBid}
          confirmLoading={bidLoading}
        />}
        <InfoView/>
      </div>
    );
  }
}

const mapStateToProps = ({bidsData, commonData, itemsData}) => {
  const {listSuccess, items} = itemsData;
  const {bidLoading, item, visible} = bidsData;
  const {loading} = commonData;
  return {bidLoading, item, items, listSuccess, loading, visible};
};

export default connect(mapStateToProps, {addBid, addBidModal, cancelBidModal, getItems})(AllJobs);