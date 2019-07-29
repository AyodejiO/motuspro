/*jshint esversion: 9 */

import React, {Component} from "react";
// import {Link} from "react-router-dom";
import {Link} from "react-router-dom";
import _ from 'lodash';
import {connect} from "react-redux";
import FileIcon, {defaultStyles} from 'react-file-icon';

import {NewBidForm} from "../newBid";
import GridView from "components/Jobs/GridView";
// eslint-disable-next-line
// import Moment from 'react-moment';
import {Button, Card,Descriptions, Dropdown, Icon,List, Table, Tag} from "antd";

// import NewOrder from "../newOrder";
import IntlMessages from "../../../../util/IntlMessages";

import {getItems} from "../../../../appRedux/actions/Items";

const { Column } = Table;

// const columns = [
// {
//   title: 'Created',
//   dataIndex: 'created_at',
//   key: 'created_at',
//   width: 150,
//   render: (text) => {
//     if(text) {
//       return (<Moment format="DD/MM/YYYY">{text}</Moment>);
//     }
//   },
// },
// ];

// const expandedRowRender = record => <p>{record.description}</p>;
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
    form.validateFields((err, values) => {
      if (!err) {
        this.props.addOrder(values);
        return;
      }
      // console.log('Received values of form: ', values);
      // form.resetFields();
      // this.setState({ visible: false });
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
    const {items, loading} = this.props;
    const {item, visible} = this.state;
    console.log(items)
    return (
      <div>
        <List
          dataSource={items}
          itemLayout="horizontal"
          grid={{ gutter: 15, column: 3 }}
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
                      <Descriptions.Item label="Size">{item.size}</Descriptions.Item>
                      <Descriptions.Item label="Quantity">{item.quantity}</Descriptions.Item>
                      <Descriptions.Item label="Details">{item.additional_details}</Descriptions.Item>
                    </Descriptions>
                  </div>
                  <div>
                    {!_.isEmpty(item.docs)? 
                      (<div>
                        {
                          item.docs.map(doc => (
                            <FileIcon 
                              size={50} 
                              key={doc.id} 
                              extension={extension(doc.name)} 
                              {...defaultStyles[extension(doc.name)]} />
                          ))
                        }
                      </div>)
                      : null
                    }
                  </div>
                  
                </div>
                <div className="gx-mt-4">
                  <Button type="primary" ghost size="small" onClick={() => this.createBid(item)}>Place Bid</Button>
                </div>
                <small className="gx-text-light gx-float-right">Updated <i>{item.updated_at}</i></small>
              </Card>
                {/* <List.Item.Meta
                  title={<h4>{item.description}</h4>}
                  description={item.additional_details}
                /> */}
            </List.Item>
          )}
        />
        <NewBidForm
          wrappedComponentRef={this.saveFormRef}
          item={item}
          visible={visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreateBid}
          confirmLoading={loading}
        />
      </div>
    );
  }
}

const mapStateToProps = ({auth, itemsData, commonData}) => {
  const {listSuccess, items} = itemsData;
  const {loading} = commonData;
  return {listSuccess, loading, items};
};

export default connect(mapStateToProps, {getItems})(AllJobs);