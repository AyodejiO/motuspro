/*jshint esversion: 9 */

import React, {Component} from "react";
import { List} from "antd";
import {connect} from "react-redux";

import {NewBidForm} from "../newBid";
import InfoView from "components/InfoView";
import GridView from './gridView';

// import IntlMessages from "../../../../util/IntlMessages";

import {getItems, skipItem} from "../../../../appRedux/actions/Items";
import {addBid, addBidModal, cancelBidModal} from "../../../../appRedux/actions/Bids";

const showHeader = true;
const scroll = {y: 440};
const pagination = {position: 'bottom'};

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
    const {addBidModal, cancelBidModal, bidLoading, item, items, loading, skipItem, visible} = this.props;

    return (
      <div>
        <List
          dataSource={items}
          itemLayout="horizontal"
          grid={{ gutter: 15, column: 3 }}
          loading={loading}
          renderItem={item => (
            <List.Item>
              <GridView 
                addBid={addBidModal}
                item={item}
                skipItem={skipItem}
              />
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
  const {listSuccess, item, items} = itemsData;
  const {bidLoading, visible} = bidsData;
  const {loading} = commonData;
  return {bidLoading, item, items, listSuccess, loading, visible};
};

export default connect(mapStateToProps, {addBid, addBidModal, cancelBidModal, getItems, skipItem})(AllJobs);