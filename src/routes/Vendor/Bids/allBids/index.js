/*jshint esversion: 9 */

import React, {Component} from "react";
import {List} from "antd";
import {connect} from "react-redux";
import 'moment-timezone';

import {EditBidForm} from "../editBid";
import InfoView from "components/InfoView";

// import IntlMessages from "../../../../util/IntlMessages";

import {getBids} from "../../../../appRedux/actions/Bids";
import {editBid, editBidModal, cancelEditBidModal} from "../../../../appRedux/actions/Bids";
import GridView from './gridView';

const showHeader = true;
const scroll = {y: 440};
const pagination = {position: 'bottom'};

class AllBids extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination,
      size: 'middle',
      showHeader,
      rowSelection: {},
      scroll,
    };

    this.createBid = this.createBid.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleUpdateBid = this.handleUpdateBid.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
  }

  componentDidMount() {
    this.props.getBids();
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

  handleUpdateBid(){
    const form = this.formRef.props.form;
    const {bid} = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.editBid(bid.id, values);
        // console.log('Received values of form: ', values);
        // this.setState({ visible: false });
        return;
      }
    });
  }
  
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const {editBidModal, cancelEditBidModal, bidLoading, bid, bids, loading, visible} = this.props;
    return (
      <div>
        <List
          dataSource={bids}
          itemLayout="horizontal"
          grid={{ gutter: 15, column: 3 }}
          loading={loading}
          renderItem={bid => (
            <List.Item>
              <GridView
                bid={bid}
                editBid={editBidModal}
                deleteBid={editBidModal}
              />
            </List.Item>
          )}
        />
        {bid && <EditBidForm
          wrappedComponentRef={this.saveFormRef}
          bid={bid}
          visible={visible}
          onCancel={cancelEditBidModal}
          onSave={this.handleUpdateBid}
          confirmLoading={bidLoading}
        />}
        <InfoView/>
      </div>
    );
  }
}

const mapStateToProps = ({bidsData, commonData}) => {
  const {bid, bids, bidLoading, listSuccess, visible} = bidsData;
  const {loading} = commonData;
  return {bid, bids, bidLoading, listSuccess, loading, visible};
};

export default connect(mapStateToProps, {editBid, editBidModal, cancelEditBidModal, getBids})(AllBids);