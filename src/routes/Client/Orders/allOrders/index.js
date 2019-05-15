/*jshint esversion: 6 */

import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

// eslint-disable-next-line
import {Button, Card, Icon, Table} from "antd";

// import NewOrder from "../newOrder";
import IntlMessages from "../../../../util/IntlMessages";

import {getOrders} from "../../../../appRedux/actions/Orders";

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 200,
  render: text => <span className="gx-link">{text}</span>,
}, {
  title: 'Tin Number',
  dataIndex: 'tin',
  key: 'tin',
  width: 250,
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  width: 200,
  render: (text, record) => (
    <span>
      <span className="gx-link ant-dropdown-link">
        Actions <Icon type="down"/>
      </span>
    </span>
  ),
}];

// const expandedRowRender = record => <p>{record.description}</p>;
const showHeader = true;
const scroll = {y: 440};
const pagination = {position: 'bottom'};

class AllOrders extends Component {
  state = {
    pagination,
    size: 'middle',
    showHeader,
    rowSelection: {},
    scroll,
  };

  componentDidMount = () =>
  {
    this.props.getOrders();
  }

  handleSizeChange = (e) => {
    this.setState({size: e.target.value});
  };

  handleShowForm = (e) => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  CreateNew = (
    <Link to="/orders/new">
      <Button type="primary" size="default" icon="add" onClick={this.handleShowForm}>
        <IntlMessages id="sidebar.orders.new"/>
      </Button>
    </Link>
  );

  render() {
    const {loading, allOrders} = this.props
    return (
      <div>
        <Card className="gx-card" title="Orders" extra={this.CreateNew}>
          <Table className="gx-table-responsive" {...this.state} loading={loading} rowKey="id" columns={columns} dataSource={allOrders}/>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({auth, orderData, commonData}) => {
  const {token} = auth;
  const {listSuccess, allOrders} = orderData;
  const {loading} = commonData;
  return {token, listSuccess, loading, allOrders};
};

export default connect(mapStateToProps, {getOrders})(AllOrders);